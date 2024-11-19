import { temperatureAtom } from "../atoms/temperature"
import { selector } from "recoil"


export const temperatureSelector=selector({
    key: "Fahrenheit",
    get: ({get})=>{
        return (9/5*get(temperatureAtom)+32)
    },
    set: ({set},newValue)=>{
        set(temperatureAtom,5/9*(newValue)-32)
    }
})//deriving value from celsius atom and converting it to fahrenheit
//the set key basically sets the value of the source atom key if a setter is called on it, and then derives its value from it