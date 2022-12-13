import { PlayerType } from "utils/types"
import { LazyLoadImage } from 'react-lazy-load-image-component'

const PlayerCard = ({
    player
}) => {
    /**
     * render
     */
    return (
        <>
            {Object.values(player).length > 0 && 
                <div className="relative w-full p-6 flex flex-col bg-c_neutral_1 rounded">
                    <LazyLoadImage 
                        className="player-card-img w-[175px] mx-auto" 
                        src={player.player_image} 
                        alt={`player_img_${player.id}`} 
                        height={262}
                        width={175}
                    />
                    <h1 className="absolute top-6 left-7 text-[109px] leading-[100px] font-semibold text-c_text_6 text-opacity-50">{player.jersey_number}</h1>
                    <h1 className="absolute top-10 left-8 text-[41px] font-semibold text-c_primary_yellow">{player.jersey_number}</h1>
                    <div className="relative flex flex-col -mt-24">
                        <h2 className="text-c_text_5 font-medium">{player.player_name}</h2>
                        <h3 className="text-c_primary_yellow font-semibold">{player.position}</h3>
                    </div>
                    <div className="flex items-center gap-x-8 mt-6">
                        <div className="flex flex-col gap-y-2">
                            <h6 className="text-c_text_2 font-normal">Height</h6>
                            <h5 className="text_overflow_one_line text-c_text_1 font-medium">{player.height / 100} m</h5>
                        </div>
                        <div className="flex flex-col gap-y-2">
                            <h6 className="text-c_text_2 font-normal">Weight</h6>
                            <h5 className="text_overflow_one_line text-c_text_1 font-medium">{player.weight} kg</h5>
                        </div>
                        <div className="flex flex-col gap-y-2">
                            <h6 className="text-c_text_2 font-normal">Nationality</h6>
                            <div className="flex items-center gap-x-2">
                                <LazyLoadImage 
                                    className="rounded-full border border-c_text_2" 
                                    src={player.flag_image}
                                    width={16}
                                    height={16}
                                    alt="flag-img"
                                />
                                <h5 className="text_overflow_one_line text-c_text_1 font-medium">{player.nationality}</h5>
                            </div>
                            
                        </div>
                    </div>
                    <div className="w-full h-px bg-c_border my-6"></div>
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
                    <div className="flex items-center mt-4">
                        <div className="flex flex-1 flex-col">
                            <h2 className="text-c_primary_yellow font-semibold">{player.clean_sheets}</h2>
                            <h6 className="text-c_text_2 font-normal">Clean sheets</h6>
                        </div>
                        <div className="flex flex-1 flex-col">
                            <h2 className="text-c_primary_yellow font-semibold">{player.saves}</h2>
                            <h6 className="text-c_text_2 font-normal">Saves</h6>
                        </div>
                    </div>
                </div>
            }

            {Object.values(player).length === 0 && 
                <div className="h-full flex flex-col p-6 bg-c_neutral_1 rounded">
                    <div className="h-3/4 w-full"></div>
                    <div className="w-full h-px bg-c_border"></div>
                    <div className="flex-1 w-full"></div>
                </div>
            }
        </>
    )
}

PlayerCard.prototype = {
    player: PlayerType
}

export default PlayerCard