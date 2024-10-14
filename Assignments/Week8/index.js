const express=require("express");
const app=express();

const env=require("dotenv");//basically to not expose the secrets we put them in the .env file and pu .env in .gitignore file
// to make sure the those dont get pushed to github and will be present locally, no matter what, also .env.example is created 
// to let the users know what the file looks like, one can say ki i dont need to use env filei can simply remove the string
// from the local machine to not push it on the github(literally me before creating balanzio), but this will be wrong as we can
// forget this easily
env.config()

const mongoose=require("mongoose")
const connectionString=process.env.dbConnectionString

let {userRouter} =require("./routes/user");
let {courseRouter} =require("./routes/course");
let {adminRouter}=require("./routes/admin");

app.use(express.json());

app.use("/user",userRouter);//now we can remove /user from every routes, this make the code more redable and prefixes can now be given to it
app.use("/user/course",courseRouter);//bigger benifit of this comes in the prod, when new apis version are to be introduced, new routers
// can be created and worked upon also while the older one in prod and by simple changing the prefix to change all the routers

//buildscript basically complies all the js code in the single file

app.use("/admin",adminRouter)
// app.use("/admin",adminRouter2)//this route handeler will be activated when the first one fails

//to learn how to store images uploaded by user

// if to host my full-stack sites there are two options, first one is to host all the files on be(similar to what i did for balanzio)
// or host them seperately, what will be the best approach?? The second one bcz it will be cheaper to host static sites on cds, that
// hosting all the files on server(any virtual machine), it will increase the bandwidth of the vm, vm will spend lot of time computing
// than serving

async function main(){
    try{
        await mongoose.connect(connectionString);
        //the CourseSelling is the name of database, new database can be created just by replacing the string with new database name
        app.listen(3000,()=>{console.log("Server is running at port 3000");
        });
    }
    catch(err){
        console.log("Error connecting to the DB, closing server till connection succeds. Err Status: "+err);
    }
}
main();

// shortcut: cmd+shift+l selects all duplicates at once

//debouncer is basically limiting too many backend calls

//oauth is a protocol

// how to send otp??

// to try cookie based authentication

// npm run start is for prod and run dev is for developement enviornment

//learned about nodemon and production and dev env's 

// learned more datatypes in mongodb schemas

//learned refresences and implementing them

// i can search for the mongodb string on github in global search bar