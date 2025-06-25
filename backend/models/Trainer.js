const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

class Trainer extends Model {
  // Instance method: generate JWT token
  generateAuthToken() {
    return jwt.sign(
      { id: this.id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
  }

  // Instance method: compare password
  async comparePassword(password) {
    return await bcrypt.compare(password, this.password);
  }

  // Static method: hash password
  static async hashPassword(password) {
    return await bcrypt.hash(password, 10);
  }
}

Trainer.init(
  {
  //    firstname: {
  //   type: DataTypes.STRING,
  //   allowNull: false,
  //   validate: {
  //     len: {
  //       args: [3],
  //       msg: "First name must be at least 3 characters long"
  //     }
  //   }
  // },
  // lastname: {
  //   type: DataTypes.STRING,
  //   allowNull: true,
  //   validate: {
  //     len: {
  //       args: [3],
  //       msg: "Last name must be at least 3 characters long"
  //     }
  //   }
  // },
  name:{
      type: DataTypes.STRING,
      allowNull: false, 
  },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('trainer', 'director'),
      defaultValue: 'trainer',
    },
  },
  {
    sequelize,
    modelName: 'Trainer',
    timestamps: true,
  }
);

module.exports = Trainer;

