const mongoose = require('mongoose');

const FormSchema  = mongoose.Schema({
  name:String,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  responses:{
    type:Number,
    default: 0,
  },
  questions:[{
    question:String,
    format:{
      type: String,
      enum: ['checkbox', 'text', 'radio'],
    },
    answers:[String],
    options:[String],
  }]
})

module.exports = mongoose.model("forms", FormSchema);