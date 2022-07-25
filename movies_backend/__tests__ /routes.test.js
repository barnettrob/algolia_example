const request = require("supertest");
const { Router } = require("express");
const { algoliaRouter } = require("../src/api/algolia");

const app = Router();
app.use("/movies/:uuid", algoliaRouter);

describe("Get Movie Route", function () {
  test("responds to /movies/:uuid", async () => {
    const res = await request(app).get("/movies/440046930");
    expect(res.statusCode).toBe(200);
    expect(res).toEqual({
      title: "The Celebration",
      alternative_titles: [],
      year: 1998,
      image: "https://image.tmdb.org/t/p/w154/v0JbJq6H4aHiQqOjt4n4SkUk557.jpg",
      color: "#775F4E",
      score: 7.995238095238095,
      rating: 4,
      actors: [
        "Ulrich Thomsen",
        "Henning Moritzen",
        "Thomas Bo Larsen",
        "Paprika Steen",
        "Birthe Neumann",
        "Trine Dyrholm",
        "Helle Dolleris",
        "Therese Glahn",
        "Klaus Bondam",
        "Bjarne Henriksen",
        "Lars Brygmann",
        "Thomas Vinterberg",
      ],
      actor_facets: [
        "https://image.tmdb.org/t/p/w45/eq8XlXcUsZNlv2Q7tjVQLVby74r.jpg|Ulrich Thomsen",
        "https://image.tmdb.org/t/p/w45/jkmFrpd3A916sDOzaNTLickRCBJ.jpg|Henning Moritzen",
        "https://image.tmdb.org/t/p/w45/duza8j6FcbmT6J0f4mayUeTlMvS.jpg|Thomas Bo Larsen",
        "https://image.tmdb.org/t/p/w45/7iz6g2gXDCVL9LFjqmVV8KwGvNP.jpg|Paprika Steen",
        "https://image.tmdb.org/t/p/w45/gTpInxjTPnPCZr0bRyZAQqEQGJQ.jpg|Birthe Neumann",
        "https://image.tmdb.org/t/p/w45/ue2dx6F4g7uOR5nZJh8YEFlccJd.jpg|Trine Dyrholm",
        "https://image.tmdb.org/t/p/w45/wpXSO5Umc8bjHnGbDxLv8Jwzz2H.jpg|Helle Dolleris",
        "https://image.tmdb.org/t/p/w45/fg5FuEcE7whN8NcGr10htQiyam.jpg|Therese Glahn",
        "https://image.tmdb.org/t/p/w45/dzfTeZj1Axd42iEdaaz1dHHROlj.jpg|Klaus Bondam",
        "https://image.tmdb.org/t/p/w45/kG3ZlQlMDbl61gJmtpgu2P7LHfl.jpg|Bjarne Henriksen",
        "https://image.tmdb.org/t/p/w45/6M8ZHAmLSkUCgkW3j5Dtr6IjfzJ.jpg|Lars Brygmann",
        "https://image.tmdb.org/t/p/w45/dFev1iqFyoSigPRyCQ7r9NwZXiv.jpg|Thomas Vinterberg",
      ],
      genre: ["Drama"],
      objectID: "440046930",
    });
  });
});
