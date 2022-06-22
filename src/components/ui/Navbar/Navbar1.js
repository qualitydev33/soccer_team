import { useNavigate, useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Logo } from "components/Icon/Index"

const Navbar1 = ({
    routeList
}) => {
    const location = useLocation()
    const navigate = useNavigate()
    const handleLink = (link) => {
        navigate(link)
    }
    return (
        <>
            <div className=" bg-c_bg_1 w-[60px] h-screen flex flex-col pt-5 px-[10px]">
                <a href="/">
                    <Logo cn="mx-auto" />
                </a>
                <div className="mt-12 flex flex-col gap-y-11">
                    {routeList.map((item, idx) => {
                        return (
                            <div 
                                key={idx} 
                                className={`grid grid-cols-3 items-center justify-center cursor-pointer`}
                                onClick={() => {handleLink(item.link)}}
                            >
                                <div className={`bg-c_primary_yellow w-1 h-1 rounded-full ${item.link === location.pathname ? 'visible' : 'invisible'}`}></div>
                                {item.icon}
                            </div>
                        )                            
                    })}
                </div>
            </div>
        </>
    )
}

Navbar1.prototype = {
    routeList: PropTypes.shape({
        icon: PropTypes.element,
        link: PropTypes.string
    })
}

export default Navbar1