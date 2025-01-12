/////////////////////////////////////////////
// Standard's

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

/////////////////////////////////////////////
// Application's

import { XTSListSortItem, XTSObjectState } from './interfaces'
import { postRequestWithThunk } from './post-request'
import { setError, setLoading, setSucceeded } from './reducers-extra'

import { reducers } from './reducers-objects'
import { initialState_Objects } from './initial-states';

/////////////////////////////////////////////
// Begin

const searchFields: string[] = ['number', 'date', 'counterparty', 'comment']
const sortBy: XTSListSortItem[] = [{ key: 'date', descending: true }]
const initialState: XTSObjectState = initialState_Objects(searchFields, sortBy)

export const apiRequest = createAsyncThunk(
    'cashReceipts/apiRequest',
    (data: any, thunkAPI: any) => postRequestWithThunk(data, thunkAPI, sliceCashReceipt.actions)
)

const sliceCashReceipt = createSlice({
    name: 'cashReceipts',
    initialState,
    reducers,
    extraReducers(builder) {
        builder
            .addCase(apiRequest.pending, (state: XTSObjectState) => setLoading(state))
            .addCase(apiRequest.fulfilled, (state: XTSObjectState) => setSucceeded(state))
            .addCase(apiRequest.rejected, (state: XTSObjectState, action) => setError(state, action))
        // .addCase(sessionActions.signOut, (state: any) => state.objects.splice(0, state.objects.length))
    },
    // extra: extraData,
})

/////////////////////////////////////////////
// Export's

export default sliceCashReceipt.reducer
export const actions = sliceCashReceipt.actions
