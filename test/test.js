let chai = require("chai");
let server = require("../index");
let chaiHttp = require("chai-http");

//Assertion

chai.should();

chai.use(chaiHttp);

describe("Test Api", () => {
  // Test GET Route

  describe("POST  /getTweets", () => {
    it("it should GET all the tweets", (done) => {
      chai
        .request(server)
        .post("/getTweets")
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");
          done();
        });
    });
    it("It should NOT GET all the tweets", (done) => {
      chai
        .request(server)
        .post("/getTweets")
        .end((err, response) => {
          response.should.have.status(200);
          done();
        });
    });
  });

  // Test POST Route
  describe("POST  /postTweet", () => {
    it("it should post the tweet", (done) => {
      const params = { status: "mocha Test Passed!" };
      chai
        .request(server)
        .post("/postTweet")
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");
          done();
        });
    });
    it("It should NOT post the tweet", (done) => {
      chai
        .request(server)
        .post("/postTweet")
        .end((err, response) => {
          response.should.have.status(200);
          done();
        });
    });
  });

  // Test DELETE Route

  describe("POST  /deleteTweet", () => {
    it("it should delete the tweet", (done) => {
      chai
        .request(server)
        .post("/deleteTweet")
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");
          done();
        });
    });
    it("It should NOT delete the tweet", (done) => {
      chai
        .request(server)
        .post("/postTweet")
        .end((err, response) => {
          response.should.have.status(200);
          done();
        });
    });
  });
});
