const express = require('express');
const { requireSignin, adminMiddleware } = require('../../common-middleware');
const { updateOrder, getCustomersOrders } = require('../../controller/admin/order.admin');
const router = express.Router();


router.post(`/order/update`, requireSignin, adminMiddleware, updateOrder);
router.post('/order/getCustomerorders', requireSignin, adminMiddleware, getCustomersOrders);


module.exports = router;