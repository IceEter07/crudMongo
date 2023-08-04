const userCtrl = {}
const User = require('../models/User')
const passport = require('passport');

userCtrl.renderSignUpForm = (req, res) =>{
    res.render('users/signUp')
}

userCtrl.signUp = async (req, res) =>{
    const errors = [];
    const { name, email, password, confirm_password} = req.body;

    if (password != confirm_password){
        errors.push({text: 'Passwords do not mach'})
    }
    if(password.length < 4){
        errors.push({text:'Password must be at least 4 characters'})
    }
    if(errors.length > 0){
        res.render('users/signup', {
            errors, name, email
        })
    }
    else{
        const emailUser = await User.findOne({email: email})
        if(emailUser){
            req.flash('error_msg', 'The email is already in use');
            res.redirect('/user/signup');
        }
        else{
            const newUser = new User({name, email, password});
            newUser.password = await newUser.encrypPassword(password)
            await newUser.save();
            req.flash('success_msg', 'You are registered')
            res.redirect('/user/signin');
        }
    }
    }

userCtrl.renderSignInForm = (req, res) =>{
    res.render('users/signIn')
}

userCtrl.signIn = passport.authenticate('local', {
    failureRedirect: '/user/signin',
    successRedirect: '/notes',
    failureFlash: true
})

userCtrl.logout = (req, res) =>{
    //Agregar un callback al metodo logout para que pueda funcionar. (Desde la actualización más reciente)
    req.logout(req.user, err => {
        if(err) return next(err);
        req.flash('success_msg', 'You are logged out now');
        res.redirect('/user/signin')
      });
   
}

module.exports = userCtrl;