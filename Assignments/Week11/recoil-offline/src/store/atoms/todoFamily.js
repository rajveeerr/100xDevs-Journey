import { atomFamily } from "recoil";
import { allTodos } from "../todos.js";

export const todoFamily=atomFamily({
    key: "todoFamily",
    default: (id)=>{
        return allTodos.find(todo=>todo.id===id)
    }
})//this simply create multiple atoms while taking multiple ids as input
//todoFamily is a fn(returned by atomFamily) that returns an atom