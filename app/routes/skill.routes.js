import express from 'express';
import { createSkill, getSkillsByGig, updateSkill, deleteSkillByID } from '../controllers/skill.controller.js';

export const skillRouter = express.Router();

// Create a new skill
skillRouter.post('/create', createSkill);

// Get skills for a specific gig (user)
skillRouter.get('/gig/:gig_id', getSkillsByGig);

//Update a skill 
skillRouter.put('/:id',updateSkill);

//delete a skill
skillRouter.delete('/:id',deleteSkillByID);


