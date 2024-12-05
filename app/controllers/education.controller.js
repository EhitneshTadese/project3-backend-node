import { Education } from '../models/education.model.js';

// Create a new education record
export const createEducation = async (req, res) => {
    const { gig_id, institution_name, degree, field_of_study, start_date, end_date, grade } = req.body;

    try {
        const newEducation = await Education.create({
            gig_id,
            institution_name,
            degree,
            field_of_study,
            start_date,
            end_date,
            grade,
        });

        res.status(201).json({
            message: 'Education record created successfully',
            education: newEducation,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating education record' });
    }
};

// Get all education records
export const getAllEducation = async (req, res) => {
    try {
        const educationRecords = await Education.findAll();
        res.status(200).json(educationRecords);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching education records' });
    }
};

// Get a specific education record by ID
export const getEducationById = async (req, res) => {
    const { id } = req.params;

    try {
        const education = await Education.findByPk(id);

        if (!education) {
            return res.status(404).json({ message: `Education record with ID ${id} not found` });
        }

        res.status(200).json(education);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching education record' });
    }
};

// Update an education record by ID
export const updateEducation = async (req, res) => {
    const { id } = req.params;
    const { institution_name, degree, field_of_study, start_date, end_date, grade } = req.body;

    try {
        const education = await Education.findByPk(id);

        if (!education) {
            return res.status(404).json({ message: `Education record with ID ${id} not found` });
        }

        const updatedEducation = await education.update({
            institution_name: institution_name ?? education.institution_name,
            degree: degree ?? education.degree,
            field_of_study: field_of_study ?? education.field_of_study,
            start_date: start_date ?? education.start_date,
            end_date: end_date ?? education.end_date,
            grade: grade ?? education.grade,
        });

        res.status(200).json({
            message: 'Education record updated successfully',
            education: updatedEducation,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating education record' });
    }
};

// Delete an education record by ID
export const deleteEducationById = async (req, res) => {
    const { id } = req.params;

    try {
        const education = await Education.findByPk(id);

        if (!education) {
            return res.status(404).json({ message: `Education record with ID ${id} not found` });
        }

        await education.destroy();
        res.status(200).json({ message: 'Education record deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting education record' });
    }
};
