import React, { useState, useEffect } from "react"
import PropTypes from 'prop-types'
import ClickOutside from "components/ui/ClickOutSide/ClickOutside"
import {
    ChevronDownIcon
} from "components/Icon/Index"




const SelectInput = ({
    label,
    name,
    options,
    defaultVal,
    maxHeight = 500,
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
                    <h5 className="text-c_text_5 font-medium">{label}</h5>
                    <div className="relative">
                        <button 
                            className="flex justify-start items-center h-11 w-full px-2 text-xs rounded-lg bg-transparent text-c_text_1 border-c_border border"
                            onClick={() => setActiveSelect(!activeSelect)}
                        >{activeValue}</button>
                        <span className="absolute top-1/2 right-2 -translate-x-1/2">
                            <ChevronDownIcon />
                        </span>

                        {activeSelect && <ul className={`absolute top-14 z-10 w-full box-shadow rounded-lg max-h-${maxHeight}px overflow-auto`}>
                            {options.map((item, idx) => {
                                return(
                                    <li 
                                        key={`option_${idx}`} 
                                        className={`p-2 cursor-pointer bg-c_bg_2`}
                                        onClick={() => handleSelect(item)}
                                    >
                                        <h5 className="text-c_text_1">{item}</h5>
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
    maxHeight: PropTypes.number,
    clickFun: PropTypes.func
}

export default React.memo(SelectInput)