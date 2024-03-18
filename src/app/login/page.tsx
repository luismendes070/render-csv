// https://nextjs.org/docs/app/building-your-application/authentication

'use client'
 
import { authenticate } from '@/app/lib/actions'
import React from 'react'
import { useFormState, useFormStatus } from 'react-dom'
 
export default function Page() {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined)
 
  return (
    <form action={dispatch}>
      <input type="email" name="email" placeholder="Email" required />
      <input type="password" name="password" placeholder="Password" required />
      <div>{errorMessage && <p>{errorMessage}</p>}</div>
      <LoginButton />
    </form>
  )
}
 
function LoginButton() {
  const { pending } = useFormStatus()
 
  return (
    <button aria-disabled={pending} type="submit">
      Login
    </button>
  )
}
 
