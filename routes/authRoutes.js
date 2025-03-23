const express = require("express");
const { registerUser, loginUser } = require("../controllers/authControllers/loginController");
const {checkUser} = require("../middleware/authMiddleware");
const {getAllDetails, editAllDetails, mark_status, unmark_status} = require("../controllers/serviceProviderControllers/service_provider_Controllers")
const {uploadPost, editPost, getPost, deletePost} = require("../controllers/serviceProviderControllers/postController");

const router = express.Router();

router.get("/", (req,res)=>{
    res.send("Hello service providers");
})

router.post("/register", registerUser);
router.post("/login", loginUser);


// get all details
router.get("/details", checkUser, getAllDetails);
router.put("/edit", checkUser, editAllDetails);


//upload files
router.get("/get_post/:id", checkUser, getPost);
router.post("/upload_post", checkUser, uploadPost);
router.put("/edit_post/:id", checkUser, editPost);
router.delete("/delete_post/:id", checkUser, deletePost);

// mark status and all;
router.put("/mark_status", checkUser, mark_status);
router.put("/unmark_status", checkUser, unmark_status);


module.exports = router;