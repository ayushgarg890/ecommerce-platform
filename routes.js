module.exports = app => {
  app.use('/api/users', require("./modules/user/user.routes")); 
  app.use('/api/product', require("./modules/product/product.routes")); 
  app.use('/api/order', require("./modules/order/order.routes")); 
  app.use('/api/payment',require("./modules/payment/payment.route"))
};