import Post from '../models/post.js';

const addPost = async (req, res) => {
  try {
    const { description, date } = req.body;
    const userId = req.user.id; // L'ID de l'utilisateur associé au post

    // Vérifier si un fichier a été uploadé
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    // Récupérer les données du fichier uploadé
    const fileData = {
      data: req.file.buffer, // Données binaires du fichier
      contentType: req.file.mimetype, // Type de contenu du fichier
    };

    // Créer une nouvelle instance du modèle Post avec les données fournies
    const newPost = new Post({
      description,
      image: fileData,
      date,
      user: userId,
    });

    // Enregistrer le nouveau post dans la base de données
    await newPost.save();

    res.status(201).json({ success: true, message: 'Post created successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
const updatePost = async (req, res) => {
    try {
      const postId = req.params.id; // L'ID du post à mettre à jour
      const userId = req.user.id; // L'ID de l'utilisateur associé au post
  
      // Vérifier si le post existe
      const existingPost = await Post.findById(postId);
      if (!existingPost) {
        return res.status(404).json({ success: false, message: 'Post not found' });
      }
  
      // Vérifier si l'utilisateur est autorisé à modifier le post
      if (existingPost.user.toString() !== userId) {
        return res.status(403).json({ success: false, message: 'Unauthorized' });
      }
  
      // Mettre à jour les champs du post
      existingPost.description = req.body.description || existingPost.description;
      existingPost.image = req.body.image || existingPost.image;
      existingPost.date = req.body.date || existingPost.date;
  
      // Enregistrer les modifications dans la base de données
      const updatedPost = await existingPost.save();
  
      res.status(200).json({ success: true, message: 'Post updated successfully', post: updatedPost });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  };
export { addPost,updatePost };
