const router = require("express").Router({ mergeParams: true });

const propertyRouter = require("./properties");
const cityRouter = require("./cities");

router.use("/properties", propertyRouter);
router.use("/cities", cityRouter);

module.exports = router;
