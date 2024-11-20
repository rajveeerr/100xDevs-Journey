import {atom, selector} from 'recoil'


// export const notificationCount=atom({
//     key:"notificationCount",
//     default: {
//         network: 0,
//         job: 0,
//         messages: 0
//     }
// })
//asyncronous data query
export const notificationCount=atom({
    key:"notificationCount",
    default: selector({//we can have asyncronous default values directly
        key: "fetchData",
        get: async()=>{
            await new Promise(fn=>setTimeout(fn,2000))//the component doesnt render until this data is fetched
            let response=await fetch("https://mocki.io/v1/5a1d9385-c7af-41bc-80f2-10c2a590afcb")
            let data=await response.json()
            return data
        }
    })
})//we cant directly do async operatioons in atom instead we create selector and call get fn to do the ascynchronous tasks

