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

    try {
        const resume = await Resume.findByPk(id);

        if (!resume) {
            return res.status(404).json({ message: `Resume with ID ${id} not found` });
        }

        res.status(200).json(resume);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching resume' });
    }
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
};
