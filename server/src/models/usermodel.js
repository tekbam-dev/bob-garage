import { Sequelize,DataTypes } from "sequelize";

const usermodel = {
    // Primary key, auto-incremented
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    // First name limited to 20 characters
    user_fn: {
      type: DataTypes.STRING(20), // Limit to 20 characters
      allowNull: false // First name is required
    },
    // Last name limited to 20 characters
    user_ln: {
      type: DataTypes.STRING(20), // Limit to 20 characters
      allowNull: false // Last name is required
    },
    // User profile picture (optional)
    user_pp: {
      type: DataTypes.STRING,
      allowNull: true // Optional field for profile picture (URL or path)
    },
    // Is the user an admin? (boolean, default is false)
    user_isadmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false, // Required field
      defaultValue: false // Default to false if not specified
    },
    // Is dark mode enabled for the user? (boolean, default is false)
    user_ismode_dark: {
      type: DataTypes.BOOLEAN,
      allowNull: false, // Required field
      defaultValue: false // Default to false if not specified
    }, 

    user_email: {
      type: DataTypes.STRING,
      allowNull: false, // This field is required
      unique: true, // Ensure email is unique
      validate: {
        isEmail: true // Validate that the value is a valid email format
      }
    },
    // User password (required)
    user_password: {
      type: DataTypes.STRING,
      allowNull: false // This field is required
    },
    timestamps: false // Disable automatic createdAt/updatedAt fields
  };
  
   

  export default usermodel;