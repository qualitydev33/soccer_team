import { utilJsonClone } from "../utils/js-func"
import { TeamStatusForEntry } from "../utils/types"

export const serviceValidateStartPlayer = (playersPos) => {
    const playersPosArr = Object.values(playersPos)
    let result = {
        status: true,
        msg: ''
    }
    if (playersPosArr.length < 11) {
        result.status = false
        result.msg = TeamStatusForEntry[1]
    }
    if (playersPosArr.length > 11) {
        result.status = false
        result.msg = TeamStatusForEntry[2]
    }
    if (playersPosArr.length === 0) {
        result.status = false
        result.msg = TeamStatusForEntry[0]
    }
    return result
}

export const serviceAssignPlayerToFormation = (players, formationData) => {
    const formation = utilJsonClone(formationData)
    let startPlayers = Object.values(players).filter(item => item.starter === true)
    let playersPos = {}
    startPlayers.map(item => {
        if (item.position === 'Defender') {
            playersPos[item.id] = formation.defender[0]
            formation.defender.shift()
        }
        if (item.position === 'Midfielder') {
            playersPos[item.id] = formation.midfielder[0]
            formation.midfielder.shift()
        }
        if (item.position === 'Forward') {
            playersPos[item.id] = formation.forward[0]
            formation.forward.shift()
        }
    })
    return playersPos
}