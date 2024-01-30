const { getAllCont } = require("../controllers/genresContr");

const genresHand = async (req, res) => {
  const response = await getAllCont();
  try {
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
  return;
};
module.exports = { genresHand };
