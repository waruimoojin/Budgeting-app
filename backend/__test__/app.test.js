// server.test.js
const request = require("supertest");
const app = require("../app");

describe("It should throw bad error for body missing!", () => {
  test("POST /api/register", async () => {

    const response = await request(app).post("/api/register").send({});
    expect(response.status).toBe(400);
  });
});

describe("It should register user and send 200 as success code", () => {
  test("POST /api/register", async () => {
    const body = {
      email: "abc@gmail.com",
      password: "abcsdsd@323",
    };
    const response = await request(app).post("/api/register").send(body);
    expect(response.status).toBe(200);
  },10000);
});



describe("It should send 400 for bad request for login", () => {
  test("POST /api/login", async () => {
    const response = await request(app).post("/api/login").send({})
    expect(response.status).toBe(400)
  });
});

describe("It should send 400 for Invlid email and password", () => {
  test("POST /api/login", async () => {
    const body = {
      email: "abc@gmail.com",
      password: "abcsdsd@323",
    };
    const response = await request(app).post("/api/login").send(body)
    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Invlid email and password")
  });
});


describe("It should resigter user and make success login", () => {
  test("POST /api/login", async () => {
    const body = {
      email: "abc@gmail.com",
      password: "abcsdsd@323",
    };
    const response = await request(app).post("/api/register").send(body);
    expect(response.status).toBe(200);

    const login = await request(app).post("/api/login").send(body)
    expect(login.status).toBe(200);
  });
});


describe("Body should have a token after login", () => {
  test("POST /api/login", async () => {
    const body = {
      email: "abc@gmail.com",
      password: "abcsdsd@323",
    };

    const registerResponse = await request(app)
      .post("/api/register")
      .send(body);
    expect(registerResponse.status).toBe(200);

    const loginResponse = await request(app).post("/api/login").send(body);
    expect(loginResponse.status).toBe(200);

    expect(loginResponse.body).toHaveProperty("token");
  });
});


describe("It should return 400 for Invalid emaail and password", () => {
  test("POST /api/login", async () => {
    const registerBody = {
      email: "abc@gmail.com",
      password: "abcsdsd@323",
    };

    const loginBody = {
      email: "abc@gmail.com",
      password: "123232323"
    }

    const registerResponse = await request(app)
      .post("/api/register")
      .send(registerBody);
    expect(registerResponse.status).toBe(200)

    const loginResponse = await request(app).post("/api/login").send(loginBody);
    expect(loginResponse.status).toBe(400);
    expect(loginResponse.body.message).toBe("Invlid email and password")

  });
});
