export default function Input({refVar,placeholder,type,onChange,min,max,onBlur,required,defaultValue}){

    return <>
    <input ref={refVar} type={type} defaultValue={defaultValue} onChange={onChange} onBlur={onBlur} placeholder={placeholder} 
    min={min} required={required} max={max}  className='text-base px-3 py-3 w-full rounded-xl border-2 border-mariner-600 bg-transparent 
    bg-gradient-to-b from-mariner-700-500/[0.4] to-mariner-800/[0.8] text-mariner-50 placeholder:text-mariner-200 
    placeholder:opacity-60'></input>
    </>
}