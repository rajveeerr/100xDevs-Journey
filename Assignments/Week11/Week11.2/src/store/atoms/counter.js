import { atom } from 'recoil'


export const counterAtom=atom({
    key: "count",//this should be unique for every atom, they just work as identifier
    default: 0
})