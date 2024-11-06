// app/models/resume.model.js
const User = require('./resume.model');
module.exports = (sequelize, Sequelize) => {
  const Awards = sequelize.define("award", {
    award_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    resume_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'resumes',    
                key: 'resume_id',          
            },
            onDelete: 'CASCADE',    
            onUpdate: 'CASCADE',    
        },
  

    award_name: {
      type: Sequelize.STRING,
      
    },
   
    date_earned: {
      type: Sequelize.DATE,
    
    }
 

  });

  return Awards;
};
