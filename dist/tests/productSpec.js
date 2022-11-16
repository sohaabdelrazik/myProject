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
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = require("../models/product");
const store = new product_1.productStore;
const p = {
    id: 1,
    name: "tomato",
    price: 3
};
describe('product Model', () => {
    it('expect create method to be defined', () => {
        expect(store.create).toBeDefined();
    });
    it('expect show method to have list of products', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield store.show('1');
        expect(result).toHaveSize(3);
    }));
    it('expect show method to return list of products', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield store.show('1');
        expect(result).toEqual({ id: 1, name: 'tomato', price: 3 });
    }));
});
