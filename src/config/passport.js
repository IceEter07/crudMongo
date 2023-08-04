const passport = require('passport')
const localStrategy = require('passport-local').Strategy

const User = require('../models/User')

passport.use(new localStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) =>{
    
    
    // Match email's user
    const user = await User.findOne({email})
    if (!user){
        return done(null, false, {message: 'Not user found'});
    }
    else{
        //Match password's user
        const match = await user.matchPassword(password);
        if(match){
            return done(null, user);
        } 
        else{
            return done(null, false, {message: 'Incorrect password'})
        }
    }

}));

passport.serializeUser((user, done) =>{
    done(null, user.id)
});

//El passport se puso de roñoso con el método definido en el curso, por lo que se tuvo que agregar un try y un catch.
passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  });