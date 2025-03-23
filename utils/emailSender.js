const nodemailer = require("nodemailer");
 
const emailSender = async( email, subject, text, template ) => {

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        auth: {
          user: process.env.ADMIN_EMAIL,
          pass: process.env.ADMIN_PASSWORD,
        },
      });

        const info = await transporter.sendMail({
            from: `HomeMate Services`,
            to: email, 
            subject: `${subject}`, 
            text: `${text}`, 
            html: `${template}`,
        });
        console.log("Message sent: %s", info.messageId);
        if(info){
            return true;
        }
        else{
            throw new Error("Email not sended");
        }       
}

module.exports = emailSender;