module.exports = (app) => {
  const resumes = require("../controllers/resume.controller.js");
  
  var router = require("express").Router();

  //route for fetching all users 
  router.get("/users", resumes.findAllUsers);

  // Create a new Resumes
  router.post("/create", resumes.create);


  // Route to fetch resumes for a specific user
  router.get("/user_resumes", resumes.getUserResumes);
  
  // Fetch a single resume
  router.get("/:id", resumes.findOne);

  // Update a resume
  router.put("/:id", resumes.update);

  // Delete a Resume with id
  router.delete("/:id", resumes.deleteResume);



  // Retrieve all Resumes
  //router.get("/", resumes.findAll);

  // Retrieve all published Resumes 
  //router.get("/published", resumes.findAllPublished);

  // Retrieve a single Resume with id
  //router.get("/:id", resumes.findOne);

  // Update a Resume with id
  //router.put("/:id",resumes.update);



  // Create a new Resumes
  //router.delete("/", resumes.deleteAll);

  app.use("/api/resumes", router);
};
