const mongoose = require('mongoose');
const mongooseUniqueValidator = require('mongoose-unique-validator');

const url = process.env.MONGODB_URL

mongoose.connect(url).then(result => {
    console.log('mongodb connected');
}).catch((error) => {
    console.error('error connecting mongodb: ', error.message);
})

const PhoneNumber = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    number: String,
})
PhoneNumber.plugin(mongooseUniqueValidator)

PhoneNumber.set('toJSON', {
    transform: (document, returnObject) => {
        returnObject.id = returnObject._id.toString()
        delete returnObject._id
        delete returnObject.__v
    }
})

module.exports = mongoose.model('number', PhoneNumber)