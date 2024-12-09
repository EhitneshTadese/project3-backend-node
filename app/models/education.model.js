
import Sequelize from 'sequelize';
import { db } from '../config/db.config.js';
import { Gig } from './gig.model.js';

export const Education = db.define(
    'Education',
    {
        education_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        gig_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: Gig, // Assuming 'Users' is the name of the table for your Gig model
                key: 'user_id',
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        },
        institution_name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        degree: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        field_of_study: {
            type: Sequelize.STRING,
        },
        start_date: {
            type: Sequelize.DATE,
            allowNull: false,
        },
        end_date: {
            type: Sequelize.DATE,
        },
        grade: {
            type: Sequelize.STRING,
        },
    },
    {
        timestamps: false,
    }
);

// Synchronize the table
Education.sync({ alter: true })
    .then(() => {
        console.log('Education table synchronized');
    })
    .catch((err) => {
        console.error('Error synchronizing the Education table:', err);
    });