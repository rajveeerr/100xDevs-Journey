import { selector } from "recoil";
import { notificationCount } from "../atoms/notificationAtoms";


export const totalCount=selector({
    key: "totalCount",
    get: ({get})=>{
        const notifications=get(notificationCount)
        return notifications.job+notifications.messages+notifications.network
    }
})//just getting sum from all the atoms, this is derived from 4 atoms

