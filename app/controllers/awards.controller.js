import { Award } from '../models/awards.model.js';

// Create a new award
export const createAward = (req, res) => {
    const { name, description, recipient, date_received, certificate_link } = req.body;

    Award.create({ name, description, recipient, date_received, certificate_link })
        .then(award => res.status(201).json(award))
        .catch(err => {
            console.error('Error creating award:', err);
            res.status(500).send({ message: "Error creating award" });
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

