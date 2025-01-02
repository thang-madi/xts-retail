/////////////////////////////////////////////
// Standard's

import { configureStore } from '@reduxjs/toolkit'

/////////////////////////////////////////////
// Object's

import reducerSession from './slice-session'
import reducerCurrentData from './slice-current'
import reducerReport from './slice-report'

import reducerProducts from './slice-products'
import reducerOrders from './slice-orders'
import reducerCustomers from './slice-customers'
import reducerUsers from './slice-users'
import reducerUOMClassifier from './slice-uom-classifier'
import reducerMeasurementUnits from './slice-measurement-units'
import reducerIndividuals from './slice-individuals'
import reducerEmployees from './slice-employees'
import reducerCarts from './slice-carts'

// import reducerUserProfiles from './slice-user-profiles'

/////////////////////////////////////////////
// Export's

const store = configureStore({
    reducer: {
        session: reducerSession,
        currentData: reducerCurrentData,
        report: reducerReport,

        products: reducerProducts,
        orders: reducerOrders,
        customers: reducerCustomers,
        users: reducerUsers,
        uomClassifier: reducerUOMClassifier,
        measurementUnits: reducerMeasurementUnits,
        individuals: reducerIndividuals,
        employees: reducerEmployees,

        carts: reducerCarts,

        // userProfiles: reducerUserProfiles,
    }
})

export default store

export type RootState = ReturnType<typeof store.getState>;

