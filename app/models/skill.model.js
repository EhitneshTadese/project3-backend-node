// app/models/resume.model.js
const User = require('./resume.model');
module.exports = (sequelize, Sequelize) => {
  const Skill = sequelize.define("skill", {
    skill_id: {
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
  

    skill_name: {
      type: Sequelize.STRING,
      
    },
    proficiency_level: {
      type: Sequelize.STRING,
    }
    
  });

  return Skill;
};
