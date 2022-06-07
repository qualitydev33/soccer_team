import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { useState } from 'react'

const RadioButton = ({
    label,
    defaultValue,
    changeFun
}) => {
    const [activeRadio, setActiveRadio] = useState(false)
    const handleRadio = (b) => {
        setActiveRadio(b)
        changeFun(b)
    }
    useEffect(() => {
        setActiveRadio(defaultValue)
    }, [])
    return (
        <>
            <div className="flex flex-col gap-y-2 w-full cursor-pointer">
                <h5 className='text-[#FFFFFF] font-medium'>{label}</h5>
                <div className='flex items-center gap-x-4'>
                    <button 
                        className='flex items-center gap-x-3'
                        onClick={() => {handleRadio(false)}}
                    >
                        <span className={`h-4 w-4 rounded-full ${!activeRadio ? 'border-[#FEA013] border-4' : 'border-[#494949] border'}`}></span>
                        <h5 className='text-[#CBCBCB] font-normal'>No</h5>
                    </button>
                    <button 
                        className='flex items-center gap-x-3'
                        onClick={() => {handleRadio(true)}}
                    >
                        <span className={`h-4 w-4 rounded-full ${activeRadio ? 'border-[#FEA013] border-4' : 'border-[#494949] border'}`}></span>
                        <h5 className='text-[#CBCBCB] font-normal'>Yes</h5>
                    </button>
                    
                </div>
                
            </div>
        </>
    )
}

RadioButton.prototype = {
    label: PropTypes.string.isRequired,
    defaultValue: PropTypes.bool,
    changeFun: PropTypes.func.isRequired
}

export default RadioButton;