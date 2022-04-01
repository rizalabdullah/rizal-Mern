const router = require(`express`).Router();
const multer = require(`multer`);
const upload = multer({ dest: `uploads`});
const product_v2_controller = require(`./controller`)

router.get(`/product`, product_v2_controller.index);

router.get(`/product/:id`,  product_v2_controller.viewById);

router.post(`/product`, upload.single(`image`), product_v2_controller.create);

router.put(`/product/:id`,  upload.single(`image`), product_v2_controller.update);  

router.delete(`/product/:id`, product_v2_controller.destroy);  

module.exports = router;