const router = require("express").Router();
const User = require("../models/User.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");

router.get("/profile/:id",  isAuthenticated,  async (req, res, next) => {
  const { id } = req.params;

  try {
    const userProfile = await User.findById(id)
      .populate("likedMovies")
      .populate("watchedMovies")
      .populate("likedSeries")
      .populate("watchedSeries");

    res.status(200).json(userProfile);
  } catch (error) {
    next(error);
  }
});

router.put("/profile/:id",  isAuthenticated,  async (req, res, next) => {
  const { id } = req.params;
  const { name, profilePhoto } = req.body;

  try {
    const updateProfile = await User.findByIdAndUpdate(
      id,
      {
        name,
        profilePhoto,
      },
      { new: true }
    );

    res.status(200).json(updateProfile);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
