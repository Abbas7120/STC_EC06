const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');
const Trainer = require('./Trainer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class Trainee extends Model {
  // Instance method to generate JWT
  generateAuthToken() {
    return jwt.sign(
      { _id: this.id }, // You can also include this.email or other fields 
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
  }

  // Instance method to compare password
  async comparePassword(password) {
    return await bcrypt.compare(password, this.password);
  }

  // Static method to hash password
  static async hashPassword(password) {
    return await bcrypt.hash(password, 10);
  }
}

Trainee.init({
  name: DataTypes.STRING,
  email: DataTypes.STRING,
  post: DataTypes.STRING,
  courseCode: DataTypes.STRING,
  courseName: DataTypes.STRING,
  joiningDate: DataTypes.DATE,
  endingDate: DataTypes.DATE,
  uniqueId: DataTypes.STRING,
  marks: {
    type: DataTypes.JSON,
  },
}, {
  sequelize,
  modelName: 'Trainee',
  timestamps: true,
});

// Define associations
Trainer.hasMany(Trainee, { foreignKey: 'trainerId' });
Trainee.belongsTo(Trainer, { foreignKey: 'trainerId' });

module.exports = Trainee;

