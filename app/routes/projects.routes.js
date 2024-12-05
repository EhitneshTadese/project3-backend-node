import express from 'express';
import {
    createProject,
    findAllProjects,
    findProjectById,
    updateProject,
    deleteProject,
} from '../controllers/projects.controller.js';

export const projectsRouter = express.Router();

// Routes for projects
projectsRouter.post('/', createProject); // Create a new project
projectsRouter.get('/', findAllProjects); // Fetch all projects
projectsRouter.get('/:id', findProjectById); // Fetch a single project by ID
projectsRouter.put('/:id', updateProject); // Update a project
projectsRouter.delete('/:id', deleteProject); // Delete a project
