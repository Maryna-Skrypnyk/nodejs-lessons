const express = require("express");
const router = express.Router();
const Cats = require("../../model");
const { validateCat, validateStatusCat, validateId } = require("./validation");

router.get("/", async (req, res, next) => {
  try {
    const cats = await Cats.listCats();
    res.json({ status: "success", code: 200, data: { cats } });
  } catch (error) {
    next(error);
  }
});

router.get("/:id", validateId, async (req, res, next) => {
  try {
    const cat = await Cats.getCatById(req.params.id);
    if (cat) {
      return res
        .status(200)
        .json({ status: "success", code: 200, data: { cat } });
    }
    return res
      .status(404)
      .json({ status: "error", code: 404, message: "Not found" });
  } catch (error) {
    next(error);
  }
});

router.post("/", validateCat, async (req, res, next) => {
  try {
    const cat = await Cats.addCat(req.body);
    res.status(201).json({ status: "success", code: 201, data: { cat } });
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", validateId, async (req, res, next) => {
  try {
    const cat = await Cats.removeCat(req.params.id);
    if (cat) {
      return res
        .status(200)
        .json({ status: "success", code: 200, data: { cat } });
    }
    return res
      .status(404)
      .json({ status: "error", code: 404, message: "Not found" });
  } catch (error) {
    next(error);
  }
});

router.put("/:id", validateId, validateCat, async (req, res, next) => {
  try {
    const cat = await Cats.updateCat(req.params.id, req.body);
    if (cat) {
      return res
        .status(200)
        .json({ status: "success", code: 200, data: { cat } });
    }
    return res
      .status(404)
      .json({ status: "error", code: 404, message: "Not found" });
  } catch (error) {
    next(error);
  }
});

router.patch(
  "/:id/vaccinated",
  validateId,
  validateStatusCat,
  async (req, res, next) => {
    try {
      const cat = await Cats.updateCat(req.params.id, req.body);
      if (cat) {
        return res
          .status(200)
          .json({ status: "success", code: 200, data: { cat } });
      }
      return res
        .status(404)
        .json({ status: "error", code: 404, message: "Not found" });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
