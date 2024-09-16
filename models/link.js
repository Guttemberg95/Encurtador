const Sequelize = require('sequelize');
const database = require('../db');
 
const Link = database.define('link', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    code: {
        type: Sequelize.STRING,
        allowNull: false
    },
    url: {
        type: Sequelize.STRING,
        allowNull: false
    },
    hits: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0
    },
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0
    },
    deletedAt: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: null
    }
})
 
module.exports = Link;