const sequelize = require('../config/database');
const Trainer = require('./Trainer');
const Course = require('./Course');
const Trainee = require('./Trainee');

async function initDatabase() {
  try {
    await sequelize.authenticate();
    console.log('Database connected.');

    await sequelize.sync({ alter: true }); // or use { force: true } to reset
    console.log('Models synced.');
  } catch (error) {
    console.error('Database error:', error);
  }
}

module.exports = { initDatabase, Trainer, Course, Trainee };
