// server.test.js
const request = require("supertest");
const app = require("../app"); // Import your Express app

describe("It should throw bad error for body missing!", () => {
  test("POST /api/register", async () => {
    // const body = {
    //     email: "abc@gmail.com",
    //     password: "abcsdsd@323"
    // }
    const response = await request(app).post("/api/register").send({});
    expect(response.status).toBe(400);
  });
}); //here ?

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


// this test is to make sure if u send empty data in body it should call bad request
describe("It should send 400 for bad request for login", () => {
  test("POST /api/login", async () => {
    const response = await request(app).post("/api/login").send({}) // empty;
    expect(response.status).toBe(400) // so expect status to be 400
  });
});

describe("It should send 400 for Invlid email and password", () => {
  test("POST /api/login", async () => {
    const body = {
      email: "abc@gmail.com",
      password: "abcsdsd@323",
    };
    const response = await request(app).post("/api/login").send(body) // if u try to login with a user that doesnt exists
    expect(response.status).toBe(400);  // Invlid email and password
    expect(response.body.message).toBe("Invlid email and password") // in response this message is there, where its comming from go to auth controller
  });
});

// Now I didnt register the user so there is no user exists so I need to register and login
// see below test

describe("It should resigter user and make success login", () => {
  test("POST /api/login", async () => {
    const body = {
      email: "abc@gmail.com",
      password: "abcsdsd@323",
    };
    const response = await request(app).post("/api/register").send(body); // first register with correct data
    expect(response.status).toBe(200);

    const login = await request(app).post("/api/login").send(body) // now db is in memory so test is running which mean
    // in memory db a new user just registered so we can login with that user
    expect(login.status).toBe(200);
  });
});

// same thing here first register then login -> now in login case you get a response with
// {...user, token}
// so this test to make sure after login u have a token
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

// here
describe("It should return 400 for Invalid emaail and password", () => {
  test("POST /api/login", async () => {
    const registerBody = {
      email: "abc@gmail.com",
      password: "abcsdsd@323",
    };

    const loginBody = {
      email: "abc@gmail.com",
      password: "123232323" //wrong password
    }

    const registerResponse = await request(app)
      .post("/api/register")
      .send(registerBody);
    expect(registerResponse.status).toBe(200) // this will pass becuase registerion data is correct

    const loginResponse = await request(app).post("/api/login").send(loginBody);
    expect(loginResponse.status).toBe(400); // this fails password mis matched
    expect(loginResponse.body.message).toBe("Invlid email and password")

  });
});
