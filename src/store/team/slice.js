import { createSlice } from '@reduxjs/toolkit'

export const teamSlice = createSlice({
    name: 'team',
    initialState: {
        data: [],
    },
    reducers: {
        initTeam: (state, action) => {
            state.data = action.payload
        },
        resetTeam: (state, action) => {
            state.data = action.payload
        }
    },
})

// Action creators are generated for each case reducer function
export const { initTeam, resetTeam } = teamSlice.actions

export default teamSlice.reducer