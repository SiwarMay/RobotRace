
import express from 'express';
import { updateProfilePic,editProfile, userLogin, userRegister, verifyEmail,changePassword } from '../controllers/auth.js';
import { forgetPassword, resetPassword } from '../controllers/mail.js';
import { auth,admin } from "../middleware/permission.js";
import multer from "multer";
import bcrypt from 'bcrypt';

const upload = multer({
  storage: multer.diskStorage({
    destination: "./uploads",
    filename: (req, file, cb) => {
      let date = Date.now();
      let fl = date + "." + file.mimetype.split("/")[1];
      cb(null, fl);
    },
  }),
});

const router = express.Router();

router.route("/imageprofile").put(auth, upload.single("image"), updateProfilePic);
router.route('/').post(userRegister);
router.route('/login').post(userLogin);
router.route('/forget-password').post(forgetPassword);
router.route('/reset-password').post(resetPassword);
router.route('/verify-email/:id').get(verifyEmail);
router.route("/editprofil").put(auth, editProfile);
router.route("/changepassword").put(auth, changePassword);

export default router;
