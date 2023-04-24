const Sequelize = require('sequelize')
const sequelize = require('../utils/database')

const reviews = sequelize.define('Reviews', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: Sequelize.INTEGER
  },
  fullName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  reviewText: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

module.exports = reviews