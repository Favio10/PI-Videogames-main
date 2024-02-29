const { getAllCont, createGenreContr } = require("../controllers/genresContr");

const genresHand = async (req, res) => {
  try {
    const response = await getAllCont();
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
  return;
};

const newGenresHand = async (req, res) => {
  const { genreNew } = req.body;
  try {
    const response = await createGenreContr(genreNew);
    res.status(200).json(response);
  } catch (error) {
    res.stutus(400).json({ error: error.message });
  }
};
module.exports = { genresHand, newGenresHand };
