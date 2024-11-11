// controllers/resume.controller.js

const db = require("../models");
const Resume = db.Resume;
const Education = db.Education;
const Experience = db.Experience;
const Project = db.Projects;
const Skill = db.Skill;
const Award = db.Awards;

// Create and Save a new Resume with associated data
exports.create = async (req, res) => {
  // Validate request
  if (!req.body.resume_name) {
    res.status(400).send({
      message: "Content cannot be empty!",
    });
    return;
  }

  // Resume data structure
  const resume = {
    user_id: 1,
    resume_name: req.body.resume_name,
    template_type: req.body.template_type,
    intro_paragraph: req.body.intro_paragraph
   
    
  };

  try {
    // Save Resume
    const newResume = await Resume.create(resume);

    // Bulk insert associated Education records if provided
    if (req.body.education && req.body.education.length > 0) {
      const educationData = req.body.education.map((edu) => ({
        ...edu,
        resumeId: newResume.id,
      }));
      await Education.bulkCreate(educationData);
    }

    // Bulk insert associated Experience records if provided
    if (req.body.experience && req.body.experience.length > 0) {
      const experienceData = req.body.experience.map((exp) => ({
        ...exp,
        resumeId: newResume.id,
      }));
      await Experience.bulkCreate(experienceData);
    }

    // Bulk insert associated Project records if provided
    if (req.body.projects && req.body.projects.length > 0) {
      const projectData = req.body.projects.map((proj) => ({
        ...proj,
        resumeId: newResume.id,
      }));
      await Project.bulkCreate(projectData);
    }

    // Bulk insert associated Skill records if provided
    if (req.body.skills && req.body.skills.length > 0) {
      const skillData = req.body.skills.map((skill) => ({
        name: skill.name,
        resumeId: newResume.id,
      }));
      await Skill.bulkCreate(skillData);
    }

    // Bulk insert associated Award records if provided
    if (req.body.awards && req.body.awards.length > 0) {
      const awardData = req.body.awards.map((award) => ({
        ...award,
        resumeId: newResume.id,
      }));
      await Award.bulkCreate(awardData);
    }

    res.send({ message: "Resume created successfully!", data: newResume });
  } catch (err) {
    console.error("Error creating resume:", err);
    res.status(500).send({
      message: err.message || "Some error occurred while creating the Resume.",
    });
  }
};