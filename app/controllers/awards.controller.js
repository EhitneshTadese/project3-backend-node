import { Award } from '../models/awards.model.js'; // Import Award model
import {Gig} from '../models/gig.model.js';

// Create a new award
export const createAward = (req, res) => {
    const { gig_id, name, description, recipient, date_received, certificate_link } = req.body;

    // Create a new award with gig_id associated
    Gig.findByPk(gig_id)
    .then(gig => {
        if (!gig) {
            return res.status(404).send({ message: `Gig with id ${gig_id} not found.` });
        }

        // Create the project if gig_id is valid
        Award.create({ gig_id, name, description, recipient, date_received, certificate_link })
        .then(award => res.status(201).json(award))
        .catch(err => {
            console.error('Error creating award:', err);
            res.status(500).send({ message: "Error creating award" });
        });
    })
    .catch(err => {
        console.error('Error validating gig_id:', err);
        res.status(500).send({ message: "Error validating gig_id" });
    });
};

// Fetch all awards
export const findAllAwards = (req, res) => {
    Award.findAll()
        .then(awards => res.status(200).json(awards))
        .catch(err => {
            console.error('Error fetching awards:', err);
            res.status(500).send({ message: "Error fetching awards" });
        });
};

// Fetch a single award by ID
export const findAwardById = (req, res) => {
    const id = req.params.id;

    Award.findByPk(id)
        .then(award => {
            if (!award) {
                return res.status(404).send({ message: `Award with id ${id} not found.` });
            }
            res.status(200).json(award);
        })
        .catch(err => {
            console.error('Error fetching award:', err);
            res.status(500).send({ message: "Error fetching award" });
        });
};

// Update an award
export const updateAward = (req, res) => {
    const id = req.params.id;
    const updatedFields = req.body;

    Award.findByPk(id)
        .then(award => {
            if (!award) {
                return res.status(404).send({ message: `Award with id ${id} not found.` });
            }

            // Filter out null or undefined values from the fields to be updated
            const filteredFields = {};
            for (const key in updatedFields) {
                if (updatedFields[key] !== null && updatedFields[key] !== undefined) {
                    filteredFields[key] = updatedFields[key];
                }
            }

            award.update(filteredFields)
                .then(updatedAward => res.status(200).json(updatedAward))
                .catch(err => {
                    console.error('Error updating award:', err);
                    res.status(500).send({ message: "Error updating award" });
                });
        })
        .catch(err => {
            console.error('Error retrieving award:', err);
            res.status(500).send({ message: `Error retrieving award with id ${id}` });
        });
};

// Delete an award
export const deleteAward = (req, res) => {
    const id = req.params.id;

    Award.findByPk(id)
        .then(award => {
            if (!award) {
                return res.status(404).send({ message: `Award with id ${id} not found.` });
            }

            return award.destroy()
                .then(() => res.status(200).send({ message: "Award deleted successfully" }))
                .catch(err => {
                    console.error('Error deleting award:', err);
                    res.status(500).send({ message: "Error deleting award" });
                });
        })
        .catch(err => {
            console.error('Error retrieving award:', err);
            res.status(500).send({ message: `Error retrieving award with id ${id}` });
        });
};
