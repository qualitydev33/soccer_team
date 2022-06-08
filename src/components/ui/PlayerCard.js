import { PlayerType } from "../../utils/types"

const PlayerCard = ({
    player
}) => {
    
    return (
        <>
            {Object.values(player).length > 0 && <div className="w-full p-6 flex flex-col gap-y-6 bg-c_neutral_1 rounded">
                <img className="w-[175px] mx-auto" src={player.player_image} alt="player-img" />
                <div className="flex items-center">
                    <div className="flex flex-1 flex-col gap-y-2">
                        <h6 className="text-c_text_2 font-normal">Height</h6>
                        <h5 className="text-c_text_1 font-medium">{player.height / 100} m</h5>
                    </div>
                    <div className="flex flex-1 flex-col gap-y-2">
                        <h6 className="text-c_text_2 font-normal">Weight</h6>
                        <h5 className="text-c_text_1 font-medium">{player.weight} kg</h5>
                    </div>
                    <div className="flex flex-1 flex-col gap-y-2">
                        <h6 className="text-c_text_2 font-normal">Nationality</h6>
                        <div className="flex items-center gap-x-2">
                            <img className="w-4 h-4 rounded-full border border-c_text_2" src={player.flag_image} alt="flag-img" />
                            <h5 className="text-c_text_1 font-medium">{player.height / 100}m</h5>
                        </div>
                        
                    </div>
                </div>
                <div className=" w-full h-px bg-c_border"></div>
                <div className="flex items-center">
                    <div className="flex flex-1 flex-col">
                        <h2 className="text-c_primary_yellow font-semibold">{player.appearances}</h2>
                        <h6 className="text-c_text_2 font-normal">Appearances</h6>
                    </div>
                    <div className="flex flex-1 flex-col">
                        <h2 className="text-c_primary_yellow font-semibold">{player.minutes_played}</h2>
                        <h6 className="text-c_text_2 font-normal">Minutes Played</h6>
                    </div>
                </div>
                <div className="flex items-center">
                    <div className="flex flex-1 flex-col">
                        <h2 className="text-c_primary_yellow font-semibold">{player.clean_sheets}</h2>
                        <h6 className="text-c_text_2 font-normal">Clean sheets</h6>
                    </div>
                    <div className="flex flex-1 flex-col">
                        <h2 className="text-c_primary_yellow font-semibold">{player.saves}</h2>
                        <h6 className="text-c_text_2 font-normal">Saves</h6>
                    </div>
                </div>
            </div>}

            {Object.values(player).length === 0 && 
                <div className="bg-c_neutral_1 rounded">
                    <div className=" w-full h-px bg-c_border"></div>
                </div>
            }
        </>
    )
}

PlayerCard.prototype = {
    player: PlayerType
}

export default PlayerCard