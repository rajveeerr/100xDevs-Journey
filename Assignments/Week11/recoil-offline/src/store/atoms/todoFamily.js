import { atomFamily, selectorFamily } from "recoil";
import { allTodos } from "../todos.js";

// export const todoFamily=atomFamily({
//     key: "todoFamily",
//     default: (id)=>{
//         return allTodos.find(todo=>todo.id===id)
//     }//default value can be anything we want every atom to have
// })//this simply create multiple atoms while taking multiple ids as input
//todoFamily is a fn(returned by atomFamily) that returns an atom

export const todoFamily=atomFamily({
    key: "todoFamily",
    default: selectorFamily({//selectorFamily is needed here, if not used it will create a single selector and duplicate keys
        key: "todoFromBackend",
        get: (id)=>{//this has to be a fn thakes the input and returns another function doind the async call to be and displaying the data
            return async({get})=>{
                    let response=await fetch("https://mocki.io/v1/4a6352c4-3853-4604-879e-bfe2af52b30c")
                    let data=await response.json()    
                    return data["todo"].find(todo=>todo.id===id)
                }
        }
    }) 
})