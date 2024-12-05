import Sequelize from 'sequelize';
import { db } from '../config/db.config.js';
import { Gig } from './gig.model.js';

export const Skill = db.define('Skill', {
    skill_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
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
    skill_name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    proficiency_level: {
        type: Sequelize.STRING,
        allowNull: false,
    },
}, {
    timestamps: false,  // Enable createdAt and updatedAt columns
});

Skill.sync({ alter: true })
    .then(() => console.log('Skills table synchronized'))
    .catch(err => console.error('Error syncing Skills table:', err));
