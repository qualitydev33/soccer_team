import { useState } from "react"
import { useNavigate } from 'react-router-dom'
import HugIcon from "../Icon/HugIcon"
import Logo from "../Icon/Logo"
import TeamIcon from "../Icon/Team"
import RoutesData from "../../data/routes.json"

const LeftSide = () => {
    const [activeTab, setActiveTab] = useState(0)
    const navigate = useNavigate()
    const handleLink = (idx, link) => {
        setActiveTab(idx)
        navigate(link)
    }
    return (
        <>
            <div className=" bg-[#111111] w-[60px] h-screen flex flex-col pt-5 px-[10px]">
                <Logo cn="mx-auto" />
                <div className="mt-12 flex flex-col gap-y-11">
                    {RoutesData.map((item, idx) => {
                        return (
                            <div 
                                key={idx} 
                                className={`grid grid-cols-3 items-center justify-center cursor-pointer`}
                                onClick={() => {handleLink(idx, item.link)}}
                            >
                                <div className={`bg-[#FEA013] w-1 h-1 rounded-full ${activeTab === idx ? 'visible' : 'invisible'}`}></div>
                                <HugIcon 
                                    color={activeTab === idx ? '#FEA013' : '#69563A'} />
                            </div>
                        )                            
                    })}
                </div>
            </div>
        </>
    )
}

export default LeftSide