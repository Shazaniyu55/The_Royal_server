const {sendEmail} = require('../utils/emailserivce');

const emailService = {
    async transferEmail(fullname, email, phone, city, message) {
       try{
            const subject = `New Contact Form Submission from ${fullname}`;
             // HTML email content
    const htmlContent = `
      <h2>New Contact Form Submission</h2>
      <p><strong>FullName:</strong> ${fullname}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>City:</strong> ${city}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `;

         // Send the email to your business address
    await sendEmail(
      "info@royalecleaners.co.uk", // Recipient (your business inbox)
      subject,
      
      htmlContent
    );

    console.log("Contact form email sent successfully!");
    return { success: true, message: "Email sent successfully" };


       }catch(error){
        console.error("Error sending email:", error);
        throw new Error("Email sending failed");
       }
      },

     

      
}



module.exports = emailService;