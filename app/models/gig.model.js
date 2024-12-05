import Sequelize from 'sequelize'
import {db} from '../config/db.config.js';
import {faker} from '@faker-js/faker';
export const Gig = db.define('User', {
    user_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING,
    },
    email: {
        type: Sequelize.STRING,
    },
    address: {
        type: Sequelize.STRING,
    },
    phone: {
        type: Sequelize.STRING,
    },
    github_link: {
        type: Sequelize.STRING,
    },
    linkedin_link: {
        type: Sequelize.STRING,
    },
    portfolio_link: {
        type: Sequelize.STRING,
    },
}, {
    timestamps: false, // This enables automatic `createdAt` and `updatedAt` fields.
    });


//this was used to clear the table
//       Gig.destroy({
//       where:{},
//   })
//   .then(deletedCount =>{
//       console.log(`${deletedCount} users were deleted.`);
//   })
//   .catch(err =>{
//       console.error('Error deleting users:', err);
//  });


//remove before deploying
Gig.sync({alter: true})
    .then(()=>{
        console.log('User table syncronized');
    })
    .catch(err => {
        console.log('Error syncing the table:',err);
    });


// const populateGigTable = async (numRecords) => {
//         const fakeGigs = [];
    
//         for (let i = 0; i < numRecords; i++) {
//             fakeGigs.push({
//                 name: faker.person.fullName(),
//                 email: faker.internet.email(),
//                 address: faker.location.streetAddress(),
//                 phone: faker.phone.number(),
//                 github_link: faker.internet.url(),
//                 linkedin_link: faker.internet.url(),
//                 portfolio_link: faker.internet.url(),
//             });
//         }
    
//         try {
//             await Gig.bulkCreate(fakeGigs, { validate: true });
//             console.log(`${numRecords} records inserted into the Gig table.`);
//         } catch (error) {
//             console.error('Error populating the Gig table:', error);
//         }
//     };
    
    // Call the function with the desired number of records
//populateGigTable(10); 
