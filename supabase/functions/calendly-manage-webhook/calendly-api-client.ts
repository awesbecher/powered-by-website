
// Calendly API Client class that handles all interactions with the Calendly API
export class CalendlyApiClient {
  private apiKey: string;
  private debugMode: boolean;

  constructor(apiKey: string, debugMode = false) {
    this.apiKey = apiKey;
    this.debugMode = debugMode;
  }

  // Fetch user organization details from Calendly API
  async fetchUserOrganization() {
    console.log("Attempting to fetch user organization with API key");
    
    try {
      const response = await fetch("https://api.calendly.com/users/me", {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${this.apiKey}`
        }
      });

      const responseStatus = response.status;
      const responseText = await response.text();
      console.log(`Organization API response status: ${responseStatus}`);
      console.log(`Organization API response (first 500 chars): ${responseText.substring(0, 500)}`);

      if (!response.ok) {
        let errorMessage = `Failed to fetch user information: Status ${responseStatus}`;
        let errorCode = "api_authorization_failed";
        
        try {
          const errorData = JSON.parse(responseText);
          console.error("Detailed error from Calendly API:", errorData);
          
          if (errorData.message) {
            errorMessage = `Calendly API error: ${errorData.message}`;
            
            // Set specific error codes for common issues
            if (errorData.message.includes("authentication") || errorData.message.includes("Authorization")) {
              errorCode = "invalid_api_key";
              errorMessage = "Invalid Calendly API key. Please check that you're using a valid Personal Access Token.";
            } else if (errorData.message.includes("permission")) {
              errorCode = "insufficient_permissions";
            }
          }
        } catch (e) {
          // If we can't parse the JSON, use the raw text
          console.error("Error parsing Calendly API error response:", e);
          errorMessage = `Calendly API error: ${responseText.substring(0, 100)}`;
          errorCode = "api_response_error";
        }
        
        return {
          error: {
            code: errorCode, 
            message: errorMessage,
            details: this.debugMode ? responseText.substring(0, 500) : undefined
          }
        };
      }

      try {
        const userData = JSON.parse(responseText);
        console.log("Parsed user data:", JSON.stringify(userData).substring(0, 500));
        
        if (!userData.resource) {
          console.error("Missing resource in Calendly API response:", userData);
          return {
            error: {
              code: "missing_user_data", 
              message: "Calendly API returned an unexpected response format. Missing user resource data.",
              details: this.debugMode ? JSON.stringify(userData).substring(0, 200) : undefined
            }
          };
        }
        
        const currentUser = userData.resource;
        const organizationUri = currentUser.current_organization;
        
        if (!organizationUri) {
          console.error("Missing organization URI in Calendly user data:", currentUser);
          return {
            error: {
              code: "missing_organization", 
              message: "Could not find organization information in your Calendly account. Please ensure your account is properly set up.",
              details: this.debugMode ? currentUser : undefined
            }
          };
        }
        
        console.log(`User organization: ${organizationUri}`);
        return { organizationUri, currentUser };
        
      } catch (error) {
        console.error("Failed to parse Calendly API response:", error);
        return {
          error: {
            code: "invalid_response", 
            message: "Failed to parse Calendly user data response. Please try again later.",
            details: this.debugMode ? responseText.substring(0, 200) : undefined
          }
        };
      }
    } catch (error: any) {
      console.error("Error fetching user organization:", error);
      return {
        error: {
          code: "fetch_error", 
          message: `Error fetching user data: ${error.message}`,
          details: this.debugMode ? error.stack : undefined
        }
      };
    }
  }

  // Check for existing webhooks in Calendly
  async checkExistingWebhooks(webhookUrl: string) {
    console.log("Checking for existing webhooks");
    
    try {
      // Use scope=user to avoid 400 errors when lacking organization-wide permissions
      const response = await fetch("https://api.calendly.com/webhook_subscriptions?scope=user", {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${this.apiKey}`
        }
      });
      
      const responseStatus = response.status;
      const responseText = await response.text();
      console.log(`Existing webhooks API response status: ${responseStatus}`);
      console.log(`Existing webhooks API response (first 500 chars): ${responseText.substring(0, 500)}`);
      
      if (!response.ok) {
        console.error("Failed to fetch existing webhooks:", responseText);
        return {
          error: {
            code: "webhook_list_failed", 
            message: `Failed to fetch existing webhooks. Status: ${responseStatus}`,
            details: this.debugMode ? responseText.substring(0, 200) : undefined
          }
        };
      }
      
      try {
        const webhooksData = JSON.parse(responseText);
        console.log(`Existing webhooks parsed:`, webhooksData);
        
        // Check if a webhook with the same URL already exists
        const existingWebhook = webhooksData.collection?.find(
          (webhook: any) => webhook.attributes?.url === webhookUrl
        );
        
        if (existingWebhook) {
          console.log(`Webhook already exists:`, existingWebhook);
          return { existingWebhook };
        }
        
        return { webhooksData };
        
      } catch (error) {
        console.error("Failed to parse existing webhooks response:", error);
        return {
          error: {
            code: "webhook_parse_error", 
            message: "Failed to process webhook data. Please try again later.",
            details: this.debugMode ? responseText.substring(0, 200) : undefined
          }
        };
      }
    } catch (error: any) {
      console.error("Error checking existing webhooks:", error);
      return {
        error: {
          code: "webhook_check_error", 
          message: `Error checking existing webhooks: ${error.message}`,
          details: this.debugMode ? error.stack : undefined
        }
      };
    }
  }

  // Create a webhook subscription in Calendly
  async createWebhookSubscription(organizationUri: string, webhookUrl: string) {
    console.log("Creating new webhook subscription");
    // Use user scope instead of organization for better compatibility with personal accounts
    const webhookRequestBody = {
      url: webhookUrl,
      events: ["invitee.created", "invitee.canceled"],
      user: organizationUri.replace("/organizations/", "/users/"),
      scope: "user"
    };
    console.log("Webhook request body:", JSON.stringify(webhookRequestBody));
    
    try {
      const response = await fetch("https://api.calendly.com/webhook_subscriptions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${this.apiKey}`
        },
        body: JSON.stringify(webhookRequestBody)
      });

      const responseStatus = response.status;
      const responseText = await response.text();
      console.log(`Webhook API response status: ${responseStatus}`);
      console.log(`Webhook API response: ${responseText}`);
      
      if (!response.ok) {
        let errorMessage = "Failed to create webhook subscription";
        let errorCode = "webhook_creation_failed";
        
        try {
          const webhookData = JSON.parse(responseText);
          console.error("Webhook creation failed:", webhookData);
          
          if (webhookData.message) {
            errorMessage = `Calendly webhook error: ${webhookData.message}`;
          } else if (webhookData.errors && webhookData.errors.length > 0) {
            errorMessage = `Calendly webhook error: ${webhookData.errors.map((e: any) => e.message).join(", ")}`;
            
            // Set specific error codes for common issues
            if (webhookData.errors.some((e: any) => e.message.includes("URL"))) {
              errorCode = "invalid_webhook_url";
            }
          }
        } catch (e) {
          console.error("Error parsing webhook error response:", e);
          errorMessage = `Failed to create webhook: ${responseStatus} - ${responseText.substring(0, 100)}`;
        }
        
        return {
          error: {
            code: errorCode, 
            message: errorMessage,
            details: this.debugMode ? responseText.substring(0, 300) : undefined
          }
        };
      }

      try {
        const webhookData = JSON.parse(responseText);
        console.log(`Webhook created successfully:`, webhookData);
        return { webhookData };
      } catch (error) {
        console.error("Failed to parse webhook creation response:", error);
        return {
          error: {
            code: "webhook_response_parse_error", 
            message: "Webhook was created but response couldn't be processed.", 
            details: this.debugMode ? responseText.substring(0, 200) : undefined
          }
        };
      }
    } catch (error: any) {
      console.error("Error creating webhook subscription:", error);
      return {
        error: {
          code: "webhook_creation_error", 
          message: `Error creating webhook: ${error.message}`,
          details: this.debugMode ? error.stack : undefined
        }
      };
    }
  }
}
