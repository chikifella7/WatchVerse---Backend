const router = require("express").Router();
const User = require("../models/User.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");

router.get("/profile/:id", isAuthenticated, async (req, res, next) => {
  const { id } = req.params;

  try {
    const userProfile = await User.findById(id)
      .populate("givenBaskets")
      .populate("givenUnits")
      .populate("receivedUnits")
      .populate({
        path: "receivedUnits",
        populate: { path: "market", model: 'Market'},
      })
      .populate("receivedBaskets")
      .populate({
        path: "receivedBaskets",
        populate: { path: "market", model: "Market" },
      });

    res.status(200).json(userProfile);
  } catch (error) {
    next(error);
  }
});

router.put("/profile/:id", isAuthenticated, async (req, res, next) => {
  const { id } = req.params;
  const { firstName, lastName, phoneNumber } = req.body;

  try {
    const updateProfile = await User.findByIdAndUpdate(
      id,
      {
        firstName,
        lastName,
        phoneNumber,
      },
      { new: true }
    );

    res.status(200).json(updateProfile);
  } catch (error) {
    next(error);
  }
});

router.delete("/profile/:id", isAuthenticated, async (req, res, next) => {
  const { id } = req.params;

  try {
    await User.findByIdAndRemove(id);

    res
      .status(200)
      .json({ message: `The user with the id ${id} was deleted successfully` });
  } catch (error) {
    next(error);
  }
});

module.exports = router;