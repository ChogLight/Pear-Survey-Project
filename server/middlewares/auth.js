/*"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isLoggedIn = void 0;
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = __importDefault(require("passport-local"));
const user_1 = __importDefault(require("../models/user"));
const LocalStrategy = passport_local_1.default.Strategy;
const strategyOptions = {
    usernameField: "username",
    passwordField: "password",
    passReqToCallback: true
};
const loginFunction = (req, username, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.default.findOne({ username });
    if (!user) {
        return done(null, false, { message: "User does not exist" });
    }
    if (!(yield user.isValidPassword(password))) {
        return done(null, false, { message: "Password is not valid" });
    }
    console.log("User Authenticated Successfully");
    return done(null, user);
});
const signupFunction = (req, username, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password, FirstName, LastName, email } = req.body;
        console.log(req.body);
        if (!username || !password || !email || !FirstName || !LastName) {
            console.log("Invalid body fields");
            return done(null, false);
        }
        const query = {
            $or: [{ username: username }, { email: email }]
        };
        console.log(query);
        const user = yield user_1.default.findOne(query);
        if (user) {
            console.log('User already exists');
            console.log(user);
            return done(null, false);
        }
        else {
            const userData = {
                username,
                password,
                email,
                displayName: FirstName + " " + LastName
            };
            const newUser = new user_1.default(userData);
            yield newUser.save();
            return done(null, newUser);
        }
    }
    catch (err) {
        done(err);
    }
});
passport_1.default.use('login', new LocalStrategy(strategyOptions, loginFunction));
passport_1.default.use('signup', new LocalStrategy(strategyOptions, signupFunction));
const isLoggedIn = (req, res, done) => {
    if (!req.user) {
        return res.status(401).json({ msg: 'Unauthorized' });
    }
    done(null, req.user);
};
exports.isLoggedIn = isLoggedIn;
passport_1.default.serializeUser((user, done) => {
    done(null, user._id);
});
passport_1.default.deserializeUser((userId, done) => {
    user_1.default.findById(userId, function (err, user) {
        done(err, user);
    });
});
exports.default = passport_1.default;*/