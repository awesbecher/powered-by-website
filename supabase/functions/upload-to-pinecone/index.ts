
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { documents, modelPrompt } = await req.json()
    
    if (!documents || !Array.isArray(documents) || documents.length === 0) {
      throw new Error('Documents array is required and must not be empty')
    }
    
    // Get the required API keys from environment
    const pineconeApiKey = Deno.env.get('PINECONE_API_KEY')
    if (!pineconeApiKey) {
      throw new Error('Pinecone API key not configured')
    }

    const openaiApiKey = Deno.env.get('OPENAI_API_KEY')
    if (!openaiApiKey) {
      throw new Error('OpenAI API key not configured')
    }

    // Process the documents and save model prompt
    const pineconeIndexName = "voice-agent-knowledge"
    const pineconeProjectId = "cinohyzbtfzfcdtkgvij"
    const pineconeEndpoint = `https://${pineconeIndexName}-${pineconeProjectId}.svc.${pineconeProjectId}.pinecone.io`
    
    console.log(`Processing ${documents.length} documents for Pinecone index at: ${pineconeEndpoint}`)
    
    // Store model prompt as a special document if provided
    let vectorsToUpsert = []
    let processedCount = 0
    
    if (modelPrompt && typeof modelPrompt === 'string') {
      // Generate embedding for the model prompt
      const promptEmbeddingResponse = await fetch('https://api.openai.com/v1/embeddings', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${openaiApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          input: modelPrompt,
          model: "text-embedding-3-large"
        })
      })
      
      if (!promptEmbeddingResponse.ok) {
        const errorData = await promptEmbeddingResponse.json()
        throw new Error(`OpenAI API error for prompt: ${errorData.error?.message || "Unknown error"}`)
      }
      
      const promptEmbeddingData = await promptEmbeddingResponse.json()
      
      // Add prompt as a special vector
      vectorsToUpsert.push({
        id: 'model-prompt',
        values: promptEmbeddingData.data[0].embedding,
        metadata: {
          text: modelPrompt,
          source: 'model-prompt.txt',
          type: 'prompt'
        }
      })
      
      processedCount++
      console.log("Model prompt processed successfully")
    }
    
    // Process each document
    for (let i = 0; i < documents.length; i++) {
      const doc = documents[i]
      
      if (!doc.text || !doc.source) {
        console.warn(`Skipping document at index ${i} due to missing text or source`)
        continue
      }
      
      try {
        // Generate embedding for this document
        const embeddingResponse = await fetch('https://api.openai.com/v1/embeddings', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${openaiApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            input: doc.text,
            model: "text-embedding-3-large"
          })
        })
        
        if (!embeddingResponse.ok) {
          const errorData = await embeddingResponse.json()
          console.error(`Error generating embedding for document ${i}:`, errorData)
          continue
        }
        
        const embeddingData = await embeddingResponse.json()
        
        // Add document vector
        vectorsToUpsert.push({
          id: `doc-${i}-${Date.now()}`, // Create unique ID for each document
          values: embeddingData.data[0].embedding,
          metadata: {
            text: doc.text,
            source: doc.source,
            type: 'document'
          }
        })
        
        processedCount++
        console.log(`Document ${i+1}/${documents.length} processed successfully`)
        
        // Batch upserts to avoid overloading the API
        if (vectorsToUpsert.length >= 100) {
          await upsertVectorsBatch(vectorsToUpsert, pineconeEndpoint, pineconeApiKey)
          vectorsToUpsert = []
        }
        
      } catch (docError) {
        console.error(`Error processing document ${i}:`, docError)
      }
    }
    
    // Upsert any remaining vectors
    if (vectorsToUpsert.length > 0) {
      await upsertVectorsBatch(vectorsToUpsert, pineconeEndpoint, pineconeApiKey)
    }
    
    return new Response(
      JSON.stringify({
        success: true,
        message: `Successfully processed ${processedCount} items (including ${processedCount - (modelPrompt ? 1 : 0)} documents${modelPrompt ? ' and model prompt' : ''})`,
        processedCount
      }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        },
        status: 200,
      }
    )
  } catch (error) {
    console.error('Error in upload-to-pinecone function:', error)
    return new Response(
      JSON.stringify({
        error: error.message,
        details: error.toString()
      }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        },
        status: 500,
      }
    )
  }
})

// Helper function to upsert vectors in batches
async function upsertVectorsBatch(vectors, pineconeEndpoint, pineconeApiKey) {
  console.log(`Upserting batch of ${vectors.length} vectors to Pinecone`)
  
  const upsertResponse = await fetch(`${pineconeEndpoint}/vectors/upsert`, {
    method: 'POST',
    headers: {
      'Api-Key': pineconeApiKey,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      vectors: vectors,
      namespace: '' // Default namespace
    })
  })
  
  if (!upsertResponse.ok) {
    const errorText = await upsertResponse.text()
    throw new Error(`Pinecone upsert error: ${errorText}`)
  }
  
  const result = await upsertResponse.json()
  console.log('Upsert result:', result)
  return result
}
