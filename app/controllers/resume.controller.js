// controllers/resume.controller.js

const db = require("../models");
const Resume = db.resume;
const Education = db.education;
const Experience = db.experience;
const Project = db.project;
const Skill = db.skill;
const Award = db.award;
const Interest = db.interest;
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
const { resume_name, template_type, intro_paragraph, education, experience, project, skills, interests, awards } = req.body;

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
      
       // Create skill records
    if (skills) {
      await Skill.create({
        resume_id: resume.resume_id, // Assuming foreign key
        ...skills,
      });
      }

       // Create interest records
    if (interests) {
      await Interest.create({
        resume_id: resume.resume_id, // Assuming foreign key
        ...interests,
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

//fetch a resume with associiated table

exports.findOne = async (req, res) => {
  try {
    const resume_id = req.params.id;

    const resume = await Resume.findByPk(resume_id, {
      include: [
        { model: Education },
        { model: Experience },
        { model: Project },
        { model: Skill },
        { model: Interest },
        { model: Award },
      ],
    });

    if (!resume) {
      return res.status(404).send({ message: "Resume not found" });
    }

    res.status(200).send(resume);
  } catch (error) {
    console.error("Error fetching resume:", error);
    res.status(500).send({
      message: error.message || "Error retrieving the resume",
    });
  }
};

// Update an existing Resume and its associated data
exports.update = async (req, res) => {
  try {
    const { id } = req.params; // Extract resume_id from the request params
    const { resume_name, template_type, intro_paragraph, education, experience, project, skills, interests, awards } = req.body;

    // Validate request
    if (!resume_name) {
      return res.status(400).send({ message: "Resume name cannot be empty!" });
    }

    // Find the resume by id
    const resume = await Resume.findByPk(id);
    if (!resume) {
      return res.status(404).send({ message: "Resume not found" });
    }

    // Update the Resume
    await resume.update({
      resume_name,
      template_type,
      intro_paragraph,
    });

    // Update or Create Education
    if (education) {
      const existingEducation = await Education.findOne({ where: { resume_id: id } });
      if (existingEducation) {
        await existingEducation.update(education);
      } else {
        await Education.create({
          resume_id: id,
          ...education,
        });
      }
    }

    // Update or Create Experience
    if (experience) {
      const existingExperience = await Experience.findOne({ where: { resume_id: id } });
      if (existingExperience) {
        await existingExperience.update(experience);
      } else {
        await Experience.create({
          resume_id: id,
          ...experience,
        });
      }
    }

    // Update or Create Project
    if (project) {
      const existingProject = await Project.findOne({ where: { resume_id: id } });
      if (existingProject) {
        await existingProject.update(project);
      } else {
        await Project.create({
          resume_id: id,
          ...project,
        });
      }
    }

    // Update or Create Skills
    if (skills) {
      const existingSkills = await Skill.findOne({ where: { resume_id: id } });
      if (existingSkills) {
        await existingSkills.update(skills);
      } else {
        await Skill.create({
          resume_id: id,
          ...skills,
        });
      }
    }

    // Update or Create Interests
    if (interests) {
      const existingInterests = await Interest.findOne({ where: { resume_id: id } });
      if (existingInterests) {
        await existingInterests.update(interests);
      } else {
        await Interest.create({
          resume_id: id,
          ...interests,
        });
      }
    }

    // Update or Create Awards
    if (awards) {
      const existingAwards = await Award.findOne({ where: { resume_id: id } });
      if (existingAwards) {
        await existingAwards.update(awards);
      } else {
        await Award.create({
          resume_id: id,
          ...awards,
        });
      }
    }

    res.status(200).send({ message: "Resume and associated data updated successfully!" });
  } catch (err) {
    console.error("Error updating resume:", err);
    res.status(500).send({
      message: err.message || "Some error occurred while updating the Resume.",
    });
  }
};