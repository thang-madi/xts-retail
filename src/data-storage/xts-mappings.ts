
/////////////////////////////////////////////
// Import's

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

import {
    apiRequest as apiRequest_StructuralUnit,
    actions as actions_StructuralUnit,
} from './slice-structural-unit'

import {
    apiRequest as apiRequest_CashReceipt,
    actions as actions_CashReceipt,
} from './slice-cash-receipt'

import {
    apiRequest as apiRequest_PaymentReceipt,
    actions as actions_PaymentReceipt,
} from './slice-payment-receipt'

import {
    apiRequest as apiRequest_SalesInvoice,
    actions as actions_SalesInvoice,
} from './slice-sales-invoice'

import {
    apiRequest as apiRequest_SupplierInvoice,
    actions as actions_SupplierInvoice,
} from './slice-supplier-invoice'

/////////////////////////////////////////////
// Export's

export interface XTSSlice {
    sliceName: string,
    apiRequest: any,
    actions: any
}

/////////////////////////////////////////////
// Main's

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

    XTSStructuralUnit: {
        sliceName: 'structuralUnit',
        apiRequest: apiRequest_StructuralUnit,
        actions: actions_StructuralUnit
    },

    XTSCashReceipt: {
        sliceName: 'cashReceipt',
        apiRequest: apiRequest_CashReceipt,
        actions: actions_CashReceipt
    },

    XTSPaymentReceipt: {
        sliceName: 'paymentReceipt',
        apiRequest: apiRequest_PaymentReceipt,
        actions: actions_PaymentReceipt
    },

    XTSSalesInvoice: {
        sliceName: 'salesInvoice',
        apiRequest: apiRequest_SalesInvoice,
        actions: actions_SalesInvoice
    },

    XTSSupplierInvoice: {
        sliceName: 'supplierInvoice',
        apiRequest: apiRequest_SupplierInvoice,
        actions: actions_SupplierInvoice
    },

}

export function getXTSSlice(dataType: string): XTSSlice {
    const xtsSlices = (xtsSlicesMapping as { [key: string]: XTSSlice })
    return xtsSlices[dataType]
}

