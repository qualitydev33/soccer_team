import { configureStore } from '@reduxjs/toolkit'
import teamReducer from './team/slice'

export default configureStore({
  reducer: {
    team: teamReducer
  },
})