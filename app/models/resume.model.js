// app/models/resume.model.js
const User = require('./user.model');
module.exports = (sequelize, Sequelize) => {
  const Resume = sequelize.define("resume", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,   
    },
  

    school: {
      type: Sequelize.STRING,
      
    },
    degree: {
      type: Sequelize.STRING,
    },
    major: {
      type: Sequelize.STRING,
    
    },
 school_start_date: {
      type: Sequelize.DATE,
    
    },
 
 graduation_date: {
      type: Sequelize.DATE,
    
    },
 
company: {
      type: Sequelize.STRING,
    
    },

   position: {
      type: Sequelize.STRING,
    
    },
   
    company_start_date: {
      type: Sequelize.DATE,
    
    },
    
    company_finish_date: {
      type: Sequelize.DATE,
    
    },

     currently_working_here: {
      type: Sequelize.BOOLEAN,
    
    },
     
     
   skills: {
      type: Sequelize.STRING,
    
    },
 

  });

  return Resume;
};
