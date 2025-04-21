import express from "express";
import cloudinary from "../lib/cloudinary.js";
import Game from "../models/Game.js";
import protectRoute from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", protectRoute, async (req, res) => {
  try {
    const { title, caption, rating, image } = req.body;

    if (!image || !title || !caption || !rating) {
      return res.status(400).json({ message: "Please provide all fields" });
    }

    // upload the image to cloudinary
    const uploadResponse = await cloudinary.uploader.upload(image);
    const imageUrl = uploadResponse.secure_url;

    // save to the database
    const newGame = new Game({
      title,
      caption,
      rating,
      image: imageUrl,
      user: req.user._id,
    });

    await newGame.save();

    res.status(201).json(newGame);
  } catch (error) {
    console.log("Error creating game", error);
    res.status(500).json({ message: error.message });
  }
});

// pagination => infinite loading
router.get("/", protectRoute, async (req, res) => {
  // example call from react native - frontend
  // const response = await fetch("http://localhost:3000/api/games?page=1&limit=5");
  try {
    const page = req.query.page || 1;
    const limit = req.query.limit || 2;
    const skip = (page - 1) * limit;

    const games = await Game.find()
      .sort({ createdAt: -1 }) // desc
      .skip(skip)
      .limit(limit)
      .populate("user", "username profileImage");

    const totalGames = await Game.countDocuments();

    res.send({
      games,
      currentPage: page,
      totalGames,
      totalPages: Math.ceil(totalGames / limit),
    });
  } catch (error) {
    console.log("Error in get all games route", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// get recommended games by the logged in user
router.get("/user", protectRoute, async (req, res) => {
  try {
    const games = await Game.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(games);
  } catch (error) {
    console.error("Get user games error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/:id", protectRoute, async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);
    if (!game) return res.status(404).json({ message: "Game not found" });

    // check if user is the creator of the game
    if (game.user.toString() !== req.user._id.toString())
      return res.status(401).json({ message: "Unauthorized" });

    // https://res.cloudinary.com/de1rm4uto/image/upload/v1741568358/qyup61vejflxxw8igvi0.png
    // delete image from cloduinary as well
    if (game.image && game.image.includes("cloudinary")) {
      try {
        const publicId = game.image.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(publicId);
      } catch (deleteError) {
        console.log("Error deleting image from cloudinary", deleteError);
      }
    }

    await game.deleteOne();

    res.json({ message: "Game deleted successfully" });
  } catch (error) {
    console.log("Error deleting game", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
