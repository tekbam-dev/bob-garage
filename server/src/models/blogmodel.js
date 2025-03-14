import {Sequelize, DataTypes } from 'sequelize';

const blogmodel = {
  // Primary key, auto-incremented
  blog_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  // Blog title: A string with a length constraint
  blog_title: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  // Blog description: Text field for longer content
  blog_description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  // Blog thumbnail: URL or file path for the thumbnail image
  blog_thumbnail: {
    type: DataTypes.STRING,
    allowNull: true // Thumbnail can be optional
  },
  // Additional options for the model
  
  timestamps: true // This will add createdAt and updatedAt columns automatically
}


export default blogmodel;
