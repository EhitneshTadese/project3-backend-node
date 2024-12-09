import { Resume } from '../models/resume.model.js';

// Create a new resume
export const createResume = async (req, res) => {
    const { gig_id, title, description } = req.body;

    try {
        const newResume = await Resume.create({
            gig_id,
            title,
            description,
        });

        res.status(201).json({
            message: 'Resume created successfully',
            resume: newResume,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating resume' });
    }
};

// Get all resumes
export const getAllResumes = async (req, res) => {
    try {
        const resumes = await Resume.findAll();
        res.status(200).json(resumes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching resumes' });
    }
};

// Get a specific resume by ID
export const getResumeById = async (req, res) => {
    const { id } = req.params;

<<<<<<< HEAD

exports.findOne = async (req, res) => {
  try {
    const resume_id = req.params.id;

    // Fetch resume data
    const resume = await Resume.findOne({
      where: { resume_id },
    });
=======
    try {
        const resume = await Resume.findByPk(id);

        if (!resume) {
            return res.status(404).json({ message: `Resume with ID ${id} not found` });
        }
>>>>>>> 8462108383c0038fafd714df1eb6546c69182b8a

        res.status(200).json(resume);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching resume' });
    }
<<<<<<< HEAD

    // Fetch related data manually using resume_id as the foreign key
    const education = await Education.findAll({ where: { resume_id } });
    const experience = await Experience.findAll({ where: { resume_id } });
    const project = await Project.findAll({ where: { resume_id } });
    const skill = await Skill.findAll({ where: { resume_id } });
    const interest = await Interest.findAll({ where: { resume_id } });
    const award = await Award.findAll({ where: { resume_id } });

    // Combine all data into a single response
    const response = {
      resume,
      education,
      experience,
      project,
      skill,
      interest,
      award,
    };

    res.status(200).send(response);
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
   const id = req.params.id; // Extract resume_id from the request params
    const { resume_name, template_type, intro_paragraph, education, experience, project, skill, interest, award } = req.body;

    // Validate request
    if (!req.body.resume_name) {
      return res.status(400).send({ message: "Resume name cannot be empty!" });
    }

    // Find the resume by id
    const resume = await Resume.findByPk(id );
    if (!resume) {
      return res.status(404).send({ message: "Resume not found" });
    }
=======
};

// Update a resume by ID
export const updateResume = async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;

    try {
        const resume = await Resume.findByPk(id);

        if (!resume) {
            return res.status(404).json({ message: `Resume with ID ${id} not found` });
        }
>>>>>>> 8462108383c0038fafd714df1eb6546c69182b8a

        const updatedResume = await resume.update({
            title: title ?? resume.title,
            description: description ?? resume.description,
        });

        res.status(200).json({
            message: 'Resume updated successfully',
            resume: updatedResume,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating resume' });
    }
};

// Delete a resume by ID
export const deleteResumeById = async (req, res) => {
    const { id } = req.params;

    try {
        const resume = await Resume.findByPk(id);

        if (!resume) {
            return res.status(404).json({ message: `Resume with ID ${id} not found` });
        }

        await resume.destroy();
        res.status(200).json({ message: 'Resume deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting resume' });
    }
<<<<<<< HEAD

    // Update or Create Skills
    if (skill) {
      const existingSkills = await Skill.findOne({ where: { resume_id: id } });
      if (existingSkills) {
        await existingSkills.update(skill);
      } else {
        await Skill.create({
          resume_id: id,
          ...skills,
        });
      }
    }

    // Update or Create Interests
    if (interest) {
      const existingInterests = await Interest.findOne({ where: { resume_id: id } });
      if (existingInterests) {
        await existingInterests.update(interest);
      } else {
        await Interest.create({
          resume_id: id,
          ...interests,
        });
      }
    }

    // Update or Create Awards
    if (award) {
      const existingAwards = await Award.findOne({ where: { resume_id: id } });
      if (existingAwards) {
        await existingAwards.update(award);
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



exports.deleteResume = async (req, res) => {
  try {
    const resume_id = req.params.id;

    // Check if the resume exists
    const resume = await Resume.findOne({ where: { resume_id } });

    if (!resume) {
      return res.status(404).send({ message: "Resume not found" });
    }

    // Delete associated data from all tables
    await Education.destroy({ where: { resume_id } });
    await Experience.destroy({ where: { resume_id } });
    await Project.destroy({ where: { resume_id } });
    await Skill.destroy({ where: { resume_id } });
    await Interest.destroy({ where: { resume_id } });
    await Award.destroy({ where: { resume_id } });

    // Finally, delete the resume itself
    await Resume.destroy({ where: { resume_id } });

    res.status(200).send({ message: "Resume and all associated data deleted successfully." });
  } catch (error) {
    console.error("Error deleting resume:", error);
    res.status(500).send({
      message: error.message || "Error deleting the resume",
    });
  }
};
=======
};
>>>>>>> 8462108383c0038fafd714df1eb6546c69182b8a
