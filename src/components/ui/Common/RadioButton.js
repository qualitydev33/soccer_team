import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'

const RadioButton = ({
    label,
    defaultValue,
    name,
    changeFun
}) => {
    /**
     * variable
     */
    const [activeRadio, setActiveRadio] = useState(false)
    
    /**
     * method
     */
    const handleRadio = (v) => {
        setActiveRadio(v)
        changeFun({
            name: name,
            value: v
        })
    }

    /**
     * hooks
     */
    useEffect(() => {
        setActiveRadio(defaultValue)
    }, [])

    /**
     * render
     */
    return (
        <>
            <div className="flex flex-col gap-y-2 w-full cursor-pointer">
                <h5 className='text-c_text_5 font-medium'>{label}</h5>
                <div className='flex items-center gap-x-4'>
                    <button 
                        className='flex items-center gap-x-3'
                        onClick={() => {handleRadio(false)}}
                    >
                        <span className={`h-4 w-4 rounded-full ${!activeRadio ? 'border-c_primary_yellow border-4' : 'border-c_border border'}`}></span>
                        <h5 className='text-c_text_2 font-normal'>No</h5>
                    </button>
                    <button 
                        className='flex items-center gap-x-3'
                        onClick={() => {handleRadio(true)}}
                    >
                        <span className={`h-4 w-4 rounded-full ${activeRadio ? 'border-c_primary_yellow border-4' : 'border-c_border border'}`}></span>
                        <h5 className='text-c_text_2 font-normal'>Yes</h5>
                    </button>
                    
                </div>
                
            </div>
        </>
    )
}

RadioButton.prototype = {
    label: PropTypes.string.isRequired,
    defaultValue: PropTypes.bool,
    name: PropTypes.string.isRequired,
    changeFun: PropTypes.func.isRequired
}

export default RadioButton;