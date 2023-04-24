const Sequelize = require('sequelize')

const DB_NAME = 'reviews'
const USER_NAME = 'root'
const PASSWORD = '71dutiba'

const sequelize = new Sequelize(DB_NAME, USER_NAME, PASSWORD, {
  host: 'localhost',
  dialect: 'mysql'
})

module.exports = sequelize