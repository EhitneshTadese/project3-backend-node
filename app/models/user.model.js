const bcrypt = require('bcrypt');

module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        user_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        },
         google_id: {
        type: Sequelize.INTEGER,
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
        }
    });

    return User;
};