"use strict";
// const express=require("express")
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
let app = (0, express_1.default)();
const port = process.env.port;
app.listen(port, () => {
    console.log(`The server is running at port ${port}`);
});
