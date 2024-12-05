import express from 'express';
import {
    createExperience,
    getAllExperiences,
    getExperienceById,
    updateExperience,
    deleteExperienceById,
} from '../controllers/experience.controller.js';

export const experienceRouter = express.Router();

// Routes
experienceRouter.post('/', createExperience); // Create a new experience
experienceRouter.get('/', getAllExperiences); // Get all experiences
experienceRouter.get('/:id', getExperienceById); // Get a specific experience by ID
experienceRouter.put('/:id', updateExperience); // Update an experience by ID
experienceRouter.delete('/:id', deleteExperienceById); // Delete an experience by ID


