// const axios = require('axios')
const { MAIL_EMAIL } = process.env;
// const verifyURL = EMAIL_API_URL
const transporter = require("./mail")
const mailMessage = {
  from: MAIL_EMAIL,
  subject: "Schneider Social",
};

const sendConfirmation = (newUser) => {
    const customMail = (name) => {
      return `Thank you, ${name} for joining Schneider Social, we hope you enjoy our platform. Feel free to get as raunchy as need be with your nicknames! If you ever get lost, you can find us at : https://dan-schneider-nicknames.github.io/frontend/`
    }
    transporter.sendMail({
        ...mailMessage, 
        to: newUser.email, 
        text: customMail(newUser.username) 
    }, (error, data) => {
        console.log(error ? error : "Email sent: " + data.response)
    })
}

const sendResetToken = (resetToken, to) => {
    const resetMail = {
        ...mailMessage,
        to,
        text: `Follow this link to reset your passord: https://dan-schneider-nicknames.github.io/frontend/reset/${resetToken}`
    }
    transporter.sendMail({
        ...resetMail
    }, (error, data) => {
        console.log(error ? error : "Email sent: " + data.response)
    })
}

const signupValidation = async (modals, {email, username}) => {
    try{
        // await checkEmailIsValid(email)
        await checkEmailUnique(email, modals)
        await checkUsernameUnique(username, modals)
    } catch(err) {
        throw err
    }
}

// const checkEmailIsValid = async email => {
//     const exists = await axios.get(verifyURL + email)
//     if (!exists.data.status) {
//         throw new Error("Not a valid email")
//     }
// }

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

const validateNickname = async (nickname, modals) => {
    try {
        const isValid = nickname.includes("Dan") || nickname.includes("Schneider")
        if (!isValid) throw new Error("Must include 'Dan' or 'Schneider'")
        const similarNicknames = await modals.Users.getNicknameBy({ nickname })
        similarNicknames.forEach(n => {
            if (n.nickname === nickname) throw new Error("Nickname already exists");
        })
    
    } catch(err) {
        throw err
    }
}


module.exports = {
    signupValidation,
    sendConfirmation,
    sendResetToken,
    validateNickname
}