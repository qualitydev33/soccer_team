import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import {
    Pitch,
    PlayerCard,
    FormationModal,
} from 'components/ui/Index'
import {
    LoadingSpinner
} from 'components/ui/Common/Index'
import { FORMATION_SYSTEM } from 'utils/constants'
import { utilArrToObj, utilJsonClone } from 'utils/js-func'
import { FORMATION_MODAL_STATUS, PLAYER_POSITIONS } from 'utils/constants'


function serviceValidateStartPlayer(playersPos) {
    const playersPosArr = Object.values(playersPos)
    let result = {
        status: true,
        msg: ''
    }
    if (playersPosArr.length < 11) {
        result.status = false
        result.msg = FORMATION_MODAL_STATUS.NOT_ENOUGH_STARTER.value
        return result
    }
    if (playersPosArr.length > 11) {
        result.status = false
        result.msg = FORMATION_MODAL_STATUS.TOO_MANY_STARTER.value
        return result
    }
    if (playersPosArr.length === 0) {
        result.status = false
        result.msg = FORMATION_MODAL_STATUS.NO_DATA.value
        return result
    }
    // Checking 4-3-3 system
    let numGoalKeeper = playersPosArr.filter(item => item.position === PLAYER_POSITIONS.goalkeeper).length
    let numDefender = playersPosArr.filter(item => item.position === PLAYER_POSITIONS.defender).length
    let numMidfielder = playersPosArr.filter(item => item.position === PLAYER_POSITIONS.midfielder).length
    let numForward = playersPosArr.filter(item => item.position === PLAYER_POSITIONS.forward).length
    const is_4_3_3 = numGoalKeeper === 1 && numDefender === 4 && numMidfielder === 3 && numForward === 3
    if (!is_4_3_3) {
        result.status = false
        result.msg = FORMATION_MODAL_STATUS.OTHER.value
        return result
    }
    return result
}

function serviceAssignPlayerToFormation(players, formationData) {
    const formation = utilJsonClone(formationData)
    let startPlayers = Object.values(players).filter(item => item.starter === true)
    let playersPos = {}
    startPlayers.map(item => {
        if (item.position === 'Defender') {
            playersPos[item.id] = {...item, posCSS: formation.defender[0]}
            formation.defender.shift()
        }
        if (item.position === 'Midfielder') {
            playersPos[item.id] = {...item, posCSS: formation.midfielder[0]}
            formation.midfielder.shift()
        }
        if (item.position === 'Forward') {
            playersPos[item.id] = {...item, posCSS: formation.forward[0]}
            formation.forward.shift()
        }
        if (item.position === 'Goalkeeper') {
            playersPos[item.id] = {...item, posCSS: formation.goalkeeper[0]}
            formation.goalkeeper.shift()
        }
    })
    return playersPos
}

const RosterFormation = ({
    cn
}) => {
    /**
     * variable
     */
    const teamStore = useSelector(state => state.team.data)
    const [loading, setLoading] = useState(true)
    const [activePlayer, setActivePlayer] = useState({})
    const [startPlayers, setStartPlayers] = useState({})
    const [playersPos, setPlayersPos] = useState({})
    const [activeFormationModal, setActiveFormationModal] = useState({active: false, type: null})
    
    /**
     * method
     */
    const handleChangeActivePlayer = (playerId) => {
        const player = startPlayers[playerId]
        setActivePlayer(player)
    }

    /**
     * hooks
     */
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

    /**
     * render
     */
    return (
        <>
            {loading &&
                <LoadingSpinner />
            }
            {!loading &&
                <>
                    <div className={cn}>
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

                    {activeFormationModal.active &&
                        <FormationModal
                            type={activeFormationModal.type}
                        />
                    }
                </>
            }
            
            
            
        </>
    )
}

RosterFormation.prototype = {
    cn: PropTypes.string
}

export default RosterFormation