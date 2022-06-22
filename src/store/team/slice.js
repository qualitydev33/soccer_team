import { createSlice } from '@reduxjs/toolkit'
import { WSTORAGE_KEY } from 'utils/constants'
import {
    utilCheckNull,
    utilGetWStorage,
    utilJsonClone,
    utilSetWStorage,
    utilArrToObj
} from 'utils/js-func'


export const teamSlice = createSlice({
    name: 'team',
    initialState: {
        data: {},
        name: {
            value: 'My Team',
            changed: false
        },
    },
    reducers: {
        initTeam: (state, action) => {
            state.data = action.payload
            utilSetWStorage(WSTORAGE_KEY.team, action.payload)
        },
        updateTeamName: (state, action) => {
            utilSetWStorage(WSTORAGE_KEY.teamName, action.payload)
            return {
                ...state,
                name: {
                    value: action.payload.value,
                    changed: action.payload.changed
                }
            }
        },
        updatePlayer: (state, action) => {
            let result = utilJsonClone(state.data)
            result[action.payload.id] = action.payload
            utilSetWStorage(WSTORAGE_KEY.team, result)
            return {
                ...state,
                data: utilJsonClone(result)
            }
        },
        deletePlayerById: (state, action) => {
            let result = Object.assign({}, state.data)
            delete result[action.payload]
            return {
                ...state,
                data: utilJsonClone(result)
            }
        },
        resetTeamFromWStorage: (state) => {
            let team = utilGetWStorage(WSTORAGE_KEY.team)
            let teamName = utilGetWStorage(WSTORAGE_KEY.teamName)
            if (utilCheckNull(team)) return {
                ...state,
                data: {}
            }
            else {
                return {
                    ...state,
                    data: utilJsonClone(team),
                    name: utilJsonClone(teamName)
                }
            }
        },
        seachTeamByKey: (state, action) => {
            let data = utilGetWStorage(WSTORAGE_KEY.team)
            let searchKey = action.payload
            if (utilCheckNull(searchKey)) {
                return {
                    ...state,
                    data: data
                }
            } else {
                let filterResult = Object.values(data).filter(item => String(item.player_name).toLowerCase().includes(searchKey) || String(item.position).toLowerCase().includes(searchKey))
                let searchResult = utilArrToObj(filterResult, 'id')
                return {
                    ...state,
                    data: utilJsonClone(searchResult)
                }
            }

        }
    },
})

// Action creators are generated for each case reducer function
export const {
    initTeam,
    updateTeamName,
    updatePlayer,
    deletePlayerById,
    resetTeamFromWStorage,
    seachTeamByKey
} = teamSlice.actions

export default teamSlice.reducer