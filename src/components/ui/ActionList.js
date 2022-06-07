import PropTypes from 'prop-types';
import { useState } from 'react';
import CloseIcon from '../Icon/CloseIcon';
import ClickOutside from './ClickOutSide/ClickOutside';
const ActionList = ({
    actionBtn,
    title,
    list
}) => {
    const [activeList, setActiveList] = useState(false)
    return (
        <>
            <ClickOutside 
                active={activeList} 
                onClick={() => setActiveList(false)}
            >
                <div>
                    <button 
                        onClick={() => {setActiveList(true)}}>
                        {actionBtn}
                    </button>
                    {activeList && <div className='relative'>
                        <div className="absolute top-0 right-1 z-10 min-w-[237px] bg-[#2D2D2D] box-shadow rounded-lg px-4 pt-4 pb-8 flex flex-col gap-y-6">
                            <div className='flex items-center justify-between'>
                                <h3 className='text-[#F8F8F8] font-semibold'>{title}</h3>
                                <button 
                                    onClick={() => {setActiveList(false)}}>
                                    <CloseIcon />
                                </button>
                            </div>
                            {list.map((item, idx) => {
                                let action = item.action
                                return (
                                    <button 
                                        key={`${item.title}-${idx}`} 
                                        className="flex items-center gap-x-3 text-[#CBCBCB]"
                                        onClick={() => {
                                            setActiveList(false)
                                            action()
                                        }}
                                    >
                                        {item.icon}
                                        <h5 className='font-medium'>{item.title}</h5>
                                    </button>
                                )
                            })}
                        </div>
                    </div>}
                </div>
            </ClickOutside>
        </>
    )
}

ActionList.prototype = {
    actionBtn: PropTypes.element,
    title: PropTypes.string,
    list: PropTypes.arrayOf(
        PropTypes.shape({
            icon: PropTypes.element,
            title: PropTypes.string,
            action: PropTypes.func
        })
    )
}

export default ActionList