import express from 'express';
import {
    createResume,
    getAllResumes,
    getResumeById,
    updateResume,
    deleteResumeById,
} from '../controllers/resume.controller.js';

export const resumeRouter = express.Router();

<<<<<<< HEAD
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
=======
// Routes
resumeRouter.post('/', createResume); // Create a new resume
resumeRouter.get('/', getAllResumes); // Get all resumes
resumeRouter.get('/:id', getResumeById); // Get a specific resume by ID
resumeRouter.put('/:id', updateResume); // Update a resume by ID
resumeRouter.delete('/:id', deleteResumeById); // Delete a resume by ID
>>>>>>> 8462108383c0038fafd714df1eb6546c69182b8a
