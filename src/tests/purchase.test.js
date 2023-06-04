const request = require('supertest');
const app = require('../app');
const Product = require('../models/Product');
const Purchase = require('../models/Purchase');
require('../models');
let token;
let productId;
let purchaseId;

beforeAll(async () => {
  const credentials = {
    email: "test@user.com",
    password: "user123"
  };
  const res = await request(app)
    .post('/users/login')
    .send(credentials);
  token = res.body.token;
});

test('POST /purchases should be able to checkout the cart', async () => {
  const product = await Product.create({
    title: "Smart Tv Led",
    description: "televisor de alta calidad con una pantalla grande y tecnología LED. Ofrece una experiencia de visualización inmersiva con colores vibrantes y una resolución nítida. Es perfecto para disfrutar de películas, programas de televisión y juegos con una calidad de imagen impresionante.",
    brand: "Samsung",
    price: 299.99
  });

  productId = product.id;

  const purchase = await Purchase.create({
    cartId: 1, // Reemplaza 1 con el ID del carrito que deseas utilizar
    quantity: 1
  });

  purchaseId = purchase.id;

  const res = await request(app)
    .post('/purchases')
    .set('Authorization', `Bearer ${token}`)
    .send({ purchaseId });

  await product.destroy();
  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
});

test('GET /purchases should be able to access the user purchases', async () => {
  const res = await request(app)
    .get('/purchases')
    .set('Authorization', `Bearer ${token}`);

  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);
});