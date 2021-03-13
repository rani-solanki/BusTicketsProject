const app = require("./server.js");
const supertest = require("supertest");
const request = supertest(app);
// const http = require('http').createServer(app).listen(3000);

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

// endpoints for get all database ;

app.post("/signup", async (req, res) => {
  const { seatNumber, status} = req.body;
  const user = new User({ seatNumber, status });
  const ret = await user.save();
  res.json(ret);
});


it("Should save user to database", async done => {
  const res = await request.post("/signup").send({
    seatNumber: 1,
    status : "open"
  });
  done();
});

