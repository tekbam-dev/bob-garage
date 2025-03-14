import {Sequelize, DataTypes } from 'sequelize';


const feedbackmodel = {
    // Primary key, auto-incremented
    feedback_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    
    // Feedback content
    feedback_body: {
      type: DataTypes.TEXT,
      allowNull: false
    },

    //Feedback star

    feedback_star: {
      type:DataTypes.INTEGER,
      allowNull:true,
      default: 0
    },
  
    
    timestamps: true // Disable automatic createdAt and updatedAt columns
  };

export default feedbackmodel;
