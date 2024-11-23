import { useEffect, useRef, useState } from 'react'
import { atom, useRecoilState, useRecoilValue, useRecoilStateLoadable, atomFamily, selectorFamily } from 'recoil'
import '../ChatComponent.css'
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css';

let geminiApi=import.meta.env.VITE_GEMINI_API;
  

export default function ChatSection(){

  return <div className='chat-section'>
    <Heading/>
    <ChatArea/>
    <Input/>
  </div>
}

function Heading(){
  return <div className='chat-component-heading'>
    <h3><i class="fa-solid fa-robot"></i>10xAnswers</h3>
  </div>
}

function scrollToBottom(element){
  element.scrollTop=element.scrollHeight
}

function handleCopy(){
  navigator.clipboard.writeText(currentAnswer.contents.answer);   
}

function ChatArea(){
  let [chatHistory,setChatHistory]=useRecoilState(allChats)//[{question: id,answer: id},]
  let chatArea=useRef();
  
  useEffect(()=>{
    scrollToBottom(chatArea.current)
  },[chatHistory])
  
  return <div className='chat-area' ref={chatArea}>
    <Online/>
    <HeroIntro/>
    {chatHistory.map((history,index)=>{
      return(<><Question key={index} id={history.question}/><Chat id={history.answer} key={index} questionId={history.question}/></>)
    })}
  </div>
}

function Question(props){
  let botIcon='./logoImg.jpg'
  let [currentQuestion,setQuestion]=useRecoilState(questionFamily(props.id))
  let [editing,setEditing]=useState(false)
  let questionArea=useRef()

  function handleEdit(){
    questionArea.current.contentEditable="true"
    questionArea.current.classList.add("editing")
    setEditing(editing=>!editing)
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
    // setQuestion(q=>({...q,question:questionArea.current.value}))
  }

  return <div className='question-container'><div className='question'>
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
  let [currentAnswer,setAnswer]=useRecoilStateLoadable(answerFamily({id:props.id,question:askedQuestion.question}))
  //source of this id is input component, its first passing it to chatarea component and then here
  
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
    <p className='chat-content'><ReactMarkdown rehypePlugins={[rehypeHighlight]}>{currentAnswer.contents.answer}</ReactMarkdown></p>
  
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
    <h1 className='hero-title'>1OxAnswers</h1>
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
      console.log(historyPrompts);
      
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
  let id=useRef(1);
  let [currentQuestion,setQuestion]=useRecoilState(questionFamily(id.current))
  let [chatHistory,setChatHistory]=useRecoilState(allChats);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      submitBtn.current.classList.add("disabled")
      if(inputElement.current.value!=""){
        setQuestion(q=>({...q,question: inputElement.current.value}))
        setChatHistory(history=>[...history,{question:id.current,answer:id.current}])
        id.current+=1;
        inputElement.current.value="";
      }
    }
  } 
  function handleSubmit(){
    if(inputElement.current.value!=""){
      setQuestion(q=>({...q,question: inputElement.current.value}))
      setChatHistory(history=>[...history,{question:id.current,answer:id.current}])
      id.current+=1;
      inputElement.current.value="";
      submitBtn.current.classList.add("disabled")
    }
}

  return <div className='input-area'>
    <textarea ref={inputElement} onKeyUp={(e)=>{(e.target.value!="")?submitBtn.current.classList.remove("disabled"):null}} onKeyDown={handleKeyDown} placeholder='Ask or search anything and press Enter' className='prompt-input'></textarea>
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
// HIGH PRIORITY=> fix bugs: prolly about the ids assigning
// make it persistant
// npm-package out of ot
// THE MAIN THING: Figure out why would anyone use it??? S omething sarchamesic?? Some responses that are not provided by anyone
// figure out why extra re-rendering
// cleanify the code 
// if possible try removing all chats after the edited one
// can shift to groq