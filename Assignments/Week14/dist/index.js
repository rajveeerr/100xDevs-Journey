"use strict";
var x = 45;
x = "daadsads";
console.log(x);
function greet(name) {
    console.log("Hello " + name);
}
greet("Rajveer");
function sum(fn1, fn2) {
    return fn1() + fn2();
}
var a = sum(function () { return 3; }, function () { return 5; });
console.log(a);
function debounce(fn) {
    (function () {
        return setTimeout(function () { return fn("delayed"); }, 1000);
    });
}
debounce(greet);
function multipleArgs(fn1) {
    return "cool";
}
function data(source) {
    console.log(source.id, source.title);
}
var post = { id: "1221", title: "Title", match: { key1: "ASasd", key2: 34 }, age: 12 };
data(post);
var user = {
    id: "1",
    title: "Idk",
    match: {
        key1: "smth",
        key2: 34
    },
    age: 12
};
data(user);
function isLegal(user) {
    return user.age >= 18;
}
var user1 = {
    firstName: "Rajveer",
    age: 18,
    email: "xyz@gmail.com"
};
console.log("User is legal?: " + isLegal(user1));
function Todo(props) {
    return props.task.title + props.lastUpdate;
}
var xyz = 3;
xyz = "something";
function func1(a, b) {
}
