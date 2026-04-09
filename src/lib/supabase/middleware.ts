import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  // We only initialize the client if we have the env vars, otherwise we return next() to prevent crashing during build/setup
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      return supabaseResponse
  }

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // IMPORTANT: Avoid writing any logic between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const pathname = request.nextUrl.pathname;

  // Protect all /admin routes
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
      if (!user) {
          // No user, redirect to login
          const url = request.nextUrl.clone()
          url.pathname = '/admin/login'
          return NextResponse.redirect(url)
      }
      
      // Basic Role checking:
      // Real RBAC would involve checking a custom 'role' column inside a user profiles table.
      // We will enhance this later when we build the dashboard.
  }

  // If already logged in, redirect away from the login page
  if (pathname === '/admin/login' && user) {
     const url = request.nextUrl.clone()
     url.pathname = '/admin/dashboard'
     return NextResponse.redirect(url)
  }

  return supabaseResponse
}
