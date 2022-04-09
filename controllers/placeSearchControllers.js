import config from "../config/config.js";
import apis from "../utils/apis.js";
import axios from "axios";

export const getPlaceSearchByQuery = async (req, res, next) => {
  try {
    const { query } = req.body;
    const placeSearch = await axios.get(
      `https://us1.locationiq.com/v1/search.php?key=${config.LOCALIQ_API_KEY}&q=${query}&format=json&countrycodes=in`
    );
    if (!placeSearch.data.length) {
      return res.status(200).json({
        status: true,
        data: placeSearch.data,
        message: "No results found",
      });
    }
    return res.status(200).json({
      status: true,
      data: placeSearch.data,
      message: "Place Searched SuccessFully!",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: false,
      data: [],
      message: "server error!",
    });
  }
};
