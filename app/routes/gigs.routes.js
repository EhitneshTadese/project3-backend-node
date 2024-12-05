import express from 'express';
export const router = express.Router();
import {db} from '../config/db.config.js';
import {Gig} from '../models/gig.model.js'
import * as gigController from '../controllers/gig.controller.js';

export const gigRouter = express.Router();

gigRouter.get('/',gigController.findAllGigs);
gigRouter.post('/',gigController.createGig);
gigRouter.get('/:id', gigController.findOneGig); // Fetch a single gig by ID
gigRouter.put('/:id', gigController.updateGig); // Update a gig by ID
gigRouter.delete('/:id', gigController.deleteGig); // Delete a gig by ID




