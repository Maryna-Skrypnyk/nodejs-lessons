const Cats = require("../repository");

const getCats = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const data = await Cats.listCats(userId, req.query);
    res.json({ status: "success", code: 200, data: { ...data } });
  } catch (error) {
    next(error);
  }
};

const getCat = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const cat = await Cats.getCatById(req.params.id, userId);
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
};

const saveCat = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const cat = await Cats.addCat({ ...req.body, owner: userId });
    res.status(201).json({ status: "success", code: 201, data: { cat } });
  } catch (error) {
    next(error);
  }
};

const removeCat = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const cat = await Cats.removeCat(req.params.id, userId);
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
};

const updateCat = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const cat = await Cats.updateCat(req.params.id, req.body, userId);
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
};

const updateStatusVaccinatedCat = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const cat = await Cats.updateCat(req.params.id, req.body, userId);
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
};

module.exports = {
  getCats,
  getCat,
  saveCat,
  removeCat,
  updateCat,
  updateStatusVaccinatedCat,
};
