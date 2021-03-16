const app = require("./server.js");
const supertest = require("supertest");
const request = supertest(app);

beforeAll(() => {
  jest.useFakeTimers()
})

app.get("/test", async (req, res) => {
  res.json({ message: "pass!" });
});

it("gets the test endpoint", async done => {
  const response = await request.get("/test");

  expect(response.status).toBe(200);
  expect(response.body.message).toBe("pass!");
  done();
});

// connect with mongodb 
const mongoose = require("mongoose");
const databaseName = "test";

beforeAll(async () => {
  const url = `mongodb://127.0.0.1/${databaseName}`;
  await mongoose.connect(url, { useNewUrlParser: true });
});

afterAll(done => {
  // Closing the DB connection allows J const Routesest to exit successfully.
  mongoose.connection.close()
  done()
})


