const mongoose = require('mongoose');


const Schema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    token:{
        type:String,
        required:true
    }
})

const Collection=new mongoose.model("AuthCollection",Schema)

module.exports=Collection


// // create mongoose schema
// const mongoSchema = new mongoose.Schema(mongoSchemaDef);

// // export mongoose model
// module.exports = mongoose.model("mongo", mongoSchema);
