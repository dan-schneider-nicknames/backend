const { GraphQLNonNull, GraphQLString } = require("graphql");
const { tokenBuilder } = require("../../middleware/tokenbuilder");
const bcrypt = require("bcryptjs");
const env = process.env;


var nodeMailer = require("nodemailer");
const { off } = require("../../server");

var transporter = nodeMailer.createTransport({
  host: "smtp.gmail.com",
  port: env.SECURE_MAIL ? 465 : 587,
  secure: env.SECURE_MAIL,
  requireTLS: true,
  auth: {
    user: env.MAIL_EMAIL,
    pass: env.MAIL_PASSWORD,
  },
});

var mailMessage = {
  from: env.MAIL_EMAIL,
  subject: "Schneider Social",
};

const customMail = (name) => {
    return `Thank you, ${name} for joining Schneider Social, we hope you enjoy our platform. Feel free to get as raunchy as need be with your nicknames! If you ever get lost, you can find us at : https://dan-schneider-nicknames.github.io/frontend/`
}

const userMutations = {
  addUser: {
    name: "addUser",
    type: GraphQLString,
    args: {
      email: { type: new GraphQLNonNull(GraphQLString) },
      password: { type: new GraphQLNonNull(GraphQLString) },
      username: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve: async (parent, args, { modals, authentication }) => {
      try {
        await authentication.signupValidation(modals, args);
        const hash = bcrypt.hashSync(args.password, 10);
        const newUser = await modals.Users.addUser({ ...args, password: hash });
        transporter.sendMail({...mailMessage, to: newUser.email, text: customMail(newUser.username) }, function( error, data ){
            if (error) {
                console.log(error);
              } else {
                console.log("Email sent: " + data.response);
              }
        })
        return tokenBuilder(newUser);
      } catch (err) {
        throw err;
      }
    },
  },
  login: {
    name: "login",
    type: GraphQLString,
    args: {
      password: { type: new GraphQLNonNull(GraphQLString) },
      username: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve: async (parent, args, { modals }) => {
      try {
        const { password, username } = args;
        const user = await modals.Users.getUserByContext(username);
        if (!user) throw new Error("Invalid Username or Email");
        const { password: hashedPassword } = user;
        if (!bcrypt.compareSync(password, hashedPassword)) {
          throw new Error("Invalid password");
        }
        return tokenBuilder(user);
      } catch (err) {
        throw err;
      }
    },
  },
};

module.exports = userMutations;
