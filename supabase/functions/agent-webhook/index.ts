
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const pathParts = url.pathname.split('/');
    const agentId = pathParts[pathParts.length - 1]; // Extract agentId from URL path

    if (!agentId) {
      throw new Error('Agent ID is required');
    }

    // Get webhook details from database
    const { data: webhookData, error: webhookError } = await supabase
      .from('agent_webhooks')
      .select('*')
      .eq('id', agentId)
      .single();

    if (webhookError || !webhookData) {
      throw new Error('Invalid webhook ID or webhook not found');
    }

    // Get request payload
    let payload = {};
    if (req.headers.get("content-type")?.includes("application/json")) {
      payload = await req.json();
    }

    // Log the webhook trigger
    await supabase.from('webhook_logs').insert([
      {
        webhook_id: agentId,
        payload: payload,
        triggered_at: new Date().toISOString(),
        source_ip: req.headers.get('x-forwarded-for') || 'unknown'
      }
    ]);

    // Format the agent input based on the payload
    const agentInput = payload.userMessage || 
                       payload.message || 
                       payload.input || 
                       "Agent triggered via webhook";

    // Here you would normally trigger the agent with the input
    // This is simulated for now as we need to implement the actual agent trigger mechanism

    return new Response(
      JSON.stringify({
        success: true,
        runId: crypto.randomUUID(),
        status: "started",
        message: `Agent triggered with input: ${agentInput}`,
        timestamp: new Date().toISOString()
      }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        }
      }
    );
  } catch (error) {
    console.error('Error processing webhook:', error);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      { 
        status: 400, 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    );
  }
});

// Helper function to simulate the database
const supabase = {
  from: (table) => {
    // Simple in-memory database for demo
    const demoWebhooks = {
      'agent_webhooks': [
        { id: 'demo-webhook-1', name: 'Test Webhook', secret_key: 'test-key-1234' }
      ],
      'webhook_logs': []
    };
    
    return {
      select: (columns) => {
        return {
          eq: (column, value) => {
            return {
              single: () => {
                const item = demoWebhooks[table].find(i => i[column] === value);
                return {
                  data: item,
                  error: item ? null : new Error('Not found')
                };
              }
            };
          }
        };
      },
      insert: (items) => {
        if (!demoWebhooks[table]) {
          demoWebhooks[table] = [];
        }
        demoWebhooks[table].push(...items);
        return { data: items, error: null };
      }
    };
  }
};
