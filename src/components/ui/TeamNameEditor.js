import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { useState } from 'react'
import CheckIcon from '../Icon/CheckIcon'
import PenIcon from '../Icon/PenIcon'
const TeamNameEditor = ({
    title,
    defaultTeamName,
    updateFunc
}) => {
    const [active, setActive] = useState(false)
    const [teamName, setTeamName] = useState('')
    const handleTeamName = () => {
        updateFunc(teamName)
        setActive(!active)
    }
    useEffect(() => {
        setTeamName(defaultTeamName)
    }, [])
    return (
        <>
            <div className="flex flex-col">
                <h6 className="text-[#FEA013] leading-normal font-medium">{title}</h6>
                <div className="flex items-center gap-x-3">
                    {!active && <h3 className="text-white leading-tight font-semibold">{teamName}</h3>}
                    {active &&
                        <input 
                            type='text' 
                            className=" bg-transparent text-[#F8F8F8]"
                            defaultValue={defaultTeamName}
                            onChange={(evt) => setTeamName(evt.target.value)}
                        />
                    }
                    <button onClick={() => handleTeamName()}>
                        {!active && <PenIcon />}
                        {active && <CheckIcon />}
                    </button>
                </div>
            </div>
        </>
    )
}

TeamNameEditor.prototype = {
    title: PropTypes.string.isRequired,
    defaultTeamName: PropTypes.string.isRequired,
    updateFunc: PropTypes.func
}

export default TeamNameEditor