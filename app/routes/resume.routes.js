module.exports = (app) => {
  const resumes = require("../controllers/resume.controller.js");
  
  var router = require("express").Router();

  // Create a new Resumes
  router.post("/", resumes.create);

  // Retrieve all Resumes
  router.get("/", resumes.findAll);

  // Retrieve all published Resumes 
  router.get("/published", resumes.findAllPublished);

  // Retrieve a single Resume with id
  router.get("/:id", resumes.findOne);

  // Update a Resume with id
  router.put("/:id",resumes.update);

  // Delete a Resume with id
  router.delete("/:id", resumes.delete);

  // Create a new Resumes
  router.delete("/", resumes.deleteAll);

  app.use("/api/resumes", router);
};
