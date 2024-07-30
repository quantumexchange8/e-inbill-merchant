import { useEffect, useRef } from 'react'

export default ({
    type = 'text',
    name,
    value,
    min,
    className,
    autoComplete,
    required,
    isFocused,
    handleChange,
    withIcon = false,
    placeholder,
    cursorColor,
    hasError,
    size,
}) => {
    const input = useRef()

    useEffect(() => {
        if (isFocused) {
            input.current.focus()
        }
    }, [])

    const baseClasses = `bg-gray-50 hover:bg-white border-gray-50 text-gray-950 text-base rounded-[4px] shadow-sm`

    const inputStyle = {
        caretColor: cursorColor
    };
    
    const inputClassName = `${baseClasses} ${
        withIcon ? 'pl-11 pr-4' : 'px-4 py-2 text-md'
    } 
    ${className} 
    ${hasError ? 'border border-error-500 focus:ring-0 focus:outline-none' : 'focus:border-primary-50 focus:ring-[#EDF8FF] hover:border-gray-200'}
    ${size === 'lg' ? 'py-3 px-4' : 'py-2 px-4'}`;

    return (
        <input
            type={type}
            name={name}
            value={value}
            min={min}
            className={inputClassName}
            ref={input}
            autoComplete={autoComplete}
            required={required}
            onChange={(e) => handleChange(e)}
            placeholder={placeholder}
            style={inputStyle}
            size={size}
        />
    )
}