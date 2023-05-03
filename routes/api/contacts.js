const express = require("express");
const router = express.Router();
const ctrlContact = require("../../controller");
const passport = require("passport");

const auth = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (!user || err) {
      return res.status(401).json({
        status: "error",
        code: 401,
        message: "Not authorized",
        data: "Unauthorized",
      });
    }
    req.user = user;
    next();
  })(req, res, next);
};

router.get("/", auth, ctrlContact.get);

router.get("/:contactId", auth, ctrlContact.getById);

router.post("/", auth, ctrlContact.create);

router.put("/:contactId", auth, ctrlContact.update);

router.patch("/:contactId/favorite", auth, ctrlContact.updateStatusContact);

router.delete("/:contactId", auth, ctrlContact.remove);

router.post("/users/signup", ctrlContact.createUser);

router.post("/users/login", ctrlContact.login);

router.get("/users/logout", auth, ctrlContact.logout);

router.get("/users/current", auth, ctrlContact.getUser);

module.exports = router;
