import PropTypes from "prop-types";

export const TeamStatusForEntry = ['NO_DATA', 'NOT_ENOUGH_STARTER', 'TOO_MANY_STARTER']
export const PLAYER_POSITIONS = ["Goalkeeper", "Defender", "Midfielder", "Forward"]

export const PlayerType = PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    player_name: PropTypes.string.isRequired,
    player_image: PropTypes.string.isRequired,
    jersey_number: PropTypes.string.isRequired,
    position: PropTypes.oneOf(PLAYER_POSITIONS),
    height: PropTypes.number,
    weight: PropTypes.number,
    nationality: PropTypes.string,
    flag_image: PropTypes.string,
    starter: PropTypes.bool,
    appearances: PropTypes.number,
    minutes_played: PropTypes.number,
    goals: PropTypes.number,
    assists: PropTypes.number,
    clean_sheets: PropTypes.number,
    saves: PropTypes.number
})