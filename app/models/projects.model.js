// app/models/resume.model.js
const User = require('./resume.model');
module.exports = (sequelize, Sequelize) => {
  const Projects = sequelize.define("project", {
    project_id: {
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
  

    project_name: {
      type: Sequelize.STRING,
      
    },
    description: {
      type: Sequelize.TEXT,
    },
    project_link: {
      type: Sequelize.STRING,
    
    }
 

  });

  return Projects;
};
