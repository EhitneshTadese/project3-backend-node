import express from "express";
import {
    createInterest,
    getAllInterests,
    getInterestById,
    updateInterestById,
    deleteInterestById,
} from "../controllers/interests.controller.js";

export const interestRouter = express.Router();


interestRouter.post("/", createInterest);// Create a new interest
interestRouter.get("/", getAllInterests);// Get all interests
interestRouter.get("/:id", getInterestById);// Get a specific interest by ID
interestRouter.put("/:id", updateInterestById);// Update an interest by ID
interestRouter.delete("/:id", deleteInterestById);// Delete an interest by ID


