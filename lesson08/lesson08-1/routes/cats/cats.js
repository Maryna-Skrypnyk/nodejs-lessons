const express = require("express");
const router = express.Router();
const {
  validateCat,
  validateStatusCat,
  validateId,
} = require("./validationCat");
const {
  getCats,
  getCat,
  saveCat,
  removeCat,
  updateCat,
  updateStatusVaccinatedCat,
} = require("../../controllers/cats");
const guard = require("../../helpers/guard");

router.get("/", guard, getCats);

router.get("/:id", guard, validateId, getCat);

router.post("/", guard, validateCat, saveCat);

router.delete("/:id", guard, validateId, removeCat);

router.put("/:id", guard, [(validateId, validateCat)], updateCat);

router.patch(
  "/:id/vaccinated",
  guard,
  [(validateId, validateStatusCat)],
  updateStatusVaccinatedCat
);

module.exports = router;
