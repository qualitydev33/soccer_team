import { PlayerType } from "../../utils/types"

const PlayerCard = ({
    player
}) => {
    return (
        <>
            <div className="w-full p-6 flex flex-col gap-y-6 bg-[#222222] rounded">
                <img className="w-1/2 mx-auto" src={player.player_image} alt="player-img" />
                <div className="flex items-center">
                    <div className="flex flex-1 flex-col gap-y-2">
                        <h6 className="text-[#CBCBCB] font-normal">Height</h6>
                        <h5 className="text-[#F8F8F8] font-medium">{player.height / 100} m</h5>
                    </div>
                    <div className="flex flex-1 flex-col gap-y-2">
                        <h6 className="text-[#CBCBCB] font-normal">Weight</h6>
                        <h5 className="text-[#F8F8F8] font-medium">{player.weight} kg</h5>
                    </div>
                    <div className="flex flex-1 flex-col gap-y-2">
                        <h6 className="text-[#CBCBCB] font-normal">Nationality</h6>
                        <div className="flex items-center gap-x-2">
                            <img className="w-4 h-4 rounded-full border border-[#CBCBCB]" src={player.flag_image} alt="flag-img" />
                            <h5 className="text-[#F8F8F8] font-medium">{player.height / 100}m</h5>
                        </div>
                        
                    </div>
                </div>
                <div className=" w-full h-px bg-[#494949]"></div>
                <div className="flex items-center">
                    <div className="flex flex-1 flex-col">
                        <h2 className="text-[#FEA013] font-semibold">{player.appearances}</h2>
                        <h6 className="text-[#CBCBCB] font-normal">Appearances</h6>
                    </div>
                    <div className="flex flex-1 flex-col">
                        <h2 className="text-[#FEA013] font-semibold">{player.minutes_played}</h2>
                        <h6 className="text-[#CBCBCB] font-normal">Minutes Played</h6>
                    </div>
                </div>
                <div className="flex items-center">
                    <div className="flex flex-1 flex-col">
                        <h2 className="text-[#FEA013] font-semibold">{player.clean_sheets}</h2>
                        <h6 className="text-[#CBCBCB] font-normal">Clean sheets</h6>
                    </div>
                    <div className="flex flex-1 flex-col">
                        <h2 className="text-[#FEA013] font-semibold">{player.saves}</h2>
                        <h6 className="text-[#CBCBCB] font-normal">Saves</h6>
                    </div>
                </div>
            </div>
        </>
    )
}

PlayerCard.prototype = {
    player: PlayerType
}

export default PlayerCard