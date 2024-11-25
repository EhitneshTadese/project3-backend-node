// controllers/resume.controller.js

const db = require("../models");
const Resume = db.resume;
const Education = db.education;
const Experience = db.experience;
const Project = db.project;
const Skill = db.skill;
const Award = db.award;
const User = db.user;

// Retrieve all Users from the database
exports.findAllUsers = (req, res) => {
  User.findAll() // Fetch all records from the User table
    .then((data) => {
      res.send(data); // Send the retrieved data as the response
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users.",
      });
    });
};


// Create and Save a new Resume with associated data
exports.create = async (req, res) => {
    try {
const { resume_name, template_type, intro_paragraph, education, experience, project, skills, awards } = req.body;

  // Validate request
  if (!req.body.resume_name) {
    res.status(400).send({
      message: "Content cannot be empty!",
    });
    return;
  }


  // Create Resume associated with the User
    const resume = await Resume.create({
      user_id: 1, // 
      resume_name,
      template_type,
      intro_paragraph,
    });

 // Create Education records
    if (education) {
      await Education.create({
        resume_id: resume.resume_id, // Assuming foreign key
        ...education,
      });
    }

    // Create Experience records
    if (experience) {
      await Experience.create({
        resume_id: resume.resume_id, // Assuming foreign key
        ...experience,
      });
      }
      
      // Create project records
    if (project) {
      await Project.create({
        resume_id: resume.resume_id, // Assuming foreign key
        ...project,
      });
      }
      

    // Create award records
    if (awards) {
      await Award.create({
        resume_id: resume.resume_id, // Assuming foreign key
        ...awards,
      });
    }

    res.status(201).send({ message: "User, Resume, and related data created successfully!" });

   
   
  } catch (err) {
    console.error("Error creating resume:", err);
    res.status(500).send({
      message: err.message || "Some error occurred while creating the Resume.",
    });
  }
};



// Get resumes for a specific user (hardcoded for testing)
exports.getUserResumes = async (req, res) => {
  try {
    const userId = 1; // Hardcoded user ID for testing purposes

    const resumes = await Resume.findAll({
      where: { user_id: userId },
      attributes: ["user_id", "resume_id", "resume_name", "template_type"], // Specify the fields you want to return
    });

    res.status(200).send(resumes);
  } catch (err) {
    console.error("Error retrieving user resumes:", err); // Log error for debugging
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving user resumes.",
    });
  }
};




// Fetch a single resume by ID
exports.findOne = async (req, res) => {
  const id = req.params.id;
  try {
    const resume = await Resume.findByPk(id);
    if (resume) {
      res.send(resume);
    } else {
      res.status(404).send({ message: "Resume with id=${id}  not found. "});
    }
  } catch (error) {
    res.status(500).send({ message: "Error retrieving resume with id=" + id });
  }
};

// Update a resume by ID
exports.update = async (req, res) => {
  const id = req.params.id;
  try {
    const updated = await Resume.update(req.body, { where: { id } });
    if (updated == 1) {
      res.send({ message: "Resume updated successfully." });
    } else {
      res.send({ message: `Cannot update resume with id=${id}. Maybe it was not found. `});
    }
  } catch (error) {
    res.status(500).send({ message: "Error updating resume with id=" + id });
  }
};