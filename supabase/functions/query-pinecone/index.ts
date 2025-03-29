
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
    const { query } = await req.json()
    
    if (!query || typeof query !== 'string') {
      throw new Error('Query text is required')
    }

    // Get the Pinecone API key from environment
    const pineconeApiKey = Deno.env.get('PINECONE_API_KEY')
    if (!pineconeApiKey) {
      throw new Error('Pinecone API key not configured')
    }

    // Get OpenAI API key from environment
    const openaiApiKey = Deno.env.get('OPENAI_API_KEY')
    if (!openaiApiKey) {
      throw new Error('OpenAI API key not configured')
    }

    console.log(`Generating embedding for query: "${query}"`)
    
    // Generate embedding using OpenAI's text-embedding-3-large model
    const embeddingResponse = await fetch('https://api.openai.com/v1/embeddings', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        input: query,
        model: "text-embedding-3-large"  // Using the model that matches your Pinecone index
      })
    });
    
    if (!embeddingResponse.ok) {
      const errorData = await embeddingResponse.json();
      console.error("OpenAI API error:", errorData);
      throw new Error(`OpenAI API error: ${errorData.error?.message || "Unknown error"}`);
    }
    
    const embeddingData = await embeddingResponse.json();
    const queryEmbedding = embeddingData.data[0].embedding;
    
    if (!queryEmbedding || !Array.isArray(queryEmbedding) || queryEmbedding.length !== 3072) {
      console.error("Invalid embedding format or dimension:", queryEmbedding?.length);
      throw new Error(`Invalid embedding format or dimension: got ${queryEmbedding?.length}, expected 3072`);
    }
    
    console.log(`Successfully generated embedding with dimension: ${queryEmbedding.length}`);
    
    // Query your Pinecone index
    // Note: Replace 'your-index-name' with your actual Pinecone index name
    // and 'your-project-id' with your Pinecone project ID
    const pineconeIndexName = "voice-agent-knowledge"; // Replace with your index name
    const pineconeProjectId = "your-project-id"; // Replace with your project ID
    const pineconeEndpoint = `https://${pineconeIndexName}-${pineconeProjectId}.svc.${pineconeProjectId}.pinecone.io`;
    
    console.log(`Querying Pinecone index at: ${pineconeEndpoint}`);
    
    const pineconeResponse = await fetch(`${pineconeEndpoint}/query`, {
      method: 'POST',
      headers: {
        'Api-Key': pineconeApiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        vector: queryEmbedding,
        topK: 3,
        includeMetadata: true
      })
    });
    
    if (!pineconeResponse.ok) {
      const errorData = await pineconeResponse.text();
      console.error("Pinecone API error:", errorData);
      throw new Error(`Pinecone API error: ${errorData}`);
    }
    
    const pineconeData = await pineconeResponse.json();
    
    if (!pineconeData.matches || !Array.isArray(pineconeData.matches)) {
      console.warn("No matches found in Pinecone response");
      // Return empty results rather than error
      return new Response(
        JSON.stringify({ 
          results: [],
          message: 'No matching documents found in knowledge base'
        }),
        {
          headers: { 
            ...corsHeaders,
            'Content-Type': 'application/json'
          },
          status: 200,
        }
      );
    }
    
    console.log(`Found ${pineconeData.matches.length} matching documents`);
    
    // Transform Pinecone matches into the expected format
    const results = pineconeData.matches.map(match => ({
      text: match.metadata.text,
      source: match.metadata.source,
      relevance: match.score
    }));

    return new Response(
      JSON.stringify({ 
        results,
        message: 'Successfully queried knowledge base'
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
    console.error('Error in query-pinecone function:', error)
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
