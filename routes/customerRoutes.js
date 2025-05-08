const express = require("express");
const { customerLogin, customerSignup, hireServiceProvider, getAllDetails } = require("../controllers/serviceProviderControllers/CustomerController");
const { checkCustomer } = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/", (req,res)=>{
    res.send("Welcome to customer routes")
})

router.post("/customer-login", customerLogin);
router.post("/customer-signup", customerSignup);
router.get("/customer-details", checkCustomer, getAllDetails);
router.post("/hire-service", checkCustomer, hireServiceProvider);

module.exports = router;