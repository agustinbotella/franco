import { Router } from "express";
import { prisma } from "../db-connect.js"

const router = Router();

router.post("/rating", async (req, res) => {
  try {
    const { rating } = req.body;

    if (rating < 0 || rating > 5) {
      return res.status(400).send({ error: "Rating must be between 0 and 5" });
    }

    const newRating = await prisma.rating.create({ data: req.body });
    res.status(201).send(newRating);
  } catch (err) {
    console.log(err)
    res.status(500).send(err);
  }
});

router.post("/reset", async (req, res) => {
  try {
    await Rating.deleteMany({});
    res.status(200).send("All ratings reset");
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get("/comments", async (req, res) => {
  try {

    // from prisma get comments, employee name and 
    const comments = await prisma.rating.findMany(
      {
        include: {
          employee: true,
        },
      }
    )
    res.status(200).send(comments);
  } catch (error) {
    console.log(error)
    res.status(500).send(error);
  }
});

export default router;
