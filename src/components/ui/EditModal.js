import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { motion } from 'framer-motion'
import { useDispatch } from 'react-redux'

import { NATIONALITY, PlayerType, PLAYER_POSITIONS } from 'utils/types'
import { CloseIcon } from 'components/Icon/Index'
import { 
    Button,
    Input,
    RadioButton,
    SelectInput,
    LoadingSpinner
} from 'components/ui/Common/Index'
import { updatePlayer } from 'store/team/slice'
import { utilCompareObject } from 'utils/js-func'

let originActivePlayer;

const EditModal = ({
    player,
    closeFun,
}) => {
    /**
     * variable
     */
    const aniVariant = {
        show: { opacity: 1 },
        hidden: { opacity: 0 }
    }
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true)
    const [activePlayer, setActivePlayer] = useState({})
    const [disabledSubmit, setDisabledSubmit] = useState(true)

    /**
     * method
     */
    const handleActivePlayer = (obj) => {
        let compareResult = utilCompareObject(originActivePlayer, {...activePlayer, [obj.name]: obj.value})
        setDisabledSubmit(compareResult)
        setActivePlayer({...activePlayer, [obj.name]: obj.value})
    }
    const handleSubmit = () => {
        dispatch(updatePlayer(activePlayer))
        closeFun()
    }

    /**
     * hooks
     */
    useEffect(() => {
        setActivePlayer(player)
        originActivePlayer = player
        setLoading(false)
    }, [])

    
    return (
        <>  
            {loading && <LoadingSpinner />}
            {!loading && <div className="absolute top-0 left-0 w-screen h-screen flex flex-col bg-black bg-opacity-60">
                <motion.div
                    className="w-auto m-auto max-h-[600px] min-w-[480px] p-6 flex flex-col gap-y-6 bg-c_bg_2 rounded-lg"
                    variants={aniVariant}
                    initial="hidden"
                    animate="show"    
                >
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
                        <SelectInput 
                            label='Nationality' 
                            defaultVal={player.nationality}
                            name="nationality"
                            options={NATIONALITY}
                            clickFun={handleActivePlayer}
                        />
                        <SelectInput 
                            label='Position' 
                            defaultVal={player.position}
                            name="position"
                            options={PLAYER_POSITIONS}
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
                            disabled={disabledSubmit}
                            clickFun={handleSubmit}
                        />
                    </div>
                    
                </motion.div>
            </div>}
        </>
    )
}

EditModal.prototype = {
    player: PlayerType,
    closeFun: PropTypes.func.isRequired
}

export default EditModal