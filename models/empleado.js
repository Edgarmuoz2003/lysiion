const mongoose = require('mongoose');
const { Schema }  = mongoose;

const AdminSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    }
});

module.exports = mongoose.model('users', AdminSchema);
