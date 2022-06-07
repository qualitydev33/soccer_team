import React, { useState } from "react"
import PropTypes from 'prop-types'
import ClickOutside from "./ClickOutSide/ClickOutside"
import ChevronDownIcon from "../Icon/ChevronDownIcon"
import { useEffect } from "react"




const SelectInput = ({
    label,
    name,
    options,
    defaultVal,
    clickFun
}) => {
    const [activeSelect, setActiveSelect] = useState(false)
    const [activeValue, setActiveValue] = useState('')
    const handleSelect = (v) => {
        setActiveValue(v)
        setActiveSelect(false)
        clickFun({
            name: name,
            value: v
        })
    }
    useEffect(() => {
        setActiveValue(defaultVal)
    }, [])
    return <ClickOutside active={activeSelect} onClick={() => setActiveSelect(false)}>
                <div className="flex flex-col gap-y-2">
                    <h5 className="text-[#FFFFFF] font-medium">{label}</h5>
                    <div className="relative">
                        <button 
                            className="flex justify-start items-center h-11 w-full px-2 text-xs rounded-lg bg-transparent text-[#F8F8F8] border-[#494949] border"
                            onClick={() => setActiveSelect(!activeSelect)}
                        >{activeValue}</button>
                        <span className="absolute top-1/2 right-2 -translate-x-1/2">
                            <ChevronDownIcon />
                        </span>

                        {activeSelect && <ul className="absolute top-12 w-full box-shadow rounded-lg">
                            {options.map((item, idx) => {
                                return(
                                    <li 
                                        key={`option_${idx}`} 
                                        className={`p-2 cursor-pointer bg-[#383838]`}
                                        onClick={() => handleSelect(item)}
                                    >
                                        <h5 className="text-[#F8F8F8]">{item}</h5>
                                    </li>
                                )
                            })}
                        </ul>}
                    </div>
                </div>
            </ClickOutside>

            
}

SelectInput.prototype = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    defaultVal: PropTypes.string,
    clickFun: PropTypes.func
}

export default React.memo(SelectInput)