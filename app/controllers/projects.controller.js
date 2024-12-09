import { Project } from '../models/projects.model.js';
import {Gig} from '../models/gig.model.js';

// Create a new project
export const createProject = (req, res) => {
    const { gig_id, project_name, description, project_link } = req.body;  // Ensure gig_id is passed

    
    if (!gig_id) {
        return res.status(400).send({ message: "gig_id is required" });
    }

    // Validate if gig_id exists in the Gig table
    Gig.findByPk(gig_id)
        .then(gig => {
            if (!gig) {
                return res.status(404).send({ message: `Gig with id ${gig_id} not found.` });
            }

            // Create the project if gig_id is valid
            Project.create({ gig_id, project_name, description, project_link })
                .then(project => res.status(201).json(project))
                .catch(err => {
                    console.error('Error creating project:', err);
                    res.status(500).send({ message: "Error creating project" });
                });
        })
        .catch(err => {
            console.error('Error validating gig_id:', err);
            res.status(500).send({ message: "Error validating gig_id" });
        });
};

// Fetch all projects
export const findAllProjects = (req, res) => {
    Project.findAll()
        .then(projects => res.status(200).json(projects))
        .catch(err => {
            console.error('Error fetching projects:', err);
            res.status(500).send({ message: "Error fetching projects" });
        });
};

// Fetch a single project by ID
export const findProjectById = (req, res) => {
    const id = req.params.id;

    Project.findByPk(id)
        .then(project => {
            if (!project) {
                return res.status(404).send({ message: `Project with id ${id} not found.` });
            }
            res.status(200).json(project);
        })
        .catch(err => {
            console.error('Error fetching project:', err);
            res.status(500).send({ message: "Error fetching project" });
        });
};

// Update a project
export const updateProject = (req, res) => {
    const id = req.params.id;
    const updatedFields = req.body;

    Project.findByPk(id)
        .then(project => {
            if (!project) {
                return res.status(404).send({ message: `Project with id ${id} not found.` });
            }

            // Ensure only valid fields are updated
            const filteredFields = {};
            for (const key in updatedFields) {
                if (updatedFields[key] !== null && updatedFields[key] !== undefined) {
                    filteredFields[key] = updatedFields[key];
                }
            }

            project.update(filteredFields)
                .then(updatedProject => res.status(200).json(updatedProject))
                .catch(err => {
                    console.error('Error updating project:', err);
                    res.status(500).send({ message: "Error updating project" });
                });
        })
        .catch(err => {
            console.error('Error retrieving project:', err);
            res.status(500).send({ message: `Error retrieving project with id ${id}` });
        });
};

// Delete a project
export const deleteProject = (req, res) => {
    const id = req.params.id;

    Project.findByPk(id)
        .then(project => {
            if (!project) {
                return res.status(404).send({ message: `Project with id ${id} not found.` });
            }

            return project.destroy()
                .then(() => res.status(200).send({ message: "Project deleted successfully" }))
                .catch(err => {
                    console.error('Error deleting project:', err);
                    res.status(500).send({ message: "Error deleting project" });
                });
        })
        .catch(err => {
            console.error('Error retrieving project:', err);
            res.status(500).send({ message: `Error retrieving project with id ${id}` });
        });
};
