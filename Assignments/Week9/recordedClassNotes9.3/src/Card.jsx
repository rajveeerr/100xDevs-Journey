
export function Card(props){

    let style={width: "300px", gap: "1rem", height: "max-content",display: "flex", flexDirection: "column", borderRadius: "20px", padding: "25px", backgroundColor: "#fff"}
    //style is an object we pass in as curley braces
    // we cant wrute background-color without quotes, either enclose them in quotes or capatilise the letter just after -
    return(
        <div style={style}>
        <div style={{display: "flex", gap: "10px"}}>
            <img src={props.imgUrl} style={{width: "50px", height: "50px", borderRadius: "200px"}}></img>
            <div style={{display: "flex", flexDirection: "column"}}>
            <p style={{fontSize: "1.3rem",margin: "0", fontWeight: "700"}}>{props.title}</p>
            <p style={{fontSize: ".7rem",margin: "0", fontWeight: "300"}}>{props.subTitle}</p>
            {props.time&&<p style={{fontSize: ".7rem",margin: "0", fontWeight: "300"}}><img style={{width: "8px"}} src="https://cdn-icons-png.flaticon.com/512/826/826165.png"></img>  {props.time}</p>/*this is conditional rendering*/}
            </div>{/*this is conditional rendering, can be doe using ternary operator too*/}
        </div>
        <div>
            {props.postImg&&<img src={props.postImg} style={{width: "100%",borderRadius: "12px"}}></img>}
            <p style={{fontSize:".9rem",fontWeight:500}}>{props.content}</p>
        </div>
        </div>
    )
}
  


  // function Card({title,subtitle,imgUrl,postContent}){//instead of using props parameters can be received like this as well
// passing of parameters will remain the same
//   return(
//       <h1>title</h1>//dont need to use props here
//     )
// }