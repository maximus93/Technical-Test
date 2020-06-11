const mongoose = require ('mongoose');
const uniqueValidator = require ('mongoose-unique-validator');

const user_schema = new mongoose.Schema ({
    Name:{
        type: String,
        required: 'Name is Required',
    },
    Email:{
        type:String,
        required: 'Email is Required',
    },
    Password:{
        type:String,
        required:'Password is required'
    },
    UserPost:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserPost',
      }
    ],
    JoiningDate: {
        type: String,
        default: Date.now,
      }
});
user_schema.plugin (uniqueValidator);
module.exports = mongoose.model ('User', user_schema);