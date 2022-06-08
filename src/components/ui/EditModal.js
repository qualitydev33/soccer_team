import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'

import { PlayerType } from '../../utils/types'
import CloseIcon from '../Icon/CloseIcon'
import Button from './Button'
import Input from './Input'
import RadioButton from './RadioButton'
import SelectInput from './SelectInput'
import tableData from '../../data/table.json'
import { updatePlayer } from '../../store/team/slice'

const EditModal = ({
    player,
    closeFun,
}) => {
    const dispatch = useDispatch()
    const [activePlayer, setActivePlayer] = useState({})
    const [submitDisabled, setSubmitDisabled] = useState(true)
    const handleActivePlayer = (obj) => {
        setActivePlayer({...activePlayer, [obj.name]: obj.value})
    }
    const handleSubmit = () => {
        console.log("activePlayer=", activePlayer)
        dispatch(updatePlayer(activePlayer))
        closeFun()
    }
    useEffect(() => {
        if (JSON.stringify(activePlayer) !== JSON.stringify(player)) setSubmitDisabled(false)
        
    }, [activePlayer])
    useEffect(() => {
        setActivePlayer(player)
    }, [])
    return (
        <>  
            <div className="absolute top-0 left-0 w-screen h-screen flex bg-black bg-opacity-60">
                <div className="w-auto m-auto max-h-[600px] min-w-[480px] p-6 flex flex-col gap-y-6 bg-c_bg_2 rounded-lg">
                    <div className='flex items-center justify-between'>
                        <h3 className='text-c_text_1 font-semibold'>Edit Player</h3>
                        <button onClick={closeFun}>
                            <CloseIcon />
                        </button>
                    </div>
                    <div className='flex flex-col gap-y-4'>
                        <div className='flex items-center gap-x-3'>
                            <Input
                                type="text" 
                                label="Player Name"
                                name="player_name" 
                                defaultValue={activePlayer.player_name}
                                changeFun={handleActivePlayer}
                            />
                            <Input
                                type="number" 
                                label="Jersey Number" 
                                name="jersey_number"
                                defaultValue={activePlayer.jersey_number}
                                changeFun={handleActivePlayer}
                            />
                        </div>
                        <div className='flex items-center gap-x-3'>
                            <Input
                                type="number" 
                                label="Height"
                                name="height"
                                defaultValue={activePlayer.height}
                                changeFun={handleActivePlayer}
                            />
                            <Input 
                                type="number"
                                label="Weight" 
                                name="weight"
                                defaultValue={activePlayer.weight}
                                changeFun={handleActivePlayer}
                            />
                        </div>
                        <Input 
                            type="text"
                            label="Nationality" 
                            name="nationality"
                            defaultValue={activePlayer.nationality}
                            changeFun={handleActivePlayer}
                        />
                        <SelectInput 
                            label='Position' 
                            defaultVal={player.position}
                            name="position"
                            options={tableData.PLAYER_POSITION}
                            clickFun={handleActivePlayer}
                        />
                        <RadioButton 
                            label="Starter"
                            name="starter"
                            defaultValue={activePlayer.starter} 
                            changeFun={handleActivePlayer}
                        />
                    </div>
                    <div className='flex justify-end'>
                        <Button 
                            type='warn' 
                            title="Edit Player"
                            disabled={submitDisabled}
                            clickFun={handleSubmit}
                        />
                    </div>
                    
                </div>
            </div>
        </>
    )
}

EditModal.prototype = {
    player: PlayerType,
    closeFun: PropTypes.func.isRequired
}

export default EditModal