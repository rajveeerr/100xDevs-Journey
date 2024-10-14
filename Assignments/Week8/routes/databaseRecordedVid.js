// Why even use http server if the data is fetched from server?
// browsers dont unserstand the protocols used to create dbses
// detabases dont have granual acess, they either allow one to acess all the data or doesnt allow access to any data at all, no selective
// access to data is possible, which is only possinle using express servers
// db like firebase has some sort of granola acess

// prisma is a library enables us to talk to a db

// Http servers are supposed to be transient, they can go down and the db is persistent

// till now we were creating the purchases table to kep track of the user and their purchased courses, this is a very sql way of doing
// it, since mongo allows us to store complex objects like array of strings etc, we can simply store reference to the purchased
// courses in the user table/collention, this is what the schema will look like

const mongoose=require("mongoose")
const schema=mongoose.schema;
const ObjectId=mongoose.ObjectId



let user=new schema({
    name: String,
    password: String,
    purchasedCourses: [{
        type: ObjectId,
        ref: "Courses"
    }]
})

let course=new schema({
    title: String,
    price: Number,
    //id is generated automatically
})

let userModel=mongoose.model("Users",user)
let courseModel=mongoose.model("Courses",course)

// now to update the purchasedCourses field of user we can use this command

userModel.updateOne(
    {name: "randomusername"},
    {$push: { purchasedCourses: 123 } }//123 is the course id, this pushes the course id at the end of array saying purchasedCourses
)

// to find all courses associated with an user
const currentUser=userModel.find({name: "smth"});
const courses=courseModel.findAll({
    _id: {$in: currentUser.purchasedCourses}//basically finds all the courses that are present in the currentUser purchasedCourses
})


//should always await on these, this is a=same as using .then(), if not used this will just send the request to db and the execution
// will reach next line, it will not wait for the response

userModel.findById("12")//searches for user in the table by id

userModel.update({},{
    premium: true
})//this will update all the user data

userModel.deleteMany({})

userModel.deleteOne({name: "something"})

