/////////////////////////////////////////////
// Standard's

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

/////////////////////////////////////////////
// Application's

import { XTSListSortItem, XTSObjectState } from "./interfaces"
import { postRequestWithThunk } from "./post-request"
import { setError, setLoading, setSucceeded } from "./reducers-extra"

import { reducers } from "./reducers-objects"
import { initialState_Objects } from "./initial-states";

/////////////////////////////////////////////
// Begin

const searchFields: string[] = ['description']
const sortBy: XTSListSortItem[] = [{ key: 'descriptiion', descending: false }]
const initialState: XTSObjectState = initialState_Objects(searchFields, sortBy)

export const apiRequest = createAsyncThunk(
    'individuals/apiRequest',
    (data: any, thunkAPI) => postRequestWithThunk(data, thunkAPI, sliceIndividuals.actions)
)

const sliceIndividuals = createSlice({
    name: 'individuals',
    initialState,
    reducers,
    extraReducers(builder) {
        builder
            .addCase(apiRequest.pending, (state) => setLoading(state))
            .addCase(apiRequest.fulfilled, (state, action) => setSucceeded(state))
            .addCase(apiRequest.rejected, (state, action) => setError(state, action))

    },
    // extra: extraData,
})

/////////////////////////////////////////////
// Export's

export default sliceIndividuals.reducer
export const actions = sliceIndividuals.actions
