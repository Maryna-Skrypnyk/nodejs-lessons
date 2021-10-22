const request = require("supertest");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const db = require("../config/db");
const app = require("../app");
const { Cat } = require("../model/cat");
const { User } = require("../model/user");
const { newCat, newUserForRouteCat } = require("./data/data");

describe("Test route cats", () => {
  let user, token;
  beforeAll(async () => {
    await db;
    await User.deleteOne({ email: newUserForRouteCat.email });
    user = await User.create(newUserForRouteCat);
    const SECRET_KEY = process.env.JWT_SECRET_KEY;
    const issueToken = (payload, secret) => jwt.sign(payload, secret);
    token = issueToken({ id: user._id }, SECRET_KEY);
    await User.updateOne({ _id: user._id }, { token });
  });

  afterAll(async () => {
    const mongo = await db;
    await User.deleteOne({ email: newUserForRouteCat.email });
    await mongo.disconnect();
  });

  beforeEach(async () => {
    await Cat.deleteMany({});
  });

  describe("GET request", () => {
    it("should return status 200 get all cats", async () => {
      const response = await request(app)
        .get("/api/cats")
        .set("Authorization", `Bearer ${token}`);
      expect(response.status).toEqual(200);
      expect(response.body).toBeDefined();
      expect(response.body.data.cats).toBeInstanceOf(Array);
    });
    it("should return status 200 get by id cats", () => {});
    it("should return status 404 if cat not found", () => {});
  });
});
