

import CustomerIndexPage from '../pages/customer'
import CustomerViewPage from '../pages/customer/ObjectView'
import CustomerEditPage from '../pages/customer/ObjectEdit'
import CustomerListPage from '../pages/customer/ObjectList'

import EmployeeIndexPage from '../pages/employee'
import EmployeeViewPage from '../pages/employee/ObjectView'
import EmployeeEditPage from '../pages/employee/ObjectEdit'
import EmployeeListPage from '../pages/employee/ObjectList'

import ProductIndexPage from '../pages/product'
import ProductViewPage from '../pages/product/ObjectView'
import ProductEditPage from '../pages/product/ObjectEdit'
import ProductListPage from '../pages/product/ObjectList'

import StructuralUnitIndexPage from '../pages/structural-unit'
import StructuralUnitViewPage from '../pages/structural-unit/ObjectView'
import StructuralUnitEditPage from '../pages/structural-unit/ObjectEdit'
import StructuralUnitListPage from '../pages/structural-unit/ObjectList'

// import ProductCharacteristicIndexPage from '../pages/product-characteristic'
// import ProductCharacteristicViewPage from '../pages/product-characteristic/ObjectView'
// import ProductCharacteristicEditPage from '../pages/product-characteristic/ObjectEdit'
// import ProductCharacteristicListPage from '../pages/product-characteristic/ObjectList'

// import UOMClassifierIndexPage from '../pages/uom-classifier'
// import UOMClassifierViewPage from '../pages/uom-classifier/ObjectView'
// import UOMClassifierEditPage from '../pages/uom-classifier/ObjectEdit'
// import UOMClassifierListPage from '../pages/uom-classifier/ObjectList'

import OrderIndexPage from '../pages/order'
import OrderViewPage from '../pages/order/ObjectView'
import OrderEditPage from '../pages/order/ObjectEdit'
import OrderListPage from '../pages/order/ObjectList'

import SalesInvoiceIndexPage from '../pages/sales-invoice'
import SalesInvoiceViewPage from '../pages/sales-invoice/ObjectView'
import SalesInvoiceEditPage from '../pages/sales-invoice/ObjectEdit'
import SalesInvoiceListPage from '../pages/sales-invoice/ObjectList'

import SupplierInvoiceIndexPage from '../pages/supplier-invoice'
import SupplierInvoiceViewPage from '../pages/supplier-invoice/ObjectView'
import SupplierInvoiceEditPage from '../pages/supplier-invoice/ObjectEdit'
import SupplierInvoiceListPage from '../pages/supplier-invoice/ObjectList'
import { XTSObjectEditProps, XTSObjectViewProps } from '../data-objects/types-components'

// import CashReceiptIndexPage from '../pages/cash-receipt'
// import CashReceiptViewPage from '../pages/cash-receipt/ObjectView'
// import CashReceiptEditPage from '../pages/cash-receipt/ObjectEdit'
// import CashReceiptListPage from '../pages/cash-receipt/ObjectList'

// import CashPaymentsPage '../pages/cash-payment'
// import CashPaymentViewPage from '../pages/cash-payment/ObjectView'
// import CashPaymentEditPage from '../pages/cash-payment/ObjectEdit'
// import CashPaymentListPage from '../pages/cash-payment/ObjectList'

// import PaymentReceiptIndexPage from '../pages/payment-receipt'
// import PaymentReceiptViewPage from '../pages/payment-receipt/ObjectView'
// import PaymentReceiptEditPage from '../pages/payment-receipt/ObjectEdit'
// import PaymentReceiptListPage from '../pages/payment-receipt/ObjectList'

// import PaymentExpenseIndexPage from '../pages/payment-expense'
// import PaymentExpenseViewPage from '../pages/payment-expense/ObjectView'
// import PaymentExpenseEditPage from '../pages/payment-expense/ObjectEdit'
// import PaymentExpenseListPage from '../pages/payment-expense/ObjectList'

enum PAGE_TYPES {
    INDEX = 'IndexPage',
    EDIT = 'EditPage',
    VIEW = 'ViewPage',
    LIST = 'ListPage',
}

function getPage(dataType: string, pageType: PAGE_TYPES): React.FC {

    const mapPages: { [key: string]: any } = {
        XTSOrder: {
            IndexPage: OrderViewPage,
            ViewPage: OrderViewPage,
            EditPage: OrderEditPage,
            listPage: OrderListPage,
        },
        XTSSalesInvoice: {
            IndexPage: SalesInvoiceIndexPage,
            ViewPage: SalesInvoiceViewPage,
            EditPage: SalesInvoiceEditPage,
            ListPage: SalesInvoiceListPage,
        },
        XTSSupplierInvoice: {
            IndexPage: SupplierInvoiceIndexPage,
            ViewPage: SupplierInvoiceViewPage,
            EditPage: SupplierInvoiceEditPage,
            ListPage: SupplierInvoiceListPage,
        },
        // XTSCashReceipt: {
        //     IndexPage: CashReciptIndexPage,
        //     ViewPage: CashReciptViewPage,
        //     EditPage: CashReceiptEditPage,
        //     ListPage: OrderListPage,
        // },
        // XTSPaymentReceipt: {
        //     IndexPage: PaymentReceiptIndexPage,
        //     ViewPage: PaymentReceiptViewPage,
        //     EditPage: PaymentReceiptEditPage,
        //     ListPage: OrderListPage,
        // },
        // XTSCashPayment: {
        //     IndexPage: CashPaymentIndexPage,
        //     ViewPage: CashPaymentViewPage,
        //     EditPage: CashPaymentEditPage,
        //     ListPage: OrderListPage,
        // },
        // XTSPaymentExpense: {
        //     IndexPage: PaymentExpenseIndexPage,
        //     ViewPage: PaymentExpenseViewPage,
        //     EditPage: PaymentExpenseEditPage,
        //     ListPage: OrderListPage,
        // },
    }

    return mapPages[dataType][pageType]
}

//
export function getViewPage(dataType: string): React.FC<XTSObjectViewProps> {
    return getPage(dataType, PAGE_TYPES.VIEW)
}

//
export function getEditPage(dataType: string): React.FC<XTSObjectEditProps> {
    return getPage(dataType, PAGE_TYPES.EDIT)
}
