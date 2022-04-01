const router = require("express").Router();
const multer  = require('multer');
const upload = multer({ dest: 'uploads' });
const productController = require("./controller")

router.get("/product", productController.index);
router.get("/product/:id", productController.view);
router.post("/product/", upload.single('image'), productController.store);
router.put("/product/:id", upload.single(`image`), productController.update);
router.delete("/product/:id", upload.single(`image`), productController.destroy);

//router.get("/product", (req, res) => {
//    res.send({
//       status: "successfully",
//       message: "welcome to Express JS tutorial",
//        product: "makanan"
//    });

//});

//router.get("/product/:id", (req, res) => {
//        res.send({
//        id: req.params.id
//    });
//});

//router.get("/:category/", (req, res) => {
    //const {category} = req.params;
//    res.send({
//       category
//    })
//});




module.exports = router;