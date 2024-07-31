const express = require("express");
const userController = require("../controller/userController");
const router = express.Router();




  router.route("/singup").post(userController.singup);
router.route("/login").post(userController.login);
router.route("/googleuser").post(userController.googleLogin);

router.route("/logout").post(userController.logout);
router.route("/forgetpassword").post(userController.forGetPassword);
router.route("/resetpassword/:token").patch(userController.reSetPassword);
router.route("/updatingpassword").patch(userController.protect, userController.updatingPassword);

// ROUTER USERS
router.post('/uploadimage', userController.uploadImage);
router.route("/deleteme").delete(userController.protect  , userController.deleteMe);

router.route("/contactmail").post(userController.protect  , userController.createContactMail);
router.route("/usermail").post(userController.createUserMail);

router.route("/singal/:id").get(userController.protect , userController.getSingalUser).patch(userController.protect , userController.updateMe).delete(userController.deleteUsers);
router.route("/").get(userController.getAllUsers).post(userController.createUsers);


module.exports = router;