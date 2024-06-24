const fs = require("fs")
const createRoom = require("./Schema/CreateRoom.js");
const BookingRoom = require("./Schema/BookRoom.js")

module.exports = async function (app) {
    app.post('/createroom', async function (req, res) {
        try {
            const taskData = await req.body;
            await createRoom.create(taskData)
                .then(() => {
                    res.status(201)
                        .json({
                            success: true,                            
                        })
                }).catch((error)=>{
                    res.status(404)
                    .json({
                        success: false,
                        error: error.message
                    })
                })               
            
        } catch (error) {
            res.status(500)
            .json({
              success: false,
              message: "Internal server error"
            })
        }

    });
    app.post('/bookroom', async function (req, res) {
        try {            
            const taskData = await req.body;
            req.body.CustomerName='Aswin';
            req.body.RoomName=102;
            const date=new Date();
            let split_date=date.toISOString().split("T");
            req.body.Date=split_date[0];
            req.body.StartTime=date.toISOString();
            let endtm= date.getTime() + 24 * 60 * 60 * 1000;
            req.body.EndTime=new Date(endtm).toISOString();
            await BookingRoom.find() .then((allrooms) => {             
                    let roomno=[],datearr=[];
                    allrooms.forEach(item=>{
                        roomno.push(item.RoomName);
                        datearr.push(item.Date.toISOString().split("T")[0]);
                    });
                    if(!(roomno.includes(req.body.RoomName))){
                        if(!datearr.includes(req.body.Date)){
                            {
                                BookingRoom.create(taskData)
                                .then(() => {
                                    res.status(201)
                                        .json({
                                            success: true,                            
                                        })
                                }).catch((error)=>{
                                    res.status(404)
                                    .json({
                                        success: false,
                                        error: error.message
                                    })
                                })     
                            } 
                        }
                        else{
                            res.send("Data Already Exist");
                        } 
                    }else if(roomno.includes(req.body.RoomName)){
                        allrooms.forEach(item=>{
                            if(item.RoomName===req.body.RoomName){
                                if(!(item.Date.toISOString().split("T")[0]===req.body.Date)){
                                    BookingRoom.create(taskData)
                                    .then(() => {
                                        res.status(201)
                                            .json({
                                                success: true,                            
                                            })
                                    }).catch((error)=>{
                                        res.status(404)
                                        .json({
                                            success: false,
                                            error: error.message
                                        })
                                    })     
                                }
                            }
                        })                       
                        
                    }  else{
                        res.send("Data Already Exist");
                    }                          
                
            }).catch((error)=>{
                res.status(404)
                .json({
                    success: false,
                    error: error.message
                })
            });                 
            
            
        } catch (error) {
            res.status(500)
            .json({
              success: false,
              message: "Internal server error"
            })
        }
    });

    app.get('/listallrooms',async function(req,res){
        try{
            await BookingRoom.find() .then((allrooms) => { 
                let listofRooms={};
                listofRooms.Room=[];
                allrooms.forEach(item=>{
                    let object={
                        RoomName:item.RoomName,
                        BookedStatus:'true',
                        CustomerName:item.CustomerName,
                        Date:item.Date,
                        StartTime:item.StartTime,
                        EndTime:item.EndTime
                    }
                    listofRooms.Room.push(object);
                });
                res.send(listofRooms);               
    
            }).catch((error)=>{
                res.status(404)
                .json({
                    success: false,
                    error: error.message
                })
            });
        }catch(error){
            res.status(500)
            .json({
              success: false,
              message: "Internal server error"
            })
        }
        
    });

    app.get('/listallcustomers', async function(req,res){
        try{
            await BookingRoom.find() .then((allrooms) => { 
                let listofCustomers={};
                listofCustomers.Customer=[];
                allrooms.forEach(item=>{
                    let object={
                        CustomerName:item.CustomerName,
                        RoomName:item.RoomName,
                        Date:item.Date,
                        StartTime:item.StartTime,
                        EndTime:item.EndTime
                    }
                    listofCustomers.Customer.push(object);
                });
                res.send(listofCustomers);               
    
            }).catch((error)=>{
                res.status(404)
                .json({
                    success: false,
                    error: error.message
                })
            });
        }
        catch(error){
            res.status(500)
            .json({
              success: false,
              message: "Internal server error"
            })
        }
    });

    app.get('/nooftimescustomer',async function(req,res){
        try{
            await BookingRoom.find() .then((allrooms) =>{
                let listOfcustomers=[];
                allrooms.forEach(item=>{
                    listOfcustomers.push(item.CustomerName);
                });
                let customer=check_duplicate_in_array(listOfcustomers);
                let customerdetails={};
                customerdetails.Customer=[];
                customer.forEach(value=>{
                    let customervalues=allrooms.filter(item=>item.CustomerName===value);
                    customervalues.forEach(item=>{
                        let object={
                            CustomerName:item.CustomerName,
                            RoomName:item.RoomName,
                            Date:item.Date,
                            StartTime:item.StartTime,
                            EndTime:item.EndTime,
                            BookingID:item._id,
                            BookingDate:item.Date,
                            BookedStatus:'true'
                        }
                        customerdetails.Customer.push(object);
                    });
                    
                });  
                res.send(customerdetails);             

            });
        }catch(error){

        }
    });
    
    const check_duplicate_in_array=(input_array)=>{
    const duplicates =input_array.filter((item, index) =>input_array.indexOf(item) !== index);
    return Array.from(new Set(duplicates));
    }
}

