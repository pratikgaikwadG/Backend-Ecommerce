const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

const productcontroller = require("../controllers/productController");

router.post("/addproduct", productcontroller.createproduct);
router.get("/getallproduct",  productcontroller.getallproduct);
router.get("/getproductbyid/:id", productcontroller.getproductbyid);
router.put("/updateproduct/:id", productcontroller.updateproduct);
router.delete("/deleteproduct/:id", productcontroller.deleteproduct);

module.exports = router;