import express from 'express';
import { addPost,updatePost } from '../controllers/post.js';
import multer from 'multer';

const router = express.Router();
import { auth,admin } from "../middleware/permission.js";

// Configurer Multer pour gérer l'upload de fichiers
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Route pour ajouter un post
router.post('/add', auth,upload.single('image'), addPost);
router.put('/:id',  auth,upload.single('image'), updatePost);

export default router;
