"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
function Sum(employee1, employee2) {
    return employee1.age + employee2.age;
}
console.log(Sum({ name: "rjvr", age: 19 }, { name: "smth", age: 18 }));
function updateUser(userData) {
    return { name: "updatedName", age: userData.age, password: userData.password };
}
function updateUserDetails(userData) {
    return userData;
}
updateUserDetails({
    name: "das"
});
const client = {
    name: "imUser",
    email: "xyz@...",
    age: 19,
    password: "s3cur3Pa55",
    profilePic: "./logo1.png"
};
client.name = "Jane Doe";
const rootUser = {
    name: "rjvr",
    email: "xyz@...",
    age: 19,
    password: "s3cur3Pa55",
    profilePic: "./logo1.png"
};
let user = {
    'id1': {
        id: "sm1",
        name: "yada yada",
        age: 18,
    },
    'id2': {
        id: "sm2",
        name: "bla bla",
        age: 24,
    }
};
console.log(user['id1'].name);
let Dog = {
    "sound": "bark"
};
let players = new Map();
players.set("id12", { id: "se1", name: "smth", age: 20 });
players.set("id13", { id: "se2", name: "dayum", age: 20 });
const player = players.get("id1");
function onEvent(eventOccured) {
    return eventOccured + " do something";
}
const express = require("express");
const app = express();
const zod_1 = __importDefault(require("zod"));
let resType = zod_1.default.object({
    name: zod_1.default.string().min(1, { message: "Name cannot be less than 1 character" }),
    email: zod_1.default.string().email({ message: "Email is Invalid" }),
    age: zod_1.default.number().min(18, { message: "Should be an Adult" }).optional()
});
app.use(express.json());
app.put("/", (req, res) => {
    let reqBody = resType.safeParse(req.body);
    let updateUser = req.body;
    if (!reqBody || !reqBody.success) {
        res.status(400).json({
            message: "Incomplete User Details!!"
        });
        return;
    }
    res.json({
        message: "User details updated succesfully!!"
    });
});
app.listen(3000, () => console.log("Server is running at port 3k"));
