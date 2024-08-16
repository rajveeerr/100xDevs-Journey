/*
  Implement a function `isPalindrome` which takes a string as argument and returns true/false as its result.
  Note: the input string is case-insensitive which means 'Nan' is a palindrom as 'N' and 'n' are considered case-insensitive.
*/

function isPalindrome(str) {
  let flag=0;
  str=str.toLowerCase();
  // str.replace(" ","");
  // for(let i=0;i=str.length;i++){
  //   if((str.charCodeAt(i)>=65&&str.charCodeAt(i)<=90)||(str.charCodeAt(i)>=97&&str.charCodeAt(i)<=122)||(str.charCodeAt(i)>=60&&str.charCodeAt(i)<=71)){
  //   }
  //   else{
  //     str=str.split(str[i]).join("");
  //   }
  // }
  // str=str.split(" ").join('');
  // str=str.split(",").join('');
  // str=str.split(".").join('');
  // str=str.split("?").join('');
  // str=str.split("!").join('');
  str=str.replace(/[^a-zA-Z]/g, '');
  for(let i=0;i<=str.length/2;i++){
    if(str[i]!=str[str.length-1-i]){
      flag=1;
      break;
    }
  }
  if(flag==1){
    return false;
  }
  else{
    return true;
  }
}

module.exports = isPalindrome;
