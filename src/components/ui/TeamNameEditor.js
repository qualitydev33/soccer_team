import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'
import {
    CheckIcon,
    PenIcon
} from '../Icon'


const TeamNameEditor = ({
    title,
    defaultTeamName,
    updateFunc
}) => {
    const [active, setActive] = useState(false)
    const [teamName, setTeamName] = useState(defaultTeamName)
    const handleTeamName = () => {
        updateFunc({...teamName, changed: true})
        setActive(!active)
    }
    useEffect(() => {
        setTeamName(defaultTeamName)
    }, [])
    return (
        <>
            <div className="flex flex-col">
                <h6 className="text-c_primary_yellow leading-normal font-medium">{title}</h6>
                <div className="flex items-center gap-x-3 cursor-pointer group">
                    {!active && <h3 className="text-white leading-tight font-semibold">{teamName.value}</h3>}
                    {active &&
                        <input 
                            type='text' 
                            className="bg-transparent text-c_text_1"
                            defaultValue={defaultTeamName.value}
                            onChange={(evt) => setTeamName({...teamName, value: evt.target.value})}
                        />
                    }
                    <button className={`${active ? 'invisible' : `${defaultTeamName.changed ? 'invisible group-hover:visible' : 'visible'}`}`} onClick={() => handleTeamName()}>
                        <PenIcon />
                    </button>
                    <button className={`${!active ? 'invisible' : 'visible'}`} onClick={() => handleTeamName()}>
                        <CheckIcon />
                    </button>
                </div>
            </div>
        </>
    )
}

TeamNameEditor.prototype = {
    title: PropTypes.string.isRequired,
    defaultTeamName: PropTypes.shape({
        value: PropTypes.string,
        changed: PropTypes.bool
    }),
    updateFunc: PropTypes.func
}

export default TeamNameEditor