import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import Layout from "../components/layout"
import AccessDenied from "../components/access-denied"
import Form from "../components/form.js"

export default function IndexPage() {
  const { data: session, status } = useSession()
  const loading = status === "loading"
  const [content, setContent] = useState()
  const [success, setSuccess] = useState(false)

  // Fetch content from protected route
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/examples/protected")
      const json = await res.json()
      if (json.content) {
        setContent(json.success)
      }
    }
    fetchData()
  }, [session])

  useEffect(() => {
    setSuccess(content)
  }, [content])

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
  console.log(success)
  return (
    <Layout>
      <h1>Khuddam Message Service</h1>
      <Form />
    </Layout>
  )
}
