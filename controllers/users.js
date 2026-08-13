const User = require("../models/user.js");
const passport = require("passport");



module.exports.renderSignup = (req, res) => {
    res.render("users/signup.ejs");
};

module.exports.signup = async (req, res) => {
    try {
    let { username, email, password } = req.body;
    const newUser = new User({email, username});
    const registeredUser = await User.register(newUser, password);
    console.log(registeredUser);
    req.login(registeredUser, (err) => {
        if(err) {
            return next(err);
        }
        req.flash("success", "Welcome to WanderLust!");
        res.redirect("/listings"); 
    });
    } catch(e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }
};


module.exports.renderLogin = (req, res) => {
    res.render("users/login.ejs");
};

module.exports.login = async(req, res) => {
    req.flash("success", "Welcome back to WanderLust!");
    res.redirect(res.locals.redirectUrl || "/listings");
};

module.exports.logout = (req, res) => {
    req.logout((err) => {
        if(err) {
            req.flash("error", "Error logging out!");
            return res.redirect("/listings");
        }
        req.flash("success", "You have been logged out!");
        res.redirect("/listings");
    });
};
