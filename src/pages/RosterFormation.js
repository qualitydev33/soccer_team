import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import TeamNameEditor from "../components/ui/TeamNameEditor"
import { updateTeamName } from '../store/team/slice'
import Pitch from '../components/ui/Pitch'
import PlayerCard from '../components/ui/PlayerCard'
import { useEffect } from 'react'
import FormationModal from '../components/ui/FormationModal'
import LoadingSpinner from '../components/ui/LoadSpinner'
import { FORMATION_SYSTEM } from '../utils/constants'
import { utilJsonClone } from '../utils/js-func'
import { serviceAssignPlayerToFormation, serviceValidateStartPlayer } from '../service/service-func'

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

    useEffect(() => {
        const players = Object.values(teamStore).filter(item => item.starter === true)
        const posData = serviceAssignPlayerToFormation(players, FORMATION_SYSTEM['sys-4-3-3'])
        const isValid = serviceValidateStartPlayer(posData)
        if (isValid.status) {
            setStartPlayers(players)  
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

                    <div className="relative bg-c_neutral_2 w-full h-full p-8 rounded-lg flex flex-col flex-1">
                        <div className='w-full flex items-center gap-x-8'>
                            <Pitch 
                                cn="relative flex-1"
                                startPlayers={startPlayers}
                                playersPos={playersPos}
                            />
                            <div className='w-[322px] h-full'>
                                <PlayerCard player={activePlayer} />
                            </div>
                        </div>
                        
                    </div>
                </div>
            }
            
            {/* <span className='absolute top-[100px] left-[50px] text-lg text-green-500 z-50'>{JSON.stringify(activeFormationModal)}</span> */}

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