const mongoose = require ('mongoose');
const uniqueValidator = require ('mongoose-unique-validator');

const userpost_schema = new mongoose.Schema ({
    postDesc:{
        type:String,
        required:'Description Is required'
    },
    UserId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    PostData:{
        type:String,
        default: Date.now,
    }
});
userpost_schema.plugin (uniqueValidator);
module.exports = mongoose.model ('UserPost', userpost_schema);