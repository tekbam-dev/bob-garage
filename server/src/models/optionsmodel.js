import {Sequelize, DataTypes } from 'sequelize';

   const optionsmodel =  {
        // Banner image (optional)
        options_banner_image: {
          type: DataTypes.STRING,
          allowNull: true // Optional field; change to false if required
        },
        // Banner text with a maximum length of 20 characters
        option_banner_text: {
          type: DataTypes.STRING(20), // Limit to 20 characters
          allowNull: true // Optional field; change to false if required
        },
        // Overlay banner option (boolean, default is false)
        option_banner_overlay: {
          type: DataTypes.BOOLEAN,
          allowNull: false, // Required field
          defaultValue: false // Default value set to false
        }, 
        timestamps: false // Disable automatic createdAt/updatedAt fields
   };
   
   export default optionsmodel;