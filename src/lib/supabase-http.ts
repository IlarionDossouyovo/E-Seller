// Supabase HTTP Client - uses REST API instead of PostgreSQL direct connection
// This bypasses the network connection issue

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://dbbauggttibriqdkfnlfhh.supabase.co'
const SUPABASE_KEY = process.env.SUPABASE_ANON_KEY || 'sbp_89aaf94620c6cc9a59bf3480fcb17bc5b43e7818'

export async function fetchFromSupabase(table: string, options: RequestInit = {}) {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
    headers: {
      'apikey': SUPABASE_KEY,
      'Authorization': `Bearer ${SUPABASE_KEY}`,
      'Content-Type': 'application/json',
    },
    ...options,
  })
  
  if (!response.ok) {
    throw new Error(`Supabase error: ${response.status}`)
  }
  
  return response.json()
}

export async function getProducts() {
  return fetchFromSupabase('Product?select=*&status=eq.ACTIVE')
}

export async function getProduct(id: string) {
  return fetchFromSupabase(`Product?id=eq.${id}`)
}

export async function createProduct(data: any) {
  return fetchFromSupabase('Product', {
    method: 'POST',
    body: JSON.stringify(data)
  })
}

export async function updateProduct(id: string, data: any) {
  return fetchFromSupabase(`Product?id=eq.${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data)
  })
}

export async function deleteProduct(id: string) {
  return fetchFromSupabase(`Product?id=eq.${id}`, {
    method: 'DELETE'
  })
}