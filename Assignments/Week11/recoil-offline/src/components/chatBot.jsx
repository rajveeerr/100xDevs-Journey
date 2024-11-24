import { useEffect, useRef, useState } from 'react'
import { atom, useRecoilState, useSetRecoilState ,useRecoilValue, useRecoilStateLoadable, atomFamily, selectorFamily } from 'recoil'
import '../ChatComponent.css'
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css';
import remarkGfm from "remark-gfm";
import { v4 as uuidv4 } from 'uuid';
import { Rnd } from 'react-rnd';

let geminiApi=import.meta.env.VITE_GEMINI_API;
let botIcon='./logoImg.jpg'

export default function ChatSection(){
{/*<Rnd style={{zIndex:2}}>*/}
  return <div className='chat-section'>
    <Heading/>
    <ChatArea/>
    <Input/>
  </div>
  // </Rnd>
}

function Heading(){
  return <div className='chat-component-heading'>
    <h3><i class="fa-solid fa-robot"></i>10xAnswers</h3>
  </div>
}

function scrollToBottom(element){
  element.scrollTop=element.scrollHeight
}


function ChatArea(){
  let [chatHistory,setChatHistory]=useRecoilState(allChats)//[{question: id,answer: id},]
  let chatArea=useRef();
  console.log(chatHistory);
  
  useEffect(()=>{
    scrollToBottom(chatArea.current)
  },[chatHistory])
  
  return <div className='chat-area' ref={chatArea}>
    <Online/>
    <HeroIntro/>
    {/* {console.log(chatHistory)} */}
    
    {chatHistory.map((history,index)=>{
      return(<><Question key={index+history.question} id={history.question}/><Chat key={index} questionId={history.question}/></>)
    })}
  </div>
}

function Question(props){
  
  let [currentQuestion,setQuestion]=useRecoilState(questionFamily(props.id))
  // console.log(currentQuestion);
  
  let [editing,setEditing]=useState(false)
  let questionArea=useRef()
  let originalQuestion=useRef()
  
  function handleEdit(){
    questionArea.current.contentEditable="true"
    questionArea.current.classList.add("editing")
    setEditing(editing=>!editing)
    originalQuestion.current=questionArea.current.innerText
  }
  function handleSubmit(){
    questionArea.current.contentEditable="false"
    questionArea.current.classList.remove("editing")
    setEditing(editing=>!editing)
    
    setQuestion(q=>({...q,question:questionArea.current.innerText}))
  }
  function handleCancel(){
    questionArea.current.contentEditable="false"
    questionArea.current.classList.remove("editing")
    setEditing(editing=>!editing)
    
    questionArea.current.innerText=originalQuestion.current
  }
  
  return <div className='question-container'>
    <div className='question'>
      <span className='bot-icon'><img src={botIcon}></img></span>
      <p className='question-txt' ref={questionArea}>{currentQuestion.question}</p>
      {!editing&&<span className='edit-icon' onClick={handleEdit}><i class="fa-solid fa-pen"></i></span>}
    </div>
    {editing&&<div className='chat-options edit-options'>
        <span onClick={handleSubmit}  className='copy chat-option'><span className='copy-icon'><i class="fa-regular fa-clipboard"></i></span>Save</span>
        <span onClick={handleCancel} className='collection chat-option'><span className='collection-icon'><i class="fa-solid fa-xmark"></i></span>Cancel</span>
    </div>}
  </div>
}

function Chat(props){
  let askedQuestion=useRecoilValue(questionFamily(props.questionId))
  let answerId=useRef(uuidv4())//this id will be generated for every new chat when it will mount
  let [currentAnswer,setAnswer]=useRecoilStateLoadable(answerFamily({id:answerId.current,question:askedQuestion.question}))
  let [chatHistory,setChatHistory]=useRecoilState(allChats)
  
  useEffect(()=>{
    let updatedAnswerId=chatHistory.map(chat=> 
      chat.question===props.questionId?{ ...chat, answer: answerId}:chat
    );
    setChatHistory(updatedAnswerId)
  },[])
  // workflow=> question typed and enter is pressed from input element, this will generate an atom with an unique id which will update
  // everytime a question is entered, and the chat history is being updated with the question id, now chat area renders the chat 
  // history(which contains the question id and answer id) and renders the chat component and question component for those ids, now
  // question component simply fetch the value of atom from respective atomFamily using those ids to render them, chat coponent
  // generated a new answer id, for the question id and question received, and updated the chatHistory with the answer id mapped to
  // the respective question id, this change of chathistory array triggers the re-render of all the answer and chat components onscreen. 
  
  // edit-workflow=>
    
    function handleCopy(){
      navigator.clipboard.writeText(currentAnswer.contents.answer);   
    }
    
  if(currentAnswer.state==='loading'){

    return <div className='chat'>
    <div className='user-icon skeleton'>
      <div className='icon-placeholder'></div>
    </div>
    <div className='chat-and-options'>
      <p className='chat-content skeleton text-placeholder'></p>
      <div className='chat-options'>
        <span className='copy chat-option'><span className='copy-icon'></span></span>
        <span className='collection chat-option'><span className='collection-icon'></span></span>
      </div>
    </div>
    </div>
  }
  
  if(currentAnswer.state==='hasError'){
    return <div style={{display: "flex",justifyContent:"center"}}>
      <div className='error chat-option' style={{display:"flex",justifyContent:"center",width:"max-content"}}>Some Error Occured While Generating Response</div>
    </div>
  }
  
  return <div className='chat'>
    <div className='user-icon'><img src={currentAnswer.contents.userIcon}></img></div>
    <div className='chat-and-options'>
    <p className='chat-content'><ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>{currentAnswer.contents.answer}</ReactMarkdown></p>
  
      {/* <p className='chat-content'>{currentAnswer.contents.answer}</p> */}
      <div className='chat-options'>
        <span onClick={handleCopy}  className='copy chat-option'><span className='copy-icon'><i class="fa-regular fa-clipboard"></i></span>Copy</span>
        <span className='collection chat-option'><span className='collection-icon'><i class="fa-regular fa-bookmark"></i></span>Add to Collection</span>
      </div>
    </div>
  </div>
  }
function HeroIntro(){
  return<div className='hero-section'>
    {/* <h1 className='hero-sup-title'>SUPERPOWERED</h1> */}
    <div className='floating-icons'>
      <span className='icon forward forward-first'><i class="fa-solid fa-robot"></i></span>
      <span className='icon forward forward-second'><i class="fa-solid fa-comments-dollar"></i></span>
      <span className='icon backward backward-first'><i class="fa-regular fa-compass"></i></span>
      <span className='icon backward backward-second'><i class="fa-solid fa-sitemap"></i></span>
    </div>
    <h1 className='hero-title'><span className='stylize'>10x</span>Answers</h1>
    <h2 className='hero-sub-title'>Because your Questions should not be left un-answered.</h2>
    <span style={{background:"rgb(44 44 44)",padding:"0.3rem 1.1rem",borderRadius:"1.6rem",margin:"1rem"}}>
      <p className='hero-description'>Start Asking you Burning Questions</p>
    </span>
  </div>
}




let historyPrompts=[]

let answerFamily=atomFamily({
  key:"answerFamily",
  default: selectorFamily({
    key: "fetchAnswers",
    get: ({id,question})=>{
      historyPrompts.push(question)
      
      return async()=>{
        let url="https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key="+geminiApi;
        let response=await fetch(url,{
          method: "POST",
          body: JSON.stringify({
            "contents": [{
            "parts":[{"text": "You are a highly intelligent senior developer assisting the user with programming-related questions. Below is the context of the user's past queries and your responses, followed by the user's current question. Answer directly and intelligently.History of User Questions and Context:"+historyPrompts+" Current Question: "+question+" .Respond directly and concisely based on the history.If the history is empty that means this is the first question, keep that in mind, also dont let end user to know about this history thing.Send data in markdown format wherever required or necessary like code or something"}]
            }]
        })
        })
        let data=await response.json()
        return {
            id,
            question,
            userIcon:"logoImg2.jpg",
            answer:data.candidates[0].content.parts[0].text
        }
      }
    }
  })
})



let questionFamily=atomFamily({
  key:"questionFamily",
  default:(id)=>{
    return {
      id,
      question:"Ask whatever you want"
    }
  }
})


let allChats=atom({
  key:"allChat",
  default: []
})

function Input(){
  let inputElement=useRef()
  let submitBtn=useRef()
  // let id=useRef(1);
  let id=useRef(uuidv4());//this will keep changing when compounts mounts
  let setQuestion=useSetRecoilState(questionFamily(id.current))
  let [history,setChatHistory]=useRecoilState(allChats);
  //figure out why this code is breaking whe useSetRecoilState is used
  
  function handleKeyDown(event){
    inputElement.current.value.trim().length!=0?submitBtn.current.classList.remove("disabled"):submitBtn.current.classList.add("disabled")
    if (event.key === 'Enter') {
      event.preventDefault()
      if(inputElement.current.value.trim().length!=0){
        setQuestion(q=>({...q,question: inputElement.current.value}))
        setChatHistory(history=>[...history,{question:id.current,answer:null}])
        id.current=uuidv4();//changing the id
        inputElement.current.value="";
        submitBtn.current.classList.add("disabled")
      }
    }
  } 
  function handleSubmit(){
    if(inputElement.current.value!=""){
      setQuestion(q=>({...q,question: inputElement.current.value}))
      setChatHistory(history=>[...history,{question:id.current,answer:null}])
      id.current=uuidv4;
      inputElement.current.value="";
      submitBtn.current.classList.add("disabled")
    }
  }

  
  return <div className='input-area'>
    <textarea ref={inputElement} onKeyUp={handleKeyDown} placeholder='Ask or search anything and press Enter' className='prompt-input'></textarea>
    <span ref={submitBtn} onClick={handleSubmit} className='search-icon disabled' title="Send"><i class="fa-solid fa-square-arrow-up-right"></i></span>
    <InputOptions/>
  </div>
}

function InputOptions(){
  return <div className='input-options'>
      <div className='input-option'>
        <span className='input-option-icon'><i class="fa-regular fa-file"></i></span>
        <p className='option-description'>Browse Prompts</p>
      </div>
      <div className='input-option'>
      <span className='input-option-icon'><i class="fa-brands fa-soundcloud"></i></span>
      <p className='option-description'>No Brand Voice</p>
      </div>
    </div>
}

//hooks
function useOnline(){
  let [online,setOnline]=useState(navigator.onLine)
  useEffect(()=>{
    function updateStatus(){
      setOnline(navigator.onLine)
    }
    window.addEventListener("online",updateStatus)
    window.addEventListener("offline",updateStatus)

    return()=>{
      window.removeEventListener("online",updateStatus)
      window.removeEventListener("offline",updateStatus)
    }
  },[])
  
  return online
}

function Online(){
  let online=useOnline()
  let onlineLabelStyle={padding: "0.3rem 1.1rem",borderRadius:"1rem",backgroundColor:"#15161d",fontSize:".8rem",display:"flex",width:"max-content",justifyContents:"center",alignItems:"center",gap:"6px",color:"white",fontWeight:500}

  return <div style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
      {online&&<span style={onlineLabelStyle}><span style={{backgroundColor:"lightgreen",borderRadius:"100%",height:"8px",width:"8px",boxShadow:"0px 0px 216px 49px rgba(45,255,196,0.31)"}}></span>{online?"Online":"OffLine"}</span>}
      {!online&&<span style={onlineLabelStyle}><span style={{backgroundColor:"red",borderRadius:"100%",height:"8px",width:"8px",boxShadow:"0px 0px 216px 49px rgb(255 99 45 / 31%)"}}></span>{online?"Online":"OffLine"}</span>}
  </div>
}
// last streach: 
// HIGH PRIORITY=> fix bugs: prolly about the ids assigning - done
// make it persistant
// npm-package out of ot
// THE MAIN THING: Figure out why would anyone use it??? S omething sarchamesic?? Some responses that are not provided by anyone
// figure out why extra re-rendering
// cleanify the code 