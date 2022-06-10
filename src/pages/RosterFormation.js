import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import {
    TeamNameEditor,
    Pitch,
    PlayerCard,
    FormationModal,
} from 'components/ui/Index'
import {
    LoadingSpinner
} from 'components/ui/Common/Index'
import { updateTeamName } from 'store/team/slice'
import { FORMATION_SYSTEM } from 'utils/constants'
import { utilArrToObj, utilJsonClone } from 'utils/js-func'
import { TeamStatusForEntry } from 'utils/types'


function serviceValidateStartPlayer(playersPos) {
    const playersPosArr = Object.values(playersPos)
    let result = {
        status: true,
        msg: ''
    }
    if (playersPosArr.length < 11) {
        result.status = false
        result.msg = TeamStatusForEntry[1]
    }
    if (playersPosArr.length > 11) {
        result.status = false
        result.msg = TeamStatusForEntry[2]
    }
    if (playersPosArr.length === 0) {
        result.status = false
        result.msg = TeamStatusForEntry[0]
    }
    return result
}

function serviceAssignPlayerToFormation(players, formationData) {
    const formation = utilJsonClone(formationData)
    let startPlayers = Object.values(players).filter(item => item.starter === true)
    let playersPos = {}
    startPlayers.map(item => {
        if (item.position === 'Defender') {
            playersPos[item.id] = formation.defender[0]
            formation.defender.shift()
        }
        if (item.position === 'Midfielder') {
            playersPos[item.id] = formation.midfielder[0]
            formation.midfielder.shift()
        }
        if (item.position === 'Forward') {
            playersPos[item.id] = formation.forward[0]
            formation.forward.shift()
        }
        if (item.position === 'Goalkeeper') {
            playersPos[item.id] = formation.goalkeeper[0]
            formation.goalkeeper.shift()
        }
    })
    return playersPos
}

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
                                    cn="player-pitch relative flex-1 rounded bg-no-repeat bg-center bg-cover bg-center"
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