// This is an example of to protect an API route
import { getSession } from "next-auth/react"
import type { NextApiRequest, NextApiResponse } from "next"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req })

  if (session) {
    res.send({
      success: true,
      completed: true,
      content: "Sign in Successful Test",
    })
  } else {
    res.send({
      success: false,
      completed: true,
      error: "Sign in Failed",
    })
  }
}
