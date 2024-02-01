const mongoose = require('mongoose');

const jobSchemaDef = {
    id: {
        type: Number,
        required: true // "required" should be boolean
    },
    name: {
        type: String,
        required: true
    },
    pay: {
       type: Number,
       required: true
    },
    location: {
       type: String,
       required: true
    },
    startTime: {
       type: String, // If you want to store Date objects, use Date instead of String
       required: true
    },
    endTime: {
        type: String, 
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    tag: {
        type: [String], 
        required: false 
    },
    rating: {
        type: Number,
        required: true
    }
};

// create mongoose schema
const jobSchema = new mongoose.Schema(jobSchemaDef);

// export mongoose model
module.exports = mongoose.model("Job", jobSchema);
