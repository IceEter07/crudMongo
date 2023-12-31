const helpers = {};

helpers.validation = (req, res, next) =>{
    if (req.isAuthenticated()){
        return next();
    }
    req.flash('error_msg', 'Not authorized');
    res.redirect('/user/signin');
}

module.exports = helpers;