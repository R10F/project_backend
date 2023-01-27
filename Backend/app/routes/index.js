const sampleRoutes = require("./sample.routes");
const produkRoutes = require('./produk.routes');

module.exports = (app) => {
  app.get("/", (req, res) => {
    res.json({ message: "Welcome" });
  });
  
  app.use('/api/v1', produkRoutes);
  app.use('/api/v1/sample', sampleRoutes);
};
