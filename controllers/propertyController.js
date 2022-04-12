const Property = require("../models/Property");
const City = require("../models/City");

const postProperty = (req, res) => {
  City.findOne({ name: req.body.city })
    .then((city) => {
      if (!city) res.status(500).send("No city with that name found");
      else {
        const property = new Property(req.body);
        property.save().then((result) => {
          city.properties.push(property._id);
          city.save().then((c) => res.status(201).json(c));
        });
      }
    })
    .catch((error) => res.status(500).json(error));
};

const getProperties = (req, res) => {
  const filters = {};
  if (req.query.city) filters.city = req.query.city;
  if (req.query.buildingType) filters["building-type"] = req.query.buildingType;
  if (req.query.minPrice) {
    filters.price = {};
    filters.price.$gte = req.query.minPrice;
  }
  if (req.query.maxPrice) filters.price.$lte = req.query.maxPrice;
  // console.log(req.query);

  Property.find(filters)
    .exec()
    .then((result) => {
      res.json(result);
      // console.log(filters);
    })
    .catch((error) => res.status(500).json(error));
};

const getProperty = (req, res) => {
  Property.findOne({ _id: req.params.id })
    .exec()
    .then((result) => {
      res.json(result);
    })
    .catch((error) => res.status(500).json(error));
};

module.exports = { postProperty, getProperties, getProperty };
