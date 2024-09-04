/*
 * Write a function that halts the JS thread (make it busy wait) for a given number of milliseconds.
 * During this time the thread should not be able to do anything else.
 * the function should return a promise just like before
 */

function sleep(milliseconds) {

    // function actualFn(resolve){
    //     start =new Date;
    //     while(true){
    //         end=new Date;
    //         num=0
    //         if(end-start<=milliseconds){
    //             num++;
    //         }
    //         else{
    //             resolve();
    //             break;
    //         }
    //     }
    // }
    // return new Promise(actualFn);

    return new Promise(resolve => { //same as above
        start =new Date;
        while(true){
            end=new Date;
            num=0
            if(end-start<=milliseconds){
                num++;
            }
            else{
                resolve();
                break;
            }
        }})

}

module.exports = sleep;
