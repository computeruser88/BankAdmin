var db = require("../models");

module.exports = function(app) {

  app.get("/api/transactions", function(req, res) {
    var query = {};
    if (req.query.transaction_id) {
      query.UserId = req.query.transaction_id;
    }

    db.Transaction.findAll({
      where: query,
      include: [db.Account]
    }).then(function(dbTransaction) {
      res.json(dbTransaction);
    });
  });

  app.get("/api/transactions/:id", function(req, res) {
    db.Transaction.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Account]
    }).then(function(dbTransaction) {
      res.json(dbTransaction);
    });
  });

  app.post("/api/transactions", function(req, res) {
    db.Transaction.create(req.body).then(function(dbTransaction) {
      res.json(dbTransaction);
    });
  });

};
