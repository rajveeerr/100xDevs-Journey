export default function Input({placeholder,type,onChange}){
    return <>
    <input type={type} onChange={onChange} placeholder={placeholder} className='text-base px-3 py-3 w-full rounded-xl bg-gradient-to-b border-2
     border-mariner-600 from-mariner-700-500/[0.4] to-mariner-800/[0.8] text-mariner-50 placeholder:text-mariner-200 
     placeholder:opacity-60'></input>
    </>
}