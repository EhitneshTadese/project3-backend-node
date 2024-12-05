import { Project } from '../models/projects.model.js';

// Create a new project
export const createProject = (req, res) => {
    const { project_name, description, project_link } = req.body;

    Project.create({  project_name, description, project_link })
        .then(project => res.status(201).json(project))
        .catch(err => {
            console.error('Error creating project:', err);
            res.status(500).send({ message: "Error creating project" });
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
