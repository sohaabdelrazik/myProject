"use strict";
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
exports.create = exports.User = void 0;
const user_1 = require("../models/user");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secret = process.env.TOKEN_SECRET;
const store = new user_1.userInformation();
const User = (app) => {
    app.get('/user', index);
    app.get('/user/:id', show);
    app.post('/user', exports.create);
    app.post('/users', authenticate);
    app.delete('/user/:id', destroy);
};
exports.User = User;
const verifyAuthToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authorizationHeader = req.headers.authorization;
        const token = authorizationHeader.split(' ')[1];
        // const ourToken=await
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        if (decoded) {
            next();
        }
    }
    catch (error) {
        res.status(401);
        res.json(error);
    }
});
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // try {
    //     const authorizationHeader = req.headers.authorization as string
    //     const token = JSON.parse(authorizationHeader.split(' ')[1])
    //     jwt.verify(token, secret)
    // } catch(err) {
    //     res.status(401)
    //     res.json('Access denied, invalid token')
    //     return
    // }
    // const token:Promise<void>=create(req,res);
    // try{
    //     jwt.verify(token,secret)
    // }
    // catch(error){
    //     res.json('invalid token');
    // }
    const users = yield store.index();
    res.json(users);
});
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield store.show(req.params.id);
    res.json(user);
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const User = {
            firstName: req.body.firstName,
            password: req.body.password,
            lastName: req.body.lastName,
        };
        const newUser = yield store.create(User);
        var token = jsonwebtoken_1.default.sign({ user: newUser }, secret);
        if (!token) {
            throw new Error('token is empty');
        }
        res.json(token);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
});
exports.create = create;
const authenticate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password,
    };
    try {
        const u = yield store.authenticate(user.firstName, user.password);
        var token = jsonwebtoken_1.default.sign({ user: u }, secret);
        if (!token) {
            throw new Error('token is empty');
        }
        res.json(token);
    }
    catch (error) {
        res.status(401);
        res.json({ error });
    }
});
const destroy = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const deleted = yield store.delete(req.params.id);
    res.json(deleted);
});
exports.default = exports.User;
