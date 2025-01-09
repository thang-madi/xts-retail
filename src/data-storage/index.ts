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

import reducerStructuralUnit from './slice-structural-unit'
import reducerSalesInvoice from './slice-sales-invoice'
import reducerSupplierInvoice from './slice-supplier-invoice'
import reducerCashReceipt from './slice-cash-receipt'
import reducerPaymentReceipt from './slice-payment-receipt'

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

        structuralUnit: reducerStructuralUnit,
        salesInvoice: reducerSalesInvoice,
        supplierInvoice: reducerSupplierInvoice,
        cashReceipt: reducerCashReceipt,
        paymentReceipt: reducerPaymentReceipt,

        // userProfiles: reducerUserProfiles,
    }
})

export default store

export type RootState = ReturnType<typeof store.getState>;

