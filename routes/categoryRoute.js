const express = require("express");
const router = express.Router();
const authorize = require("../middlewares/auth")


const categorycontroller = require("../controllers/categoryController");

router.post("/addcategory",authorize.auth,authorize.admin,categorycontroller.addcategory)
router.get("/getcategorybyid/:id", categorycontroller.getcategorybyid);
router.get("/getcategory", categorycontroller.getcategory);
router.put(
  "/updatecategory/:id",
  
  categorycontroller.updatecategory
);
router.delete(
  "/deletecategory/:id",
  
  categorycontroller.deletecategory
);

module.exports = router;