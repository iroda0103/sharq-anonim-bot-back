const express = require("express");
const Jwt = require("../Jwt");
const { mapErrorToStatus } = require("../../shared/errors/handle");

module.exports = function makeExpressCallback(
  controllers,
  { checkLogin = false, checkRoles } = {}
) {
  if (checkRoles) {
    checkLogin = true;
  }

  /**
   * @param {express.Request} req
   * @param {express.Response} res
   */
  return (req, res) => {
    let additional = {};

    if (checkLogin) {
      const { authorization } = req.headers;
      const token = (authorization || "").split(" ")[1];
      const result = Jwt.verifyToken(token);

      if (!result) {
        return res.status(401).json({ error: "Login qilmagansiz" });
      }

      if (result) {
        additional.user = result.user;
      }
    }
    if (checkRoles) {
      if (!checkRoles.some((role) => role == additional.user.role)) {
        return res.status(403).json({ error: "Siz ruxsatga ega emassiz" });
      }
    }
    
    const httpRequest = {
      body: req.body,
      params: req.params,
      query: req.query,
      path: req.path,
      headers: {
        "Content-Type": req.get("Content-Type")
      },
      ...additional
    };

console.log('REQ',req.body,req.file,req.files)
    if (req.file) {
      console.log('EXPRESS CALBAKK');

      httpRequest.file = { [req.file.fieldname]: req.file.filename }
    }

    if (req.files) {
      httpRequest.files = {}
      for (const label in req.files) {
        const filenames = req.files[label].map((f) => f.filename)
        if (filenames.length === 1) {
          httpRequest.files[label] = filenames[0]
        } else {
          httpRequest.files[label] = filenames
        }
      }
    }

    controllers(httpRequest)
      .then((httpResponse) => {
        if (httpResponse.headers) {
          res.set(httpResponse.headers);
        }

        res.status(httpResponse.statusCode).send(httpResponse.body);
      })
      .catch((e) => {
        console.log(e);

        res
          .status(mapErrorToStatus)
          .send({ error: "An unknown error occured." });
      });
  };
};
