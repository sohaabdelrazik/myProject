import {product,productStore} from '../models/product';
const store = new productStore ;
const p:product={
    id:1,
    name:"tomato",
    price:3
}
describe('product Model',()=>{
    it('expect create method to be defined',()=>{
        expect(store.create).toBeDefined();
    });


    it('expect show method to have list of products', async()=>{
        const result = await store.show('1');
        expect(result).toHaveSize(3);
    });
    it('expect show method to return list of products', async()=>{
        const result = await store.show('1');
        expect(result).toEqual({id:1,name:'tomato',price:3});
    });
});