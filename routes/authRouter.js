const express= require("express");
const emailService = require("../services/emailservice");


const authRouter = express.Router();


authRouter.post('/send-email', emailService.transferEmail);



module.exports = authRouter;