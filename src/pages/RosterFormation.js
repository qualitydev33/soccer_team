import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import {
    TeamNameEditor,
    Pitch,
    PlayerCard,
    FormationModal,
} from '../components/ui/Index'
import {
    LoadingSpinner
} from '../components/ui/Common/Index'
import { updateTeamName } from '../store/team/slice'
import { FORMATION_SYSTEM } from '../utils/constants'
import { serviceAssignPlayerToFormation, serviceValidateStartPlayer } from '../service/service-func'
import { utilArrToObj } from '../utils/js-func'

const RosterFormation = ({
    cn
}) => {
    const dispatch = useDispatch()
    const teamNameStore = useSelector(state => state.team.name)
    const teamStore = useSelector(state => state.team.data)
    const [loading, setLoading] = useState(true)
    const [activePlayer, setActivePlayer] = useState({})
    const [startPlayers, setStartPlayers] = useState({})
    const [playersPos, setPlayersPos] = useState({})
    const [activeFormationModal, setActiveFormationModal] = useState({active: false, type: null})
    
    const handleTeamName = (obj) => {
        dispatch(updateTeamName(obj))
    }
    const handleChangeActivePlayer = (playerId) => {
        const player = startPlayers[playerId]
        setActivePlayer(player)
    }

    useEffect(() => {
        const players = Object.values(teamStore).filter(item => item.starter === true)
        const posData = serviceAssignPlayerToFormation(players, FORMATION_SYSTEM['sys-4-3-3'])
        const isValid = serviceValidateStartPlayer(posData)
        if (isValid.status) {
            setStartPlayers(utilArrToObj(players, 'id'))
            setPlayersPos(posData)
            const startGoalkeeper = Object.values(teamStore).filter(item => item.starter === true && item.position === "Goalkeeper")
            setActivePlayer(startGoalkeeper[0])
        }else {
            setActiveFormationModal({...activeFormationModal, active: true, type: isValid.msg})
        }
        setTimeout(() => {
            setLoading(false)    
        }, 500);
    }, [])
    return (
        <>
            {loading &&
                <LoadingSpinner />
            }
            {!loading &&
                <div className={cn}>
                    <div className="flex items-center">
                        <TeamNameEditor
                            title="Roster Detail"
                            defaultTeamName={teamNameStore}
                            updateFunc={handleTeamName}
                        />
                    </div>

                    <div className='relative h-full'>
                        <div className="absolute inset-0 bg-c_neutral_2 w-full h-full p-8 rounded-lg flex flex-col flex-1">
                            <div className='w-full h-full flex gap-x-8'>
                                <Pitch 
                                    cn="relative flex-1"
                                    startPlayers={startPlayers}
                                    playersPos={playersPos}
                                    activePlayer={activePlayer}
                                    changeActiveFun={(id) => handleChangeActivePlayer(id)}
                                />
                                <div className='w-[322px]'>
                                    <PlayerCard player={activePlayer} />
                                </div>
                            </div>
                            
                        </div>
                    </div>
                    
                </div>
            }
            
            
            {activeFormationModal.active &&
                <FormationModal
                    type={activeFormationModal.type}
                />
            }
        </>
    )
}

RosterFormation.prototype = {
    cn: PropTypes.string
}

export default RosterFormation