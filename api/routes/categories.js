const router = require("express").Router();
const Category = require("../models/Category");

//create
router.post("/", async (req, res) => {
  const result = await Category.find({ name: req.body.name });
  if (result.length == 0) {
    const newCategory = new Category(req.body);
    try {
      const savedCategory = await newCategory.save(newCategory);
      res.status(200).json(savedCategory);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(200).json(result);
  }
});

//find all
router.get("/", async (req, res) => {
  try {
    const category = await Category.find();
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
