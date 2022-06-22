import PropTypes from 'prop-types';
import { useState, useRef } from 'react';
import { CloseIcon } from 'components/Icon/Index';
import ClickOutside from 'components/ui/ClickOutSide/ClickOutside';


const ActionList = ({
    actionBtn,
    title,
    list,
}) => {
    const [activeList, setActiveList] = useState(false)
    const [isUp, setIsUp] = useState(false)
    const actionBtnRef = useRef(null)
    const handleActionList = () => {
        const bodyHeight = document.querySelector('body').getBoundingClientRect().bottom
        const actionBtnRefPosY = actionBtnRef.current.getBoundingClientRect().bottom
        if (actionBtnRefPosY > bodyHeight - 230) {
            setIsUp(true)
        }else {
            setIsUp(false)
        }
        setActiveList(true)
    }
    return (
        <>
            <ClickOutside 
                active={activeList} 
                onClick={() => setActiveList(false)}
            >
                <div>
                    <button
                        ref={actionBtnRef}
                        onClick={() => {handleActionList()}}>
                        {actionBtn}
                    </button>
                    {activeList && 
                        <div className='relative'>
                            <div 
                                className={`${isUp ? 'bottom-7' : 'top-0'} absolute  right-1 z-10 min-w-[237px] bg-c_neutral_2 box-shadow rounded-lg px-4 pt-4 pb-8 flex flex-col gap-y-6`}
                            >
                                <div className='flex items-center justify-between'>
                                    <h3 className='text-c_text_1 font-semibold'>{title}</h3>
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
                                            className="flex items-center gap-x-3 text-c_text_2"
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
                        </div>
                    }
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