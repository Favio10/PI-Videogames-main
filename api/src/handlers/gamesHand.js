const {
  getAllCont,
  getDetailCont,
  getNameContr,
  postNewCont,
} = require("../controllers/gamesCont");

const getAllHand = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const response = await getAllCont(page);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
  return;
};

const getDetailHand = async (req, res) => {
  const { id } = req.params;
  const source = isNaN(id) ? "bdd" : "api";

  try {
    const response = await getDetailCont(id, source);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
  return;
};

const getNameHand = async (req, res) => {
  const { name } = req.query;
  try {
    if (name) {
      const response = await getNameContr(name);
      res.status(200).json(response);
    } else {
      const response = await getAllCont();
      res.status(200).json(response);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
  return;
};

const postNewHand = async (req, res) => {
  const { name, description, platform, image, released, rating, genres } =
    req.body;
  console.log(name, description, platform, image, released, rating, genres);
  if (
    !name ||
    !description ||
    !platform ||
    !image ||
    !released ||
    !rating ||
    !genres
  ) {
    return res
      .status(400)
      .json({ error: "Faltan campos obligatorios en la solicitud" });
  }

  try {
    const response = await postNewCont(
      name,
      description,
      platform,
      image,
      released,
      rating,
      genres
    );
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
  return;
};

module.exports = { getAllHand, getDetailHand, getNameHand, postNewHand };
