// app/models/resume.model.js
const User = require('./resume.model');
module.exports = (sequelize, Sequelize) => {
  const Education = sequelize.define("education", {
    education_id: {
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
  

    degree: {
      type: Sequelize.STRING,
      
    },
    institution_name: {
      type: Sequelize.STRING,
    },
    graduation_date: {
      type: Sequelize.DATE,
    
    }
 

  });

  return Education;
};
