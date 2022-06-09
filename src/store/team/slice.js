import { createSlice } from '@reduxjs/toolkit'
import { WSTORAGE_KEY } from 'utils/constants'
import { utilCheckNull, utilGetWStorage, utilJsonClone, utilSetWStorage } from 'utils/js-func'

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
                data: JSON.parse(JSON.stringify(result))
            }
        },
        deletePlayerById: (state, action) => {
            let result = Object.assign({}, state.data)
            delete result[action.payload]
            return {
                ...state,
                data: JSON.parse(JSON.stringify(result))
            }
        },
        resetTeamFromWStorage: (state) => {
            let result = utilGetWStorage(WSTORAGE_KEY.team)
            if (utilCheckNull(result)) return {
                ...state,
                data: {}
            }
            else {
                return {
                    ...state,
                    data: JSON.parse(JSON.stringify(result))
                }
            }
        },
    },
})

// Action creators are generated for each case reducer function
export const {
    initTeam,
    updateTeamName,
    updatePlayer,
    deletePlayerById,
    resetTeamFromWStorage
} = teamSlice.actions

export default teamSlice.reducer