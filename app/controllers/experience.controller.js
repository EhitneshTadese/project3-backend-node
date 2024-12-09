import { Experience } from '../models/experience.model.js';

// Create a new experience
export const createExperience = async (req, res) => {
    const { gig_id, company_name, role, description, start_date, end_date } = req.body;

    try {
        const newExperience = await Experience.create({
            gig_id,
            company_name,
            role,
            description,
            start_date,
            end_date,
        });

        res.status(201).json({
            message: 'Experience created successfully',
            experience: newExperience,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating experience' });
    }
};

// Get all experiences
export const getAllExperiences = async (req, res) => {
    try {
        const experiences = await Experience.findAll();
        res.status(200).json(experiences);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching experiences' });
    }
};

// Get experience by ID
export const getExperienceById = async (req, res) => {
    const { id } = req.params;

    try {
        const experience = await Experience.findByPk(id);

        if (!experience) {
            return res.status(404).json({ message: `Experience with ID ${id} not found` });
        }

        res.status(200).json(experience);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching experience' });
    }
};

// Update an experience by ID
export const updateExperience = async (req, res) => {
    const { id } = req.params;
    const { company_name, role, description, start_date, end_date } = req.body;

    try {
        const experience = await Experience.findByPk(id);

        if (!experience) {
            return res.status(404).json({ message: `Experience with ID ${id} not found` });
        }

        const updatedExperience = await experience.update({
            company_name: company_name ?? experience.company_name,
            role: role ?? experience.role,
            description: description ?? experience.description,
            start_date: start_date ?? experience.start_date,
            end_date: end_date ?? experience.end_date,
        });

        res.status(200).json({
            message: 'Experience updated successfully',
            experience: updatedExperience,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating experience' });
    }
};

// Delete an experience by ID
export const deleteExperienceById = async (req, res) => {
    const { id } = req.params;

    try {
        const experience = await Experience.findByPk(id);

        if (!experience) {
            return res.status(404).json({ message: `Experience with ID ${id} not found` });
        }

        await experience.destroy();
        res.status(200).json({ message: 'Experience deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting experience' });
    }
};
