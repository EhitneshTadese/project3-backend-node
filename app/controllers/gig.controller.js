import { Gig } from '../models/gig.model.js';

// Controller function to fetch all users
export const findAllGigs = (req, res) => {
    Gig.findAll()
        .then(gig => {
            res.status(200).json(gig);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({
                message: "Error retrieving gigs"
            });
        });
};

// Controller function to fetch a single user by ID
export const findOneGig = (req, res) => {
    const id = req.params.id;
    
    Gig.findByPk(id)
        .then(gig => {
            if (!gig) {
                return res.status(404).send({
                    message: `Gig with id ${id} not found.`
                });
            }
            res.status(200).json(gig);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({
                message: `Error retrieving gig with id ${id}`
            });
        });
};

// Controller function to create a new user
export const createGig = (req, res) => {
    // Assuming the request body contains the necessary data
    const { name, email, address, phone, github_link, linkedin_link, portfolio_link } = req.body;

    Gig.create({
        name,
        email,
        address,
        phone,
        github_link,
        linkedin_link,
        portfolio_link
    })
        .then(gig => {
            res.status(201).json(gig);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({
                message: "Error creating gig"
            });
        });
};

// Controller function to update a user by ID
export const updateGig = (req, res) => {
    const id = req.params.id;
    const updatedFields = req.body;

    Gig.findByPk(id)
        .then(gig => {
            if (!gig) {
                return res.status(404).send({
                    message: `Gig with id ${id} not found.`
                });
            }

            // Filter out fields that are null or undefined
            const filteredFields = {};
            for (const key in updatedFields) {
                if (updatedFields[key] !== null && updatedFields[key] !== undefined) {
                    filteredFields[key] = updatedFields[key];
                }
            }

            // Update only the filtered fields
            gig.update(filteredFields)
                .then(updatedGig => {
                    res.status(200).json(updatedGig);
                })
                .catch(err => {
                    console.error('Error during update:', err);
                    res.status(500).send({
                        message: "Error updating gig"
                    });
                });
        })
        .catch(err => {
            console.error('Error retrieving gig:', err);
            res.status(500).send({
                message: `Error retrieving gig with id ${id}`
            });
        });
};


// Controller function to delete a user by ID
export const deleteGig = (req, res) => {
    const id = req.params.id;

    Gig.destroy({
        where: { user_id: id }
    })
        .then(deleted => {
            if (!deleted) {
                return res.status(404).send({
                    message: `Gig with id ${id} not found.`
                });
            }
            res.status(200).send({
                message: `Gig with id ${id} was deleted successfully.`
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({
                message: `Error deleting gig with id ${id}`
            });
        });
};

// Optional: Delete all users (caution!!!!)
export const deleteAllGigs = (req, res) => {
    Gig.destroy({
        where: {},
        truncate: true // optional: if you want to reset auto-increment values
    })
        .then(() => {
            res.status(200).send({
                message: "All gigs were deleted successfully."
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({
                message: "Error deleting all gigs"
            });
        });
};
