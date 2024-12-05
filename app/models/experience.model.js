import Sequelize from 'sequelize';
import { db } from '../config/db.config.js';
import {Gig} from '../models/gig.model.js';

export const Experience = db.define(
    'Experience',
    {
        experience_id: {
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
        company_name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        role: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        description: {
            type: Sequelize.TEXT,
        },
        start_date: {
            type: Sequelize.DATE,
            allowNull: false,
        },
        end_date: {
            type: Sequelize.DATE,
        },
    },
    {
        timestamps: false,
    }
);

// Synchronize the table
Experience.sync({ alter: true })
    .then(() => {
        console.log('Experience table synchronized');
    })
    .catch((err) => {
        console.error('Error synchronizing the Experience table:', err);
    });
