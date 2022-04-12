const City = require("../models/City");

const postCity = (req, res) => {
  const city = new City(req.body);
  city
    .save()
    .then((result) => res.status(201).json(result))
    .catch((error) => res.status(500).json(error));
};

const getCities = (req, res) => {
  City.find()
    .exec()
    .then((result) => {
      res.json(result);
    })
    .catch((error) => res.status(500).json(error));
};

const getCity = (req, res) => {
  City.findOne({ _id: req.params.id })
    .exec()
    .then((result) => {
      res.json(result);
    })
    .catch((error) => res.status(500).json(error));
};

module.exports = { postCity, getCities, getCity };
