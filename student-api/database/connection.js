
const mongoose = require('mongoose')

require("dotenv").config();

const connection = async function () {

  try {

    console.log('initiating connection to mongodb...');

    await mongoose.connect(process.env.dbURL);

    console.log('connected to mongodb');

  } catch (error) {

    console.log('error', error);

  }

}

module.exports = connection;