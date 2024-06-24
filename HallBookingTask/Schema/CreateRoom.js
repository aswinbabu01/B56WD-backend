//Create a schema
const {
    Schema,
    model
  } = require("mongoose");

const MySchema = new Schema({
    NoOfSeatsAvailable: {
      type: Number,
      required: true,
      maxlength: 50
    }, 
    AmenitiesInRoom: {
        type: String,
        required: true,
        maxlength: 50
      }, 
      PriceForAnHour: {
        type: String,
        required: true,
        maxlength: 50
      },
    
  });
  const TaskModel = model("Room", MySchema)

module.exports = TaskModel