import { signIn } from "next-auth/react"

export default function AccessDenied({ response }) {
  console.log(response)
  return (
    <>
      <h1>Access Denied</h1>
      <p>
        <a
          href="/api/auth/signin"
          onClick={(e) => {
            e.preventDefault()
            signIn()
          }}
        >
          Sign In
        </a>
      </p>
    </>
  )
  switch (response) {
    case "nosignin":
      return (
        <>
          <h1>Access Denied - Not Signed in</h1>
          <p>
            <a
              href="/api/auth/signin"
              onClick={(e) => {
                e.preventDefault()
                signIn()
              }}
            >
              You must be signed in to view this page
            </a>
          </p>
        </>
      )
      break
    case "unauthorized":
      return (
        <>
          <h1>Access Denied - Invalid User</h1>
          <p>
            You do not have access to this page. Contact the developer to gain
            access.
          </p>
          <p>
            <a
              href="/api/auth/signin"
              onClick={(e) => {
                e.preventDefault()
                signIn()
              }}
            >
              Back to Signin
            </a>
          </p>
        </>
      )
      break
    default:
      break
  }
}
