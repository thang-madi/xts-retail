

import {
    apiRequest as apiRequest_Session,
    actions as actions_Session,
} from './slice-session'

import {
    apiRequest as apiRequest_Current,
    actions as actions_Current,
} from './slice-current'

import {
    apiRequest as apiRequest_Report,
    actions as actions_Report,
} from './slice-report'

import {
    apiRequest as apiRequest_Customers,
    actions as actions_Customers,
} from './slice-customers'

import {
    apiRequest as apiRequest_MeasurementUnits,
    actions as actions_MeasurementUnits,
} from './slice-measurement-units'

import {
    apiRequest as apiRequest_Orders,
    actions as actions_Orders,
} from './slice-orders'

import {
    apiRequest as apiRequest_Products,
    actions as actions_Products,
} from './slice-products'

import {
    apiRequest as apiRequest_UOMClassifier,
    actions as actions_UOMClassifier,
} from './slice-uom-classifier'

import {
    apiRequest as apiRequest_Users,
    actions as actions_Users,
} from './slice-users'

import {
    apiRequest as apiRequest_Individuals,
    actions as actions_Individuals,
} from './slice-individuals'

import {
    apiRequest as apiRequest_Employees,
    actions as actions_Employees,
} from './slice-employees'

import {
    apiRequest as apiRequest_Carts,
    actions as actions_Carts,
} from './slice-carts'

// import { AsyncThunk, CaseReducerActions } from '@reduxjs/toolkit'

//
// import {
//     apiRequest as apiRequest_UserProfiles,
//     actions as actions_UserProfiles,
// } from './slice-user-profiles'

export interface XTSSlice {
    sliceName: string,
    apiRequest: any,
    actions: any
}

const xtsSlicesMapping = {

    XTSSession: {
        sliceName: 'session',
        apiRequest: apiRequest_Session,
        actions: actions_Session
    },

    XTSCurrent: {
        sliceName: 'current',
        apiRequest: apiRequest_Current,
        actions: actions_Current
    },

    XTSReport: {
        sliceName: 'report',
        apiRequest: apiRequest_Report,
        actions: actions_Report
    },

    XTSProduct: {
        sliceName: 'products',
        apiRequest: apiRequest_Products,
        actions: actions_Products
    },

    XTSCounterparty: {
        sliceName: 'customers',
        apiRequest: apiRequest_Customers,
        actions: actions_Customers
    },

    XTSOrder: {
        sliceName: 'orders',
        apiRequest: apiRequest_Orders,
        actions: actions_Orders
    },

    XTSUser: {
        sliceName: 'users',
        apiRequest: apiRequest_Users,
        actions: actions_Users
    },

    XTSUOMClassifier: {
        sliceName: 'uomClassifier',
        apiRequest: apiRequest_UOMClassifier,
        actions: actions_UOMClassifier
    },

    XTSMeasurementUnit: {
        sliceName: 'measurementUnits',
        apiRequest: apiRequest_MeasurementUnits,
        actions: actions_MeasurementUnits
    },

    XTSIndividual: {
        sliceName: 'individuals',
        apiRequest: apiRequest_Individuals,
        actions: actions_Individuals
    },

    XTSEmployee: {
        sliceName: 'employees',
        apiRequest: apiRequest_Employees,
        actions: actions_Employees
    },

    XTSCart: {
        sliceName: 'carts',
        apiRequest: apiRequest_Carts,
        actions: actions_Carts
    },
}

export function getXTSSlice(dataType: string): XTSSlice {
    const xtsSlices = (xtsSlicesMapping as { [key: string]: XTSSlice })
    return xtsSlices[dataType]
}

