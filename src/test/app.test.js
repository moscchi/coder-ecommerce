const server = require("../server");
const request=require('supertest');
const mongoose =  require('mongoose');

// interface carrito {
//     id_car: Number,
//     list: Array<Object>
// }

// interface producto {
//     title: String,
//     price: Number,
//     thumbnail:String,
//     id_prod: Number,
//     timestamp: String,
//     description: String,
//     stock: Number
// }

describe('Test Ecommerce - Carritos', () => {
    beforeEach(async()=>{
        await mongoose.connection.collections['ecommerce.carritos-test'].drop();
    })

    it('Probando crear nuevo carrito', async () =>{
        const newProduct/*: producto*/ = {
            title: "Mockeo",
            price: 20,
            thumbnail: "http:imagen.com",
            id_prod: 7,
            timestamp: "5/1/2020",
            description: "Esto es un test",
            stock: 100
        }
        const newCarrito/*: carrito*/ = {
            id_car: 1,
            list: [newProduct, newProduct]
        }

        const response = await request(server).post('/api/carrito').send(newCarrito);
        expect(response.body.sender).toBe(newCarrito.id_car);
        expect(response.body.sender).toBe(newCarrito.list);
    })
})