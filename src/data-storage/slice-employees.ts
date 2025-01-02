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
// import { actions as sessionActions } from './slice-session'

/////////////////////////////////////////////
// Begin

const searchFields: string[] = ['description']
const sortBy: XTSListSortItem[] = [{ key: 'descriptiion', descending: false }]
const initialState: XTSObjectState = initialState_Objects(searchFields, sortBy)

export const apiRequest = createAsyncThunk(
    'employees/apiRequest',                         // employees
    (data: any, thunkAPI) => postRequestWithThunk(data, thunkAPI, sliceEmployees.actions)           // Employees
)

const sliceEmployees = createSlice({                // Employees
    name: 'employees',                              // employees
    initialState,
    reducers,
    extraReducers(builder) {
        builder
            .addCase(apiRequest.pending, (state: any) => setLoading(state))
            .addCase(apiRequest.fulfilled, (state: any) => setSucceeded(state))
            .addCase(apiRequest.rejected, (state: any, action) => setError(state, action))
        // .addCase(sessionActions.signOut, (state: any) => state.objects.splice(0, state.objects.length))
    },
    // extra: extraData,
})

/////////////////////////////////////////////
// Export's

export default sliceEmployees.reducer                   // Employees
export const actions = sliceEmployees.actions           // Employees
