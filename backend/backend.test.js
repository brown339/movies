const request = require("supertest");
const app = require("./backend");

describe("/api/genres", () => {
    test("returns genres", async () => {
        const response = await request(app).get("/api/genres")
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(expect.arrayContaining(["Crime", "Drama"]));
    });
});

describe("/api/movies", () => {
    test("returns movies", async () => {
        const response = await request(app).get("/api/movies")
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBeGreaterThan(100)
        expect(response.body.length).toBeLessThan(1000)
        expect(response.body[0].title).toBeTruthy()
    });

    test("'limit' has a max", async () => {
        const response = await request(app).get("/api/movies?limit=10000")
        expect(response.statusCode).toBe(400);
    });


    test("'limit' works correctly", async () => {
        const response = await request(app).get("/api/movies?limit=99&from=1")
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(99);
    });

    test("paging works correctly", async () => {
        const response1 = await request(app).get("/api/movies?limit=100&from=0")
        expect(response1.statusCode).toBe(200);
        expect(response1.body.length).toBe(100);

        const response2 = await request(app).get("/api/movies?limit=100&from=99")
        expect(response2.statusCode).toBe(200);
        expect(response2.body.length).toBe(100);

        expect(response1.body[99]).toEqual(response2.body[0])
    });

    test("'from' returns no results when it is off the end of the list of movies", async () => {
        const response1 = await request(app).get("/api/movies?limit=100&from=10000000")
        expect(response1.statusCode).toBe(200);
        expect(response1.body.length).toBe(0);
    });

    test("results are sorted by title", async () => {
        const response = await request(app).get("/api/movies")

        for(let i = 1; i < response.body.length; i++) {
            expect(response.body[i].title >= response.body[i-1].title).toBeTruthy();
        }
    });
});
