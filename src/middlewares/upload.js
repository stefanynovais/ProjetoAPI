import multer from 'multer';
// Configura o armazenamento em memória (buffer)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

export default upload;