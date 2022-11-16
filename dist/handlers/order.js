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
exports.Order = void 0;
const order_1 = require("../models/order");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secret = process.env.TOKEN_SECRET;
const store = new order_1.orderStore();
const Order = (app) => {
    app.get('/order', index);
    app.get('/order/:id', show);
    app.post('/order', create);
    app.post('/order/:id/product', addProduct);
    app.delete('/order/:id', destroy);
};
exports.Order = Order;
const verifyAuthToken = (req, res, next) => {
    try {
        const authorizationHeader = req.headers.authorization;
        const token = authorizationHeader.split(' ')[1];
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        next();
    }
    catch (error) {
        res.status(401);
    }
};
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const ow = yield store.index();
    res.json(ow);
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderr = {
            status: req.body.status,
            user_id: req.body.user_id,
        };
        const newOrder = yield store.create(orderr);
        res.json(newOrder);
        console.log(newOrder);
    }
    catch (error) {
        res.status(400);
        throw new Error(`cannot create new order${error}`);
    }
});
const addProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const quantity = Number(req.body.quantity);
    const orderId = req.params.id;
    const productId = req.body.productId;
    try {
        const addedProduct = yield store.addProduct(quantity, orderId, productId);
        res.json(addedProduct);
        console.log(addedProduct);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield store.show(req.params.user_id);
    res.json(order);
});
const destroy = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const showen = yield store.show(req.params.id);
    const deleted = yield store.delete(req.params.id);
    res.json(showen);
});
exports.default = exports.Order;
