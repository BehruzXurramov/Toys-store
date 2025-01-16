const router = require("express").Router();

const adminRoute = require("./admin.routes");
const blockListRoute = require("./block_list.routes");
const cartItemRoute = require("./cart_item.routes");
const cartRoute = require("./cart.routes");
const categoryRoute = require("./category.routes");
const contractRoute = require("./contract.routes");
const customerRoute = require("./customer.routes");
const imagesRoute = require("./images.routes");
const paymentPlanRoute = require("./payment_plan.routes");
const paymentRoute = require("./payment.routes");
const productRoute = require("./product.routes");
const reviewRoute = require("./review.routes");

router.use("/admin", adminRoute);
router.use("/block_list", blockListRoute);
router.use("/cart_item", cartItemRoute);
router.use("/cart", cartRoute);
router.use("/category", categoryRoute);
router.use("/contract", contractRoute);
router.use("/customer", customerRoute);
router.use("/images", imagesRoute);
router.use("/payment_plan", paymentPlanRoute);
router.use("/payment", paymentRoute);
router.use("/product", productRoute);
router.use("/review", reviewRoute);

module.exports = router;
