const express = require("express");
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const port = 2300;
const path = require('path');
const authRouter = require('./routes/authRouter');
const {sendEmail} = require('./utils/emailserivce');
// const connectDB = require('./config/db');

require('dotenv').config();






// connectDB();

// app.use(express.static(path.join(__dirname, 'assets')));
app.use(cors(
    {origin: "*", methods: ['GET, POST, PUT, DELETE'], allowedHeaders:'Content-Type,authorization'}
));
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use('/api/v2', authRouter);

app.get('/', (req, res) => {
    res.send('welcome to the server');
});


app.post('/send-email', (req, res) => {
    const { fullname, email, phone, city, message } = req.body;
    console.log(fullname, email, phone, city, message);
   sendEmail(
  "info@royalecleaners.co.uk",
  `New Contact Form Submission from ${fullname}`,
  `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Contact Form Submission</title>
  </head>
  <body style="margin:0; padding:0; font-family: Arial, Helvetica, sans-serif; background-color:#f4f6f8;">
    <!-- Banner -->
    <div style="background: linear-gradient(135deg, #0a3d62, #3c6382); padding: 20px; text-align:center; color: #050505ff;">
      <h1 style="margin:0; font-size: 24px;">Royale Cleaners</h1>
      <p style="margin:0; font-size: 14px;">New Contact Form Submission</p>
    </div>

    <!-- Content Container -->
    <div style="max-width:600px; margin:30px auto; background:#fff; padding:20px; border-radius:8px; box-shadow:0 4px 12px rgba(0,0,0,0.1);">
      
      <h2 style="color:#0a3d62; border-bottom:2px solid #f1f1f1; padding-bottom:10px;">Submission Details</h2>
      
      <p style="margin:10px 0; font-size:16px;">
        <strong style="color:#3c6382;">Full Name:</strong> ${fullname}
      </p>
      <p style="margin:10px 0; font-size:16px;">
        <strong style="color:#3c6382;">Phone:</strong> ${phone}
      </p>
      <p style="margin:10px 0; font-size:16px;">
        <strong style="color:#3c6382;">City:</strong> ${city}
      </p>
      <p style="margin:10px 0; font-size:16px;">
        <strong style="color:#3c6382;">Email:</strong> ${email}
      </p>

      <div style="margin-top:20px; padding:15px; background:#f9f9f9; border-left:4px solid #0a3d62;">
        <p style="margin:0; font-size:16px; color:#333;">
          <strong style="color:#0a3d62;">Message:</strong><br/>
          ${message}
        </p>
      </div>
    </div>

    <!-- Footer -->
    <div style="text-align:center; padding:15px; font-size:13px; color:#999;">
      &copy; ${new Date().getFullYear()} Royale Cleaners. All Rights Reserved.
    </div>
  </body>
  </html>
  `
).then(() => {
        console.log("Contact form email sent successfully!");
    }).catch((error) => {
        console.error("Error sending email:", error);
    });
    res.json({ success: true, message: "Data received" });
});


app.post('/book-appointment', (req, res) => {
  const { 
    fullname, 
    email, 
    phone, 
    city, 
    postcode,
    address,
    service, 
    date, 
    time, 
    supplyOption,
    propertyType,
    bedrooms, 
    bathrooms,
    toilets,
    lounges,
    conservatory,
    staircases,
    flooring,
    extras,
    payment,
    allergies,
    notes 
  } = req.body;

  console.log(
    fullname, email, phone, city, postcode, address,
    service, date, time, supplyOption, propertyType,
    bedrooms, bathrooms, toilets, lounges, conservatory, staircases,
    flooring, extras, payment, allergies, notes
  );

  sendEmail(
    "info@royalecleaners.co.uk",
    `New Cleaning Appointment Booking from ${fullname}`,
    `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <title>Cleaning Appointment Booking</title>
    </head>
    <body style="margin:0; padding:0; font-family: Arial, Helvetica, sans-serif; background-color:#f4f6f8;">
      
      <!-- Banner -->
      <div style="background: linear-gradient(135deg, #0a3d62, #3c6382); padding: 20px; text-align:center; color: #000000ff;">
        <h1 style="margin:0; font-size: 24px;">Royale Cleaners</h1>
        <p style="margin:0; font-size: 14px;">New Cleaning Appointment Booking</p>
      </div>

      <!-- Content Container -->
      <div style="max-width:600px; margin:30px auto; background:#fff; padding:20px; border-radius:8px; box-shadow:0 4px 12px rgba(0,0,0,0.1);">
        
        <h2 style="color:#0a3d62; border-bottom:2px solid #000000ff; padding-bottom:10px;">Appointment Details</h2>
        
        <p><strong style="color:#3c6382;">Full Name:</strong> ${fullname}</p>
        <p><strong style="color:#3c6382;">Phone:</strong> ${phone}</p>
        <p><strong style="color:#3c6382;">Email:</strong> ${email}</p>
        <p><strong style="color:#3c6382;">City:</strong> ${city}</p>
        <p><strong style="color:#3c6382;">Address:</strong> ${address || "N/A"}</p>
        <p><strong style="color:#3c6382;">Postcode:</strong> ${postcode}</p>
        <p><strong style="color:#3c6382;">Service Requested:</strong> ${service}</p>
        <p><strong style="color:#3c6382;">Preferred Date:</strong> ${date}</p>
        <p><strong style="color:#3c6382;">Preferred Time:</strong> ${time}</p>
        <p><strong style="color:#3c6382;">Supplies Option:</strong> ${supplyOption || "N/A"}</p>
        <p><strong style="color:#3c6382;">Property Type:</strong> ${propertyType || "N/A"}</p>
        <p><strong style="color:#3c6382;">Bedrooms:</strong> ${bedrooms || "N/A"}</p>
        <p><strong style="color:#3c6382;">Bathrooms:</strong> ${bathrooms || "N/A"}</p>
        <p><strong style="color:#3c6382;">Toilets:</strong> ${toilets || "N/A"}</p>
        <p><strong style="color:#3c6382;">Lounges:</strong> ${lounges || "N/A"}</p>
        <p><strong style="color:#3c6382;">Conservatory:</strong> ${conservatory || "N/A"}</p>
        <p><strong style="color:#3c6382;">Staircases:</strong> ${staircases || "N/A"}</p>
        <p><strong style="color:#3c6382;">Flooring Type:</strong> ${flooring || "N/A"}</p>
        <p><strong style="color:#3c6382;">Extras:</strong> ${(extras && extras.length > 0) ? extras.join(", ") : "N/A"}</p>
        <p><strong style="color:#3c6382;">Payment Method:</strong> ${payment || "N/A"}</p>
        <p><strong style="color:#3c6382;">Allergies:</strong> ${allergies || "N/A"}</p>

        <div style="margin-top:20px; padding:15px; background:#f9f9f9; border-left:4px solid #0a3d62;">
          <p style="margin:0; font-size:16px; color:#333;">
            <strong style="color:#0a3d62;">Additional Notes:</strong><br/>
            ${notes || "N/A"}
          </p>
        </div>
      </div>

      <!-- Footer -->
      <div style="text-align:center; padding:15px; font-size:13px; color:#999;">
        &copy; ${new Date().getFullYear()} Royale Cleaners. All Rights Reserved.
      </div>
    </body>
    </html>
    `
  )
  .then(() => {
    console.log("Appointment booking email sent successfully!");
    res.json({ success: true, message: "Appointment booking received" });
  })
  .catch((error) => {
    console.error("Error sending appointment booking email:", error);
    res.status(500).json({ success: false, message: "Failed to send booking" });
  });
});



// app.post('/book-appointment', (req, res) => {
//   const { fullname, email, phone, city, service, date, time, notes } = req.body;

//   console.log(fullname, email, phone, city, service, date, time, notes);

//   sendEmail(
//     "info@royalecleaners.co.uk",
//     `New Cleaning Appointment Booking from ${fullname}`,
//     `
//     <!DOCTYPE html>
//     <html lang="en">
//     <head>
//       <meta charset="UTF-8" />
//       <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
//       <title>Cleaning Appointment Booking</title>
//     </head>
//     <body style="margin:0; padding:0; font-family: Arial, Helvetica, sans-serif; background-color:#f4f6f8;">
      
//       <!-- Banner -->
//       <div style="background: linear-gradient(135deg, #0a3d62, #3c6382); padding: 20px; text-align:center; color: #000000ff;">
//         <h1 style="margin:0; font-size: 24px;">Royale Cleaners</h1>
//         <p style="margin:0; font-size: 14px;">New Cleaning Appointment Booking</p>
//       </div>

//       <!-- Content Container -->
//       <div style="max-width:600px; margin:30px auto; background:#fff; padding:20px; border-radius:8px; box-shadow:0 4px 12px rgba(0,0,0,0.1);">
        
//         <h2 style="color:#0a3d62; border-bottom:2px solid #f1f1f1; padding-bottom:10px;">Appointment Details</h2>
        
//         <p style="margin:10px 0; font-size:16px;">
//           <strong style="color:#3c6382;">Full Name:</strong> ${fullname}
//         </p>
//         <p style="margin:10px 0; font-size:16px;">
//           <strong style="color:#3c6382;">Phone:</strong> ${phone}
//         </p>
//         <p style="margin:10px 0; font-size:16px;">
//           <strong style="color:#3c6382;">City:</strong> ${city}
//         </p>
//         <p style="margin:10px 0; font-size:16px;">
//           <strong style="color:#3c6382;">Email:</strong> ${email}
//         </p>
//         <p style="margin:10px 0; font-size:16px;">
//           <strong style="color:#3c6382;">Service Requested:</strong> ${service}
//         </p>
//         <p style="margin:10px 0; font-size:16px;">
//           <strong style="color:#3c6382;">Preferred Date:</strong> ${date}
//         </p>
//         <p style="margin:10px 0; font-size:16px;">
//           <strong style="color:#3c6382;">Preferred Time:</strong> ${time}
//         </p>

//         <div style="margin-top:20px; padding:15px; background:#f9f9f9; border-left:4px solid #0a3d62;">
//           <p style="margin:0; font-size:16px; color:#333;">
//             <strong style="color:#0a3d62;">Additional Notes:</strong><br/>
//             ${notes || "N/A"}
//           </p>
//         </div>
//       </div>

//       <!-- Footer -->
//       <div style="text-align:center; padding:15px; font-size:13px; color:#999;">
//         &copy; ${new Date().getFullYear()} Royale Cleaners. All Rights Reserved.
//       </div>
//     </body>
//     </html>
//     `
//   ).then(() => {
//     console.log("Appointment booking email sent successfully!");
//   }).catch((error) => {
//     console.error("Error sending appointment booking email:", error);
//   });

//   res.json({ success: true, message: "Appointment booking received" });
// });


app.listen(port, ()=>{
    console.log(`server running at http://localhost:${port}/`)
});

module.exports = app;