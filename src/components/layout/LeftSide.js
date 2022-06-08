import { useState } from "react"
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import HugIcon from "../Icon/HugIcon"
import Logo from "../Icon/Logo"
import RoutesData from "../../data/routes.json"

const LeftSide = ({
    routeList
}) => {
    const [activeTab, setActiveTab] = useState(0)
    const navigate = useNavigate()
    const handleLink = (idx, link) => {
        setActiveTab(idx)
        navigate(link)
    }
    return (
        <>
            <div className=" bg-c_bg_1 w-[60px] h-screen flex flex-col pt-5 px-[10px]">
                <Logo cn="mx-auto" />
                <div className="mt-12 flex flex-col gap-y-11">
                    {routeList.map((item, idx) => {
                        return (
                            <div 
                                key={idx} 
                                className={`grid grid-cols-3 items-center justify-center cursor-pointer`}
                                onClick={() => {handleLink(idx, item.link)}}
                            >
                                <div className={`bg-c_primary_yellow w-1 h-1 rounded-full ${activeTab === idx ? 'visible' : 'invisible'}`}></div>
                                {item.icon}
                            </div>
                        )                            
                    })}
                </div>
            </div>
        </>
    )
}

LeftSide.prototype = {
    routeList: PropTypes.shape({
        icon: PropTypes.element,
        link: PropTypes.string
    })
}

export default LeftSide