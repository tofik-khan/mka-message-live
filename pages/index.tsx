import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import Layout from "../components/layout"
import AccessDenied from "../components/access-denied"
import Form from "../components/form"

export default function ProtectedPage() {
  const { data: session, status } = useSession()
  const loading = status === "loading"
  const [content, setContent] = useState({ completed: false })

  // Fetch content from protected route
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/examples/protected")
      const json = await res.json()
      if (json.completed) {
        setContent(json)
      }
    }
    fetchData()
  }, [session])

  // When rendering client side don't display anything until loading is complete
  if (typeof window !== "undefined" && loading) return null

  // If no session exists, display access denied message
  if (!session) {
    return (
      <Layout>
        <AccessDenied />
      </Layout>
    )
  }

  // If session exists, display content
  if (session && content.completed) {
    //user signed in, check if sign in was Successful
    if (content.success) {
      return (
        <Layout>
          <Form />
        </Layout>
      )
    }
  }
  return (
    <Layout>
      <h1>Protected Page</h1>
      <p>
        <strong>{content.content ?? "\u00a0"}</strong>
      </p>
    </Layout>
  )
}
