// This is an example of to protect an API route
import { getSession } from "next-auth/react"
import type { NextApiRequest, NextApiResponse } from "next"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req })

  let authorizedUsers: string[] = [
    "tofik.khan@mkausa.org",
    "t.khan@students.clark.edu",
  ]

  if (session) {
    if (authorizedUsers.includes(session?.user.email)) {
      res.send({
        success: true,
        completed: true,
        response: "success",
      })
    } else {
      res.send({
        success: false,
        completed: true,
        response: "unauthorized",
      })
    }
  } else {
    res.send({
      success: false,
      completed: true,
      error: "nosignin",
    })
  }
}
