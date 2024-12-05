import Sequelize from 'sequelize';
import { db } from '../config/db.config.js';
import { Gig } from './gig.model.js';

export const Award = db.define('Award', {
    award_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    gig_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: Gig,
            key: "user_id", // Matches the primary key in Gig
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    description: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    recipient: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    date_received: {
        type: Sequelize.DATE,
        allowNull: true,
    },
    certificate_link: {
        type: Sequelize.STRING,
        allowNull: true,
    },
}, {
    timestamps: false, // Enables `createdAt` and `updatedAt` fields
});

// Sync the table (remove this before deploying in production)
Award.sync({ alter: true })
    .then(() => {
        console.log('Award table synchronized');
    })
    .catch(err => {
        console.error('Error syncing the Award table:', err);
    });
