import PropTypes from 'prop-types'
import { PlayerType } from '../../utils/types'
import CloseIcon from '../Icon/CloseIcon'
import Button from './Button'
import Input from './Input'
import RadioButton from './RadioButton'
import SelectInput from './SelectInput'
import tableData from '../../data/table.json'
const EditModal = ({
    player,
    closeFun,
}) => {
    console.log(player)
    return (
        <>
            <div className="absolute top-0 left-0 w-screen h-screen flex bg-black bg-opacity-60">
                <div className="w-auto m-auto max-h-[600px] min-w-[480px] p-6 flex flex-col gap-y-6 bg-[#383838] rounded-lg">
                    <div className='flex items-center justify-between'>
                        <h3 className='text-[#F8F8F8] font-semibold'>Edit Player</h3>
                        <button onClick={closeFun}>
                            <CloseIcon />
                        </button>
                    </div>
                    <div className='flex flex-col gap-y-4'>
                        <div className='flex items-center gap-x-3'>
                            <Input label="Player Name" defaultValue={player.player_name} />
                            <Input label="Jersey Number" defaultValue={player.jersey_number} />
                        </div>
                        <div className='flex items-center gap-x-3'>
                            <Input label="Height" defaultValue={player.height} />
                            <Input label="Weight" defaultValue={player.weight} />
                        </div>
                        <Input label="Nationality" defaultValue={player.nationality} />
                        <SelectInput 
                            label='Position' 
                            options={tableData.PLAYER_POSITION} 
                        />
                        <RadioButton 
                            label="Starter" 
                            defaultValue={player.starter} 
                            changeFun={() => {}}
                        />
                    </div>
                    <div className='flex justify-end'>
                        <Button 
                            type='warn' 
                            title="Edit Player"
                            clickFun={() => {}}
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