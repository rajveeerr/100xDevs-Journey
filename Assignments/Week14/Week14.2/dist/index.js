"use strict";
function canVote(age) {
    return age > 18;
}
let user1 = {
    name: "Rjvr",
    age: 19,
    address: {
        street: 12,
        city: "Delhi",
        country: "India"
    }
};
let user2 = {
    name: "Ryn",
    age: 19
};
let manager = {
    name: "xyz",
    age: 20,
    greet2(phrase) {
        return phrase + manager.name;
    }
};
let manager2 = {
    name: "abc",
    age: 20,
    greet2: (phrase) => phrase + manager2.name
};
console.log(manager.greet2("Hi from Manager "));
let keyValuePairs = {
    name: "dc",
    salary: 121
};
class Manager {
    constructor(employeeName, employeeAge) {
        this.name = employeeName;
        this.age = employeeAge;
        this.phoneNO = 21323123;
    }
    greet2(phrase) {
        return phrase + this.name;
    }
}
let Hr = new Manager("Bla Bla", 20);
console.log(Hr.greet2("Hi "));
class Shape {
    constructor() {
        this.name = "";
        this.width = 0;
        this.height = 0;
    }
    area(width, height) {
        return this.width * this.height;
    }
}
class Rectangle extends Shape {
    constructor() {
        super();
        this.name = "Reactangle";
    }
    wtohRatio() {
        return this.width / this.height;
    }
    area(width, height) {
        return width * height * 2;
    }
}
let square = new Rectangle();
console.log(square.area(12, 12));
class People {
    hello() {
        console.log("Hello there!!");
    }
}
class Student extends People {
    constructor(name, age) {
        super();
        this.name = name;
        this.age = age;
    }
    greet() {
        return "Hi " + this.name;
    }
}
let Student1 = new Student("Aneesh", 20);
Student1.hello();
let proof = {
    name: "dsa",
    age: 34,
    weight: 54
};
let Athlete = proof;
let Usain = {
    name: "Usain Bolt",
    age: 34,
};
let Nick = {
    name: "Nick Symmonds",
    age: 40,
    country: "USA",
    company: "xyz"
};
let Neeraj = {
    name: "Neeraj",
    age: 28,
    country: "India",
    company: "xyz"
};
let Rvr = {
    name: "asd",
    country: "ads",
    age: 34
};
function sayHi(person) {
    if ("country" in person) {
        return { name: person.name, age: person.age, country: person.country, company: person.company };
    }
    else {
        return { name: person.name, age: person.age };
    }
}
function isAdmin(person) {
    return person.country !== undefined;
}
sayHi(Nick);
let a = [1, 2, 3, 4];
function maxNum(arr) {
    let maxNum = -99999999999;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] > maxNum) {
            maxNum = arr[i];
        }
    }
    return maxNum;
}
console.log(maxNum([12, 32, 14, 43, 23, 12, 44, 0]));
function inLegal(citizens) {
    return citizens.filter(citizen => citizen.age >= 18);
}
let citizens = [{ firstName: "sd", lastName: "asd", age: 23 }, { firstName: "asd", lastName: "asd", age: 2 }, { firstName: "sasdd", lastName: "asadsd", age: 18 }];
console.log(inLegal(citizens));
var Move;
(function (Move) {
    Move[Move["UP"] = 0] = "UP";
    Move[Move["LEFT"] = 1] = "LEFT";
    Move[Move["DOWN"] = 2] = "DOWN";
    Move[Move["RIGHT"] = 3] = "RIGHT";
})(Move || (Move = {}));
console.log(Move.UP);
function onArrowPress(pressedKey) {
    return pressedKey;
}
onArrowPress(Move.UP);
var StatusCodes;
(function (StatusCodes) {
    StatusCodes[StatusCodes["NotFound"] = 1] = "NotFound";
    StatusCodes[StatusCodes["ServerError"] = 500] = "ServerError";
    StatusCodes[StatusCodes["Created"] = 501] = "Created";
    StatusCodes["Success"] = "succes";
    StatusCodes["Redirect"] = "redirect";
})(StatusCodes || (StatusCodes = {}));
console.log(StatusCodes.Created);
