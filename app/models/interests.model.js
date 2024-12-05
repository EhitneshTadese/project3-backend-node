// app/models/interest.model.js
import { DataTypes, Sequelize } from "sequelize";
import {db} from "../config/db.config.js";
import { Gig } from "./gig.model.js";

export const Interest = db.define('Interest', {
    interest_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    gig_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: Gig, 
            key: "user_id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    },
    interest_name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
}, {
    tableName: "Interests",
    timestamps: false, // Set to true if you need createdAt/updatedAt columns
});

Interest.sync({ alter: true })
    .then(() => {
        console.log('Interest table synchronized');
    })
    .catch((err) => {
        console.error('Error synchronizing the Interest table:', err);
    });



