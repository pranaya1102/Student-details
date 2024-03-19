const mongoose = require('mongoose');
const studentSchema = new mongoose.Schema({

    name: { type: String },
    age: { type: Number },
    gender: { type: String },
    rollNo: { type: Number },
    class: { type: String },
    bloodGroup: { type: String },
    marks: { type: Number },
    mobile: { type: String, length: 10 },
    address: { type: String },
});

const Student = mongoose.model('studentDetails', studentSchema);

module.exports = Student;