import { Sequelize,DataTypes } from "sequelize";

const socialmodel = {
    // Primary key, auto-incremented
    social_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true // Automatically increments the ID
    },
    // Social icon (mandatory field)
    social_icon: {
      type: DataTypes.STRING,
      allowNull: false, // This field is required
      comment: "Store the social URL icon" // Optional comment for clarity
    },
    // Social handler (mandatory field)
    social_handler: {
      type: DataTypes.STRING,
      allowNull: false, // This field is required
      comment: "Store the handler URL" // Optional comment for clarity
    },
    timestamps: false // Disable automatic createdAt/updatedAt fields
  };

  export default socialmodel;