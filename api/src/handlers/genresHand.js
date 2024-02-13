const { getAllCont } = require("../controllers/genresContr");

const genresHand = async (req, res) => {
  try {
    const response = await getAllCont();
    res.status(200).json(response);
    console.log(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
  return;
};
module.exports = { genresHand };
