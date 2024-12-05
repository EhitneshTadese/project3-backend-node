import {Interest} from "../models/interests.model.js";

// Create a new interest
export const createInterest = async (req, res) => {
    const { gig_id, interest_name } = req.body;
    try {
        const interest = await Interest.create({ gig_id, interest_name });
        res.status(201).json(interest);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error creating interest" });
    }
};

// Get all interests
export const getAllInterests = async (req, res) => {
    try {
        const interests = await Interest.findAll();
        res.status(200).json(interests);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error retrieving interests" });
    }
};

// Get a specific interest by ID
export const getInterestById = async (req, res) => {
    const { id } = req.params;
    try {
        const interest = await Interest.findByPk(id);
        if (!interest) {
            return res.status(404).send({ message: `Interest with ID ${id} not found` });
        }
        res.status(200).json(interest);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error retrieving interest" });
    }
};

// Update an interest
export const updateInterestById = async (req, res) => {
    const { id } = req.params;
    const { interest_name } = req.body;
    try {
        const interest = await Interest.findByPk(id);
        if (!interest) {
            return res.status(404).send({ message: `Interest with ID ${id} not found` });
        }
        await interest.update({ interest_name });
        res.status(200).json(interest);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error updating interest" });
    }
};

// Delete an interest
export const deleteInterestById = async (req, res) => {
    const { id } = req.params;
    try {
        const interest = await Interest.findByPk(id);
        if (!interest) {
            return res.status(404).send({ message: `Interest with ID ${id} not found` });
        }
        await interest.destroy();
        res.status(200).send({ message: "Interest deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error deleting interest" });
    }
};
