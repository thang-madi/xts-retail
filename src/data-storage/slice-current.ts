/////////////////////////////////////////////
// Standard's

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

/////////////////////////////////////////////
// Application's

import { XTSCurrentState } from './interfaces'
import { postRequestWithThunk } from "./post-request"
import { setError, setLoading, setSucceeded } from "./reducers-extra"

import { reducers } from './reducers-current'
import { initialState_Current } from "./initial-states"

/////////////////////////////////////////////
// Begin

const initialState: XTSCurrentState = initialState_Current()

export const apiRequest = createAsyncThunk(
    'current/apiRequest',                                                           // current         
    (data: any, thunkAPI) => postRequestWithThunk(data, thunkAPI, sliceCurrentData.actions)       // sliceCurrentData
)

const sliceCurrentData = createSlice({                                              // sliceCurrentData
    name: 'current',                                                                // current
    initialState,
    reducers,
    extraReducers(builder) {
        builder
            .addCase(apiRequest.pending, (state: any) => setLoading(state))
            .addCase(apiRequest.fulfilled, (state: any) => setSucceeded(state))
            .addCase(apiRequest.rejected, (state: any, action) => setError(state, action))
    },
    // extra: extraData,
})

/////////////////////////////////////////////
// Export's

export default sliceCurrentData.reducer                                                 // sliceCurrentData
export const actions = sliceCurrentData.actions
