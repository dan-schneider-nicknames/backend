const axios = require('axios')
const { EMAIL_API_URL, MAIL_EMAIL } = process.env;
const verifyURL = EMAIL_API_URL
const transporter = require("./mail")


const sendConfirmation = (newUser) => {
    const customMail = (name) => {
      return `Thank you, ${name} for joining Schneider Social, we hope you enjoy our platform. Feel free to get as raunchy as need be with your nicknames! If you ever get lost, you can find us at : https://dan-schneider-nicknames.github.io/frontend/`
    }
    const mailMessage = {
      from: MAIL_EMAIL,
      subject: "Schneider Social",
    };
    transporter.sendMail({
        ...mailMessage, 
        to: newUser.email, 
        text: customMail(newUser.username) 
    }, (error, data) => {
        console.log(error ? error : "Email sent: " + data.response)
    })
}

const signupValidation = async (modals, {email, username}) => {
    try{
        await checkEmailExists(email)
        await checkEmailUnique(email, modals)
        await checkUsernameUnique(username, modals)
    } catch(err) {
        throw err
    }
}

const checkEmailExists = async email => {
    const exists = await axios.get(verifyURL + email)
    if (!exists.data.status) {
        throw new Error("Not a valid email")
    }
}

const checkEmailUnique = async (email, modals) => {
    const oldUser = await modals.Users.getUserByEmail(email);
    if (oldUser) {
        throw new Error("User already exists with that Email");
    }
} 
const checkUsernameUnique = async (username, modals) => {
    const olderUser = await modals.Users.getUserByUsername(username);
    if (olderUser) {
        throw new Error("User already exists with that Username");
    }
}

module.exports = {
    signupValidation,
    sendConfirmation
}