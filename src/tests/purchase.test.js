const request = require('supertest');
const app = require('../app');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
require('../models');
let token;
beforeAll(async () => {
    const credentials = {
        email:"test@user.com",
        password:"user123"
    }
    const res = await request(app).post('/users/login').send(credentials);
    token = res.body.token;
});

test('POST /purchases should be able to checkout the cart', async () => {
    const product = await Product.create({
        title: "Smart Tv Led",
        description: "televisor de alta calidad con una pantalla grande y tecnología LED. Ofrece una experiencia de visualización inmersiva con colores vibrantes y una resolución nítida. Es perfecto para disfrutar de películas, programas de televisión y juegos con una calidad de imagen impresionante.",
        brand: "Samsung",
        price: 299.99
    });

    const cart = await Cart.create({
        userId: 1,
        productId: product.id,
        quantity: 1
    });

    const res = await request(app)
        .post('/purchases')
        .set('Authorization', `Bearer ${token}`)
        .send(cart);

    await product.destroy();
    expect(res.status).toBe(200);
    expect(res.body.id).toBeDefined();
});

test('GET /purchases should be able to access the user purchases', async () => {
    const res = await request(app)
        .get('/purchases')
        .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});