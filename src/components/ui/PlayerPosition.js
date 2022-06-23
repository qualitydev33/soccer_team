import PropTypes from 'prop-types'
import { PlayerType } from 'utils/types'
const PlayerPosition = ({
    player,
    activePlayer,
    clickFun
}) => {
    /**
     * render
     */
    return (
        <>
            <div className={`flex flex-col gap-y-1`}>
                <button 
                    className={`w-8 h-8 mx-auto flex items-center justify-center rounded-full ${player.id === activePlayer.id ? 'bg-c_primary_yellow' : 'bg-c_neutral_2 border border-c_text_2'}`}
                    onClick={() => {clickFun(player.id)}}
                >
                    <h4 className='text-c_text_1 font-semibold'>{player.jersey_number}</h4>
                </button>
                <h5 className='text-c_text_1'>{player.player_name}</h5>
            </div>
        </>
    )
}

PlayerPosition.prototype = {
    player: PlayerType.isRequired,
    activePlayer: PlayerType.isRequired,
    clickFun: PropTypes.func.isRequired
}

export default PlayerPosition