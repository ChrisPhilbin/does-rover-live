const request = require("supertest");
const BASE_URL = "http://127.0.0.1:5001/does-rover-live/us-central1/api";

describe("Provide movie title and return properly formatted results", () => {
  const requestBody = { movieTitle: "twister" };

  it("Should return an error if no movie title is provided.", async () => {
    const response = await request(BASE_URL).post("/movies/search").send({ movieTitle: "" });
    expect(response.statusCode).toBe(400);
  });

  it("Should return an HTTP status code of 200 without errors.", async () => {
    const response = await request(BASE_URL).post("/movies/search").send(requestBody);
    expect(response.statusCode).toBe(200);
    expect(response.body.error).toBe(undefined);
  });

  it("Should contain at least one movie title returned from the server.", async () => {
    const response = await request(BASE_URL).post("/movies/search").send(requestBody);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it("Should contain valid vote counts of dogLives and dogDies.", async () => {
    const response = await request(BASE_URL).post("/movies/search").send(requestBody);
    expect(response.body[0].dogLives).toBeTruthy();
    expect(response.body[0].dogDies).toBeTruthy();
  });
});

describe("Receive 5 trending movie titles", () => {
  it("Should return an HTTP status code of 200 without errors.", async () => {
    const response = await request(BASE_URL).get("/movies/trending");
    expect(response.statusCode).toBe(200);
    expect(response.body.error).toBe(undefined);
  });

  it("Should return a list containing 5 movie titles.", async () => {
    const response = await request(BASE_URL).get("/movies/trending");
    expect(response.body.length).toBe(5);
  });

  it("Should return results formatted with a valid movieTitle and timesSearched property.", async () => {
    const response = await request(BASE_URL).get("/movies/trending");
    expect(response.body[0].movieTitle).toBeTruthy();
    expect(response.body[0].timesSearched).toBeTruthy();
  });
});

describe("Sucessfully update vote counts of provided movieId", () => {
  const movieId = "664";

  it("Should return an error if a non-boolean value is provided.", async () => {
    const response = await request(BASE_URL).put(`/movies/${movieId}`).send({ vote: "non-boolean-value" });
    expect(response.statusCode).toBe(400);
  });

  it("Should receive an updated movie object if given a boolean value", async () => {
    const response = await request(BASE_URL).put(`/movies/${movieId}`).send({ vote: true });
    expect(response.statusCode).toBe(200);
    expect(response.body.dogDies).toBeTruthy();
    expect(response.body.dogLives).toBeTruthy();
    expect(response.body.movieId).toBe(movieId);
  });

  it("Should return an error if given a non-existent movieId.", async () => {
    const response = await request(BASE_URL).put(`/movies/99999999`).send({ vote: true });
    expect(response.statusCode).toBe(400);
  });
});
