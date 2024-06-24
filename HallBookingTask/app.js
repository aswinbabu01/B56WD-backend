//creating a local Server
// 1st step
let express=require("express");
let mongoose=require('mongoose');
let app=express();

let bodyparser=require("body-parser");
app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())

 

//2nd Step- Interlinking the routes.js file and app.js file
let routes=require('./routes')(app);

//3rd Step- Creating a server
let server=app.listen(3456,function(){//3456 is a Port number
    console.log("Server listening at Port",server.address().port)
    connectDB();
}); 

//To Connect MongoDB
const connectDB = async () => {
    try {
      const conn = await mongoose.connect(`mongodb://localhost:27017/Room`, {
        useNewUrlParser: true,
      });
      console.log(`MongoDB Connected: {conn.connection.host}`);
    } catch (error) {
      console.error(error.message);
      process.exit(1);
    }
  }
