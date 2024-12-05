import express from 'express';
import {
    createEducation,
    getAllEducation,
    getEducationById,
    updateEducation,
    deleteEducationById,
} from '../controllers/education.controller.js';

export const educationRouter = express.Router();

// Routes
educationRouter.post('/', createEducation); // Create a new education
educationRouter.get('/', getAllEducation); // Get all education records
educationRouter.get('/:id', getEducationById); // Get a specific education record by ID
educationRouter.put('/:id', updateEducation); // Update an education record by ID
educationRouter.delete('/:id', deleteEducationById); // Delete an education record by ID


