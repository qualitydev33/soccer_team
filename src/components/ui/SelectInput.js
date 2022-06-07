import React, { useState } from "react"
import PropTypes from 'prop-types'
import ClickOutside from "./ClickOutSide/ClickOutside"
import ChevronDownIcon from "../Icon/ChevronDownIcon"




const SelectInput = ({
    label,
    options
}) => {
    const [activeSelect, setActiveSelect] = useState(false)
    
    return <ClickOutside active={activeSelect} onClick={() => setActiveSelect(false)}>
                <div className="flex flex-col gap-y-2">
                    <h5 className="text-[#FFFFFF] font-medium">{label}</h5>
                    <div className="relative">
                        <button 
                            className="h-11 w-full px-2 py-4 text-xs rounded-lg bg-transparent text-[#F8F8F8] border-[#494949] border"
                            onClick={() => setActiveSelect(!activeSelect)}
                        ></button>
                        <span className="absolute top-1/2 right-2 -translate-x-1/2">
                            <ChevronDownIcon />
                        </span>
                    </div>

                    <div>
                        {options.map((item, idx) => {
                            return(
                                <div key={`option_${idx}`} className={``}>

                                </div>
                            )
                        })}
                    </div>
                    
                </div>
            </ClickOutside>

            
}

SelectInput.prototype = {
    label: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,

}

export default React.memo(SelectInput)