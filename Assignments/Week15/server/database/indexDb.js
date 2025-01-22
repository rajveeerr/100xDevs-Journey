import {mongoose,Schema,Model,ObjectId} from "mongoose"
mongoose.connect(process.env.dbConnectionString)

let userSchema=new Schema({
    email: {type: String,unique: true,required: true},
    password: {type: String,min: 8,max:20},
    username: {type:String,min: 3,max:10},
    profilePic: String,
    userCollections: {type:[ObjectId],rel: CollectionModel},
    userContents: {type:[ObjectId],rel: ContentsModel},
    // savedCollection: {type: [ObjectId], rel: TodoModal}
},{timestamps: true})