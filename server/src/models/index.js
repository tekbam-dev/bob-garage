//src/models/index.js
//This file hods our models for our database tables. 
//This will carete the tables oif they do not exist. 
// Import the seqelize package
// This is an ORM package ( Object -relational mapping).
//This allows up to use SQL as function for a SQL database. 
//We need this package to iniialise our database and create models for our tables.
import {Sequelize, DataTypes } from 'sequelize';
//Importing configuration files 
import config  from '../config/config.js';

//Importing all the model structure to create the database table 
import blogmodel from './blogmodel.js';
import feedbackmodel from './feedbackmodel.js';
import optionsmodel from './optionsmodel.js';
import servicemodel from './servicemodel.js';
import socialmodel from './socialmodel.js';
import usermodel from './usermodel.js';



//Create our db variable.
 let db = {};



 //Create a new Sequilize object and pass in our database details. 
 //This will initilise our database with the options we specified in our config. 
 
 const sequelize  = new Sequelize(
    config.db.database,
    config.db.user,
    config.db.password,
     config.db.options,
     config.db.jwtSecret
 );

//  console.log(sequelize.config.db.database);

 //Setup Model and a user model. 
 //This is config the 
 // The define function tells swequelize that wwe are creating database modle. 
 //Seqelize will add an 's' to the model name to create the table in the database. 
// DataTypes in the model will let the database know what type of data we need for each field in our table 
//For more information about models look at : 
//https//sequelize.org/v6/manual/model-basics.html
//https://seequelize.org/v6/manual/model-basics.html#data-types



const Users  = sequelize.define('Users',usermodel);
const Feedbacks = sequelize.define('Feedbacks',feedbackmodel);
const Blogs  = sequelize.define('Blogs',blogmodel);
sequelize.define('Services',servicemodel);
const Socials = sequelize.define('Socials',socialmodel);

const Options = sequelize.define('Options',optionsmodel);





// Create associations 
//This will create a relationship betwen user and feedback 
//This will also create the foreginkeys for us. 

// Users.hasOne(Feedbacks);
// Feedbacks.belongsTo(Users);
Users.hasOne(Feedbacks, { foreignKey: 'UserUserId' });
Feedbacks.belongsTo(Users, { foreignKey: 'UserUserId' });




//Logout our models
console.log("sequelize model " + sequelize.models);

// This will allow us to access the sequelize object
db.sequelize = sequelize;
//This will allow us to access the sequelize class
db.Sequelize = Sequelize;



//Export our variables
// Can be used where the models are available
//The Op export allows us to use database operation like, and or etc...
// module.exports = db;
// module.exports.Op = Sequelize.Op;
export default db;
export const Op = Sequelize.Op;

