// Popular way to send backend request is axios not fetch as axios provides some extra features over fetch
const axios=require("axios");//external dependency, need to install axios to use it, vs fetch api is provided by browsers

// fetch as default sends get request
async function gettingData() {
        const result=await fetch("https://jsonplaceholder.typicode.com/todos/");//awaiting this bcz this returns a promise
        const actualResult = await result.json() 
        const textResult = await result.text()// if the response data is in text format
        console.log(actualResult[1].title);
        console.log(textResult);
}
async function postingData() {
        const result=await fetch("https://httpdump.app/dumps/56b9603c-254f-4223-ad06-f915fc463eb9",{
            method: "POST",
            headers: {
                authorization: "dsfds"
            },
            body: JSON.stringify({
                message: "dsfbhsdkd",
                id: 1
            })
        });
        const actualResult = await result.json();
        console.log(actualResult[1].title);
}

// gettingData();
// postingData();

//using axios(external library), axios also returns a promise
async function axiosData() {
    const response=await axios.get("https://jsonplaceholder.typicode.com/todos/");
    //axios is a smart library so it understands that the received data is json or text and parses it automatically we don't need to do it
    //in axios just use response.data() to get acess to data
    console.log(response.data[0].title); 
}
//sending post req in axios
async function axiospostData() {
    const response=await axios.post("https://httpdump.app/dumps/56b9603c-254f-4223-ad06-f915fc463eb9",
    {
        "id": "1",
        "msg": "this is body, it is passed as the second argument of the axios.post() method"
    },
    {//this third argument here is request config, it will be secong argument for get req
        // method: "POST", method can be give here as well we just have to remove them from top it'll look like axios({url:"", body: {},header: {}, method: "");
        headers: {
            "authorization": "this is header passed as value of the third argument(object) of the axios.post() method",
            "Content-type": "json"
        }
    });
    console.log(response.data); 
}

axiosData()
axiospostData()
