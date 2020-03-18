var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var Users = require('./models/user');

var JwtStrategy = require("passport-jwt").Strategy;
var ExtractJwt = require("passport-jwt").ExtractJwt;
var jwt = require("jsonwebtoken");
var config = require("./config.js");

 var m_username;

exports.local = passport.use(new LocalStrategy(Users.authenticate()));
passport.serializeUser(Users.serializeUser());
passport.deserializeUser(Users.deserializeUser());

exports.getToken = function(user) {
    return jwt.sign(user, config.secretKey, 
        {expiresIn: 3600});
}

exports.getUsername = function() {
    return m_username;
}

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secretKey;

exports.jwtPassport = passport.use(new JwtStrategy(opts,
    (jwt_payload, done) => {
        console.log("JWT payload: ", jwt_payload);
        Users.findOne({id: jwt_payload.sub}, (err,user) => {
            if (err) {
                return done(err, false);      
            }
            else if (user) {
                Users.findById(jwt_payload._id, (err, currentUser) => {
                    m_username = currentUser.username;
                });
                return done(null, user);
            }
            else {
                return done(null, false);
            }
        });
    }));
    exports.verifyOrdinaryUser = passport.authenticate('jwt', {session: false});
