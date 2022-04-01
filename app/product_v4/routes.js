const router = require(`express`).Router();
const multer = require(`multer`);
const upload = multer({dest: `uploads`});
const product_v4_Controller = require(`./controller`);


router.get(`/product`, product_v4_Controller.index);

router.get(`/product/:id`, product_v4_Controller.view);

router.post(`/product`, upload.single('image'), product_v4_Controller.store);

router.put(`/product/:id`, upload.single('image'), product_v4_Controller.update);

router.delete(`/product/:id`, product_v4_Controller.destroy);

module.exports= router;