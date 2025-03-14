import {Sequelize, DataTypes } from 'sequelize';

const servicemodel = {

       // Primary key, auto-incremented
        service_id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        // Title with a maximum length of 20 characters
        service_title: {
          type: DataTypes.STRING(20), // Limit to 20 characters
          allowNull: false
        },
        // Description with a maximum length of 50 characters
        service_description: {
          type: DataTypes.STRING(50), 
          allowNull: false // or false if this field is mandatory
        },
        // Thumbnail (usually a URL or path to an image)
        service_thumbnail: {
          type: DataTypes.STRING,
          allowNull: true // Optional field
        },
        // Text field for long descriptions
        service_text: {
          type: DataTypes.TEXT, // Use TEXT for long content
          allowNull: true
        },
        // Price field, with 8 digits and 2 decimal places (e.g., 999999.99)
        service_price: {
          type: DataTypes.DECIMAL(8, 2), // 8 digits total, 2 decimal places
          allowNull: false
        },
        timestamps: false // Disable automatic createdAt/updatedAt fields
      };


      export default servicemodel;