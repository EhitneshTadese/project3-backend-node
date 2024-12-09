import express from 'express';
import {
    createAward,
    findAllAwards,
    findAwardById,
    updateAward,
    deleteAward,
} from '../controllers/awards.controller.js';

export const awardsRouter = express.Router();

// Routes for awards
awardsRouter.post('/', createAward); // Create a new award
awardsRouter.get('/', findAllAwards); // Fetch all awards
awardsRouter.get('/:id', findAwardById); // Fetch a single award by ID
awardsRouter.put('/:id', updateAward); // Update an award
awardsRouter.delete('/:id', deleteAward); // Delete an award
