
  export async function shopifyFetch<T>(query: string, variables?: Record<string, any>): Promise<{ status: number; body?: T; error?: string }> {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const accessToken = process.env.NEXT_PUBLIC_ACCESS_TOKEN;
  
      if (!apiUrl || !accessToken) {
        throw new Error('API URL or Access Token is not configured.');
      }
  
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Storefront-Access-Token': accessToken,
        },
        body: JSON.stringify({ query, variables }),
      });
  
      
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }
  
      const responseBody: T = await response.json();
      return {
        status: response.status,
        body: responseBody,
      };
    } catch (error) {
      console.error('Error fetching data:', (error as Error).message);
      return {
        status: 500,
        error: (error as Error).message || 'Error receiving data',
      };
    }
  }
  