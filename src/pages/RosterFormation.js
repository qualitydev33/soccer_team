import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import TeamNameEditor from "../components/ui/TeamNameEditor"
import { updateTeamName } from '../store/team/slice'
import Pitch from '../components/ui/Pitch'
import PlayerCard from '../components/ui/PlayerCard'
import { useEffect } from 'react'

const RosterFormation = ({
    cn
}) => {
    const dispatch = useDispatch()
    const teamNameStore = useSelector(state => state.team.name)
    const teamStore = useSelector(state => state.team.data)
    const [activePlayer, setActivePlayer] = useState({})
    
    const handleTeamName = (str) => {
        dispatch(updateTeamName(str))
    }

    useEffect(() => {
        let randomActivePlayer = Object.values(teamStore).filter(item => item.starter === true && item.position === "Goalkeeper")
        setActivePlayer(randomActivePlayer[0])
    }, [])
    return (
        <>
            <div className={cn}>
                <div className="flex items-center">
                    <TeamNameEditor
                        title="Roster Detail"
                        defaultTeamName={teamNameStore}
                        updateFunc={handleTeamName}
                    />
                </div>

                <div className="relative bg-[#2D2D2D] w-full h-full p-8 rounded-lg flex flex-col flex-1">
                    <div className='w-full flex items-center gap-x-8'>
                        <div className='flex-1'>
                            <Pitch />
                        </div>
                        <div className='w-1/4 h-full'>
                            <PlayerCard player={activePlayer} />
                        </div>
                    </div>
                    
                </div>
            </div>
        </>
    )
}

RosterFormation.prototype = {
    cn: PropTypes.string
}

export default RosterFormation