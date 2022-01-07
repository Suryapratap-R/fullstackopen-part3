const mongoose = require('mongoose');

const url = process.env.MONGODB_URL

mongoose.connect(url).then(result => {
    console.log('mongodb connected');
}).catch((error) => {
    console.error('error connecting mongodb: ', error.message);
})

const PhoneNumber = new mongoose.Schema({
    name: String,
    number: String,
})

PhoneNumber.set('toJSON', {
    transform: (document, returnObject) => {
        returnObject.id = returnObject._id.toString()
        delete returnObject._id
        delete returnObject.__v
    }
})

module.exports = mongoose.model('number', PhoneNumber)