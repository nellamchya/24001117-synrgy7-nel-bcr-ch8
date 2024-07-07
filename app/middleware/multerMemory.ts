import multer from 'multer';

const storage = multer.memoryStorage()

const multerInstance = multer({ storage });
export {
    multerInstance as multerMemory,
}