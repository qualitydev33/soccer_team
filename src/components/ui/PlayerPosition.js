import PropTypes from 'prop-types'
import { PlayerType } from '../../utils/types'
const PlayerPosition = ({
    cn,
    player,
}) => {
    return (
        <>
            <div className={`${cn} flex flex-col gap-y-1`}>
                <button className={`w-8 h-8 mx-auto flex items-center justify-center rounded-full bg-c_neutral_2 border border-c_text_2`}>
                    <h4 className='text-c_text_1 font-semibold'>{player.jersey_number}</h4>
                </button>
                <h5 className='text-c_text_1'>{player.player_name}</h5>
            </div>
        </>
    )
}

PlayerPosition.prototype = {
    cn: PropTypes.string,
    player: PlayerType
}

export default PlayerPosition