export default function Form() {
  // Handles the submit event on form submit.
  const handleSubmit = async (event) => {
    // Stop the form from submitting and refreshing the page.
    event.preventDefault()

    // Get data from the form.
    const data = {
      phoneNumbers: document.getElementById("phoneNumbers").value,
      message: document.getElementById("message").value,
      phone: document.getElementById("phone").value,
    }

    // Send the data to the server in JSON format.
    const JSONdata = JSON.stringify(data)

    // API endpoint where we send form data.
    const endpoint = "/api/form"

    // Form the request for sending data to the server.
    const options = {
      // The method is POST because we are sending data.
      method: "POST",
      // Tell the server we're sending JSON.
      headers: {
        "Content-Type": "application/json",
      },
      // Body of the request is the JSON data we created above.
      body: JSONdata,
    }

    // Send the form data to our forms API on Vercel and get a response.
    const response = await fetch(endpoint, options)

    // Get the response data from server as JSON.
    // If server returns the name submitted, that means the form works.
    const result = await response.json()
    alert(`${result.data}`)
  }
  return (
    // We pass the event to the handleSubmit() function on submit.
    <form onSubmit={handleSubmit}>
      <label htmlFor="phoneNumbers">
        Phone Numbers
        <br />
        (One per line)
      </label>
      <br />
      <textarea name="phoneNumbers" id="phoneNumbers" />
      <br />
      <label htmlFor="message">Message</label>
      <br />
      <textarea name="message" id="message" />
      <br />
      <label htmlFor="phone">Your Phone Number</label>
      <br />
      <input name="phone" id="phone" />
      <br />
      <button type="submit">Submit</button>
    </form>
  )
}
