//Create a schema
const {
    Schema,
    model
  } = require("mongoose");

const MySchema = new Schema({
    CustomerName: {
      type: String,
      required: true,
      maxlength: 100
    }, 
    RoomName : {
        type: Number,
        required: true,
        maxlength: 50
      },
     Date: {
        type: Date,
        required: true,
        maxlength: 50
      },  
      EndTime: {
        type: String,
        required: true,
        maxlength: 50
      },    
      StartTime: {
        type: String,
        required: true,
        maxlength:50
      }
      
    
  });
  const TaskModel = model("BookingRoom", MySchema)

module.exports = TaskModel