import Sequelize from 'sequelize';
import { db } from '../config/db.config.js';

export const Award = db.define('Award', {
    award_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING,
    },
    description: {
        type: Sequelize.STRING,
    },
    recipient: {
        type: Sequelize.STRING,
    },
    date_received: {
        type: Sequelize.DATE,
    },
    certificate_link: {
        type: Sequelize.STRING,
    },
}, {
    timestamps: false // Enables `createdAt` and `updatedAt` fields
    
});

// Sync the table (remove before deploying in production)
Award.sync({ alter: true })
    .then(() => {
        console.log('Award table synchronized');
    })
    .catch(err => {
        console.log('Error syncing the table:', err);
    });


//this was used to clear the table
  //      Award.destroy({
  //       where:{},
  //   })
  //   .then(deletedCount =>{
  //       console.log(`${deletedCount} awards were deleted.`);
  //   })
  //   .catch(err =>{
  //       console.error('Error deleting users:', err);
  //  });    