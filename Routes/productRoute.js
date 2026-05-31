const express = require("express");
const router = express.Router();

const authMiddleware =
require("../Middleware/authMiddleware");

const {

addProduct,
getProducts,
getSingleProduct,
updateProduct,
deleteProduct

} = require("../Controllers/productController");

router.post(
"/products",
authMiddleware,
addProduct
);

router.get(
"/products",
authMiddleware,
getProducts
);

router.get(
"/products/:id",
authMiddleware,
getSingleProduct
);

router.put(
"/products/:id",
authMiddleware,
updateProduct
);

router.delete(
"/products/:id",
authMiddleware,
deleteProduct
);

module.exports = router;