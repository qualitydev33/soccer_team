import PropTypes from 'prop-types'
import { PlayerType } from '../../utils/types'
import {
    PlayerPosition
} from '../ui/Index'
const Pitch = ({
    cn,
    startPlayers,
    playersPos,
    activePlayer,
    changeActiveFun,
}) => {
    return (
        <>
            <div className={cn}>
                <svg className='w-full h-full' width="808" height="541" viewBox="0 0 808 541" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="808" height="541" rx="4" fill="#3AA94C"/>
                    <path opacity="0.7" fillRule="evenodd" clipRule="evenodd" d="M774.68 31.0555H33.3198V99.1833H178.78H179.78V100.183V441.819V442.819H178.78H33.3198V509.944H774.68L774.68 442.819H629.22H628.22V441.819V100.183V99.1833H629.22H774.68L774.68 31.0555ZM775.68 442.819V441.819V100.183V99.1833L775.68 31.0555V30.0555H774.68H33.3198H32.3198V31.0555V99.1833V100.183V193.357V194.357V347.644V348.644V441.819V442.819V509.944V510.944H33.3198H774.68H775.68V509.944L775.68 442.819ZM774.68 100.183H629.22V441.819H774.68L774.68 348.644H726.18H725.18V347.644V194.357V193.357H726.18H774.68L774.68 100.183ZM774.68 194.357V347.644H726.18V194.357H774.68ZM33.3198 441.819H178.78V100.183H33.3198V193.357H81.8198H82.8198V194.357V347.644V348.644H81.8198H33.3198V441.819ZM33.3198 347.644H81.8198V194.357H33.3198V347.644ZM402.99 188.354V34.063H403.99V188.348C403.993 188.348 403.997 188.348 404 188.348C449.74 188.348 486.82 225.129 486.82 270.5C486.82 315.871 449.74 352.652 404 352.652C403.997 352.652 403.993 352.652 403.99 352.652V506.922H402.99V352.646C357.715 352.109 321.18 315.537 321.18 270.5C321.18 225.463 357.715 188.891 402.99 188.354ZM402.99 189.354C358.26 189.891 322.18 226.023 322.18 270.5C322.18 314.977 358.26 351.109 402.99 351.646L402.99 189.354ZM403.99 189.348L403.99 351.652C403.993 351.652 403.997 351.652 404 351.652C449.196 351.652 485.82 315.311 485.82 270.5C485.82 225.689 449.196 189.348 404 189.348C403.997 189.348 403.993 189.348 403.99 189.348Z" fill="white" fillOpacity="0.7"/>
                    <rect width="808" height="541" rx="4" fill="url(#paint0_radial_13_840)"/>
                    <defs>
                    <radialGradient id="paint0_radial_13_840" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(404 270.5) rotate(90) scale(397.735 505.956)">
                    <stop stopColor="#3AA94C" stopOpacity="0"/>
                    <stop offset="0.541667" stopColor="#1B4D23" stopOpacity="0.42"/>
                    <stop offset="0.734375" stopColor="#0F2D14" stopOpacity="0.45"/>
                    <stop offset="1" stopOpacity="0.33"/>
                    </radialGradient>
                    </defs>
                </svg>
                {Object.values(startPlayers).map((item, idx) => {
                    return (
                        <div key={`start-${idx}`} className={`absolute ${playersPos[item.id]} w-[150px] min-w-[150px] flex justify-center`}>
                            <PlayerPosition
                                player={item}
                                activePlayer={activePlayer}
                                clickFun={(id) => {changeActiveFun(id)}}
                            />
                        </div>
                          
                    )
                })}
            </div>

        </>
    )
}

Pitch.prototype = {
    cn: PropTypes.string.isRequired,
    startPlayers: PropTypes.object.isRequired,
    playersPos: PropTypes.object.isRequired,
    activePlayer: PlayerType.isRequired,
    changeActiveFun: PropTypes.func.isRequired
}

export default Pitch