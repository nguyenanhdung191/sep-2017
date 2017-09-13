const passport = require('passport');
const user = require("./data/user.json");
const {
  BasicStrategy
} = require('passport-http');

passport.use(new BasicStrategy((username, password, done) => {
  console.log(user);
  if (user[username] === password) {
    return done(null, {
      username
    })
  }

  return done({
    status: "ERROR",
    message: "Invalid username/password combination"
  })
}));

module.exports = {
  passport
};