import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const authHeader = request.headers.get('X-Custom-Auth')

  // If the secret header is missing or incorrect, block the request
  if (authHeader !== process.env.CLOUDFLARE_SECRET_KEY) {
    return new NextResponse('Unauthorized Access', { status: 401 })
  }

  return NextResponse.next()
}