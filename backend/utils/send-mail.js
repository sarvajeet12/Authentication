const Transporter = require('../configs/mail-config');


const sendMailToUser = async (email, title, body) => {

    let info = await Transporter.sendMail({
        from: "Authentication",
        to: `${email}`,
        subject: `${title}`,
        html: `${body}`
    })

    // console.log("Info: ", info);

    return info;  // optional
}


module.exports = sendMailToUser;