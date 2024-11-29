export let saveData=(setter,passedData)=>{
    setter(currentData=>({...currentData,...passedData}))
}