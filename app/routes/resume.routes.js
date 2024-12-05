import express from 'express';
import {
    createResume,
    getAllResumes,
    getResumeById,
    updateResume,
    deleteResumeById,
} from '../controllers/resume.controller.js';

export const resumeRouter = express.Router();

// Routes
resumeRouter.post('/', createResume); // Create a new resume
resumeRouter.get('/', getAllResumes); // Get all resumes
resumeRouter.get('/:id', getResumeById); // Get a specific resume by ID
resumeRouter.put('/:id', updateResume); // Update a resume by ID
resumeRouter.delete('/:id', deleteResumeById); // Delete a resume by ID
