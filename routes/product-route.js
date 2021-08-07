const express = require('express');
const router = express.Router();
//const multer = require('multer');
//const login = require('../middleware/login');

const ProductsController = require('../controllers/product-controller');

/* const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});
 */
router.get('/', ProductsController.getProducts);

/* router.post(
    '/',
    login.required,
    upload.single('image'),
    ProductsController.postProduct
); */
router.get('/:id', ProductsController.getProductDetail);
router.post('/', ProductsController.postProduct);
router.patch('/:id', ProductsController.updateProduct);
router.delete('/:id',ProductsController.deleteProduct);

/* // imagens
router.post(
    '/:id/image',
    login.required,
    upload.single('image'),
    ProductsController.postImage
)
router.get(
    '/:id/images',
    ProductsController.getImages
) */

module.exports = router;