export default function Button({disabled,onClick,type="ui",children, variant="ghost"}){

    // we can simply set the state of button disabled here if disabled is true
    // use clsx or clx for conditional rendering of the classes 

    // transition cannot be applied to display none, because css does not know on what property to apply changes

    //better approach for creating a sidebar would be, to not give width to the sidebar itself instead give width to
    // its element and andust that width based upon the state of navbar(open/closed) this state can be modigied on click
    // of a button or by reading screensizes
    return <>
        {type==="ui"&&<button disabled={disabled} className='disabled:cursor-not-allowed text-base px-3 py-3 w-full rounded-xl 
        bg-gradient-to-b from-mariner-700 to-mariner-800 text-mariner-50 hover:from-mariner-600 hover:to-mariner-700
        disabled:opacity-50 disabled:hover:from-mariner-700 disabled:hover:to-mariner-800 transition-all' 
         onClick={onClick}>{children}</button>}
        {type==="nav"&&<button disabled={disabled} className={`disabled:cursor-not-allowed px-[1rem] py-[.5rem] w-full rounded-[0.4rem] 
        ${variant==="ghost"?'bg-gradient-to-b from-nav-from to-nav-to text-mariner-50 hover:from-mariner-600 hover:to-mariner-700' : 'bg-white text-black'} text-[.875rem]
        disabled:opacity-50 disabled:hover:from-mariner-700 disabled:hover:to-mariner-800 transition-all`}
         onClick={onClick}>{children}</button>}
    </>
}