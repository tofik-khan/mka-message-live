export default function handler(req, res) {
  // Get data submitted in request's body.
  const body = req.body

  // Guard clause checks for first and last name,
  // and returns early if they are not found
  if (!body.phoneNumbers || !body.message) {
    // Sends a HTTP bad request error code
    return res.status(400).json({ success: false, message: "Missing Inputs" })
  }

  let phoneNumbers = body.phoneNumbers
  phoneNumbers = phoneNumbers.split("\n")
  phoneNumbers = phoneNumbers.map((number) => {
    let filtered = number.match(/\d+/g).join("") //extract only numbers
    if (filtered.length == 10) {
      // phone number is in the form: 3601231234
      //  add +1 to the number
      filtered = "+1" + filtered
    } else if (filtered.length == 11) {
      // phone number is in the form: 13601231234
      // add + to the number
      filtered = "+" + filtered
    } else {
      // bad phone number, do not include
      filtered = ""
    }

    return filtered
  })

  //remove duplicates
  phoneNumbers = [...new Set(phoneNumbers)]

  const accountSid = process.env.TWILIO_ACCOUNT_SID // Your Account SID from www.twilio.com/console
  const authToken = process.env.TWILIO_AUTH_TOKEN // Your Auth Token from www.twilio.com/console

  const twilio = require("twilio")
  const client = new twilio(accountSid, authToken)

  let status = ""

  //Add Automatic message footer:
  body.message = body.message + "\n\nThis is an automated message."

  phoneNumbers.map((number) => {
    if (number.length < 1) return
    client.messages
      .create({
        body: body.message,
        to: number, // Text this number
        messagingServiceSid: "MG84a191c6a1a4e664f4f76ff133609145",
      })
      .then((message) => console.log(message))
  })

  // Found the name.
  // Sends a HTTP success code
  res.status(200).json({
    success: true,
    status: status,
    data: `Messages Sent`,
  })
}
