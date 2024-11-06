// app/models/resume.model.js
const User = require('./resume.model');
module.exports = (sequelize, Sequelize) => {
  const Experience = sequelize.define("experience", {
    experience_id: {
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
  

    job_title: {
      type: Sequelize.STRING,
      
    },
    company_name: {
      type: Sequelize.STRING,
    },
    start_date: {
      type: Sequelize.DATE,
    
      },
     end_date: {
      type: Sequelize.DATE,
    
      },
      job_description: {
      type: Sequelize.TEXT,
    
    }
 

  });

  return Experience;
};
