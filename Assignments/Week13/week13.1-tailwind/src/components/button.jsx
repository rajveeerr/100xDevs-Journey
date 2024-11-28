export default function Button({disabled,onClick,type,children}){

    //we can simply set the state of button disabled here if disabled is true
    //use clsx or clx for conditional renddering of the classes 
    return <>
        <button disabled={disabled} className='disabled:opacity-50  disabled:cursor-not-allowed text-base px-3 py-3 w-full rounded-xl
         bg-sky-500 hover:bg-sky-700 bg-gradient-to-b from-mariner-700 to-mariner-800 text-mariner-50' 
         onClick={onClick}>{children}</button>
    </>
}