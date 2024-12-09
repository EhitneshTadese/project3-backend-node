import Sequelize from 'sequelize';
import { db } from '../config/db.config.js';
import {Gig} from '../models/gig.model.js';

export const Resume = db.define(
    'Resume',
    {
        resume_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        gig_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: Gig,
                key: 'user_id',
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        description: {
            type: Sequelize.TEXT,
        },
        created_date: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW,
        },
    },
    {
        timestamps: false,
    }
);

// Synchronize the table
Resume.sync({ alter: true })
    .then(() => {
        console.log('Resume table synchronized');
    })
    .catch((err) => {
        console.error('Error synchronizing the Resume table:', err);
    });
