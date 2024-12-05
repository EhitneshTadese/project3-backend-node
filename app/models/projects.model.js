import Sequelize from 'sequelize';
import { db } from '../config/db.config.js';
import { Gig } from './gig.model.js'; // Assuming a Resume model exists for `resume_id` foreign key

export const Project = db.define('Project', {
    project_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    
    project_name: {
        type: Sequelize.STRING,
    },
    description: {
        type: Sequelize.TEXT,
    },
    project_link: {
        type: Sequelize.STRING,
    },
}, {
    timestamps: false, // Enables `createdAt` and `updatedAt` fields
});

// Sync the table (remove before deploying in production)
Project.sync({ alter: true })
    .then(() => {
        console.log('Project table synchronized');
    })
    .catch(err => {
        console.log('Error syncing the table:', err);
    });

