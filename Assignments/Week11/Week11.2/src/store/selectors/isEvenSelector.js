import {selector} from 'recoil'
import { counterAtom } from '../atoms/counter'


export const evenSelector=selector({
    key: "evenSelector",
    get: ({get})=>{
        let counter=get(counterAtom);//evenSelector depends on the counterAtom
        return counter%2
    }
})//why this selector??, lets say we want to create a component that renders if the count is odd or even and instead of subscribing the
// component directly to the global atom we are creating a selector which is derived from global state, this minimises the number of 
// re-renders as this selector will not change if the counter is increased in pairs, as compared to subscribing to the global atom, 
// where the atom was frequently changing.


// along with get key there is also a set key in the selector, which allows us to update the atom from which the value is derived from
// in the selector, this comes in handy when setter is called on a selector, as the setter itself is derived from atom it cant be setted
// directly insted it updates the atom and then derive the updated value from it
// the syntax liiks like this:
// selector({
//     key: "",
//     set: ({set},newValue)=>{
//         set(counterAtom,newValue)}
// })