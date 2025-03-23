const express = require("express");
const { adminRegistration, adminLogin } = require("./adminLogin");
const { getPendingServiceProviders, verifyServiceProviders, getAllAccounts, getAllDetailsOfAccount, getAllReportedAccounts, blockReportedAccount, blockAnyAccount, deleteServiceProvider, getBlockedAccounts, unblockAnyAccount } = require("./adminControllers");
const { adminProtect, adminCheck } = require("./adminAuth");
const router = express.Router();

router.get("/", (req,res)=>{
    res.send("Welcome captain")
})
router.post("/register", adminRegistration);
router.post("/login", adminLogin);

router.get("/get_pending_accounts", adminProtect, adminCheck, getPendingServiceProviders);
router.put('/verify_account/:id', adminProtect, adminCheck, verifyServiceProviders);

router.get("/get_all_accounts", getAllAccounts);
router.get("/get_details/:id", getAllDetailsOfAccount);

router.get("/reported_accounts", getAllReportedAccounts);
router.get("/get_blocked_accounts", getBlockedAccounts);
router.put("/block_reported_account/:id", blockReportedAccount);

router.put("/block_account/:id", adminProtect, adminCheck, blockAnyAccount);
router.put("/unblock_account/:id", adminProtect, adminCheck, unblockAnyAccount);
router.delete("/delete_account/:id", adminProtect, adminCheck, deleteServiceProvider);

module.exports = router;