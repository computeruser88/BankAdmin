var db = require("../models");

module.exports = function(app) {

  app.get("/api/accounts", function(req, res) {
    var query = {};
    if (req.query.account_id) {
      query.accountId = req.query.account_id;
    }

    db.Account.findAll({
      where: query,
      include: [db.User]
    }).then(function(dbAccount) {
      res.json(dbAccount);
    });
  });

  app.get("/api/accounts/:id", function(req, res) {
    db.Account.findOne({
      where: {
        id: req.params.id
      },
      include: [db.User]
    }).then(function(dbAccount) {
      res.json(dbAccount);
    });
  });

  app.post("/api/accounts", function(req, res) {
    db.Account.create(req.body).then(function(dbAccount) {
      res.json(dbAccount);
    });
  });

  app.delete("/api/accounts/:id", function(req, res) {
    db.Account.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbAccount) {
      res.json(dbAccount);
    });
  });

  app.put("/api/accounts", function(req, res) {
    db.Account.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      }).then(function(dbPost) {
      res.json(dbPost);
    });
  });
};
