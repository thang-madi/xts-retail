/////////////////////////////////////////////
// Standard's

import { ReactNode, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { Drawer, Modal } from 'antd'

/////////////////////////////////////////////
// Application's

// import { actions } from '../data-storage/slice-current'
import { ITEM_VALUE_ACTIONS, XTSChoicePageProps, XTSObjectEditProps, XTSObjectViewProps } from '../../data-objects/types-components'
import { XTSItemValue } from '../../data-objects/types-form'
import { createXTSObject } from '../../data-objects/common-use'

import CustomersPage from '../../pages/customer'
import OrdersPage from '../../pages/order'
import ProductsPage from '../../pages/product'
import UOMClassifierPage from '../../pages/uom-classifier'
import EmployeesPage from '../../pages/employee'
import StructuralUnitsPage from '../../pages/structural-unit'

// import CashReceiptPage from '../../pages/cash-receipt'
// import PaymentReceiptPage from '../../pages/payment-receipt'
// import SalesInvoicePage from '../../pages/sales-invoice'
// import SupplierInvoicePage from '../../pages/supplier-invoice'

/////////////////////////////////////////////
// Object's

import './index.css'
import { XTSObject, XTSObjectId } from '../../data-objects/types-common'
import RelatedIndexPage from './RelatedIndex'
// import { XTSCashReceipt } from '../../data-objects/types-application'

import OrderViewPage from '../../pages/order/ObjectView'
import OrderEditPage from '../../pages/order/ObjectEdit'
import OrderListPage from '../../pages/order/ObjectList'

import SalesInvoiceViewPage from '../../pages/sales-invoice/ObjectView'
import SalesInvoiceEditPage from '../../pages/sales-invoice/ObjectEdit'
import SalesInvoiceListPage from '../../pages/sales-invoice/ObjectList'

import SupplierInvoiceViewPage from '../../pages/supplier-invoice/ObjectView'
import SupplierInvoiceEditPage from '../../pages/supplier-invoice/ObjectEdit'
import SupplierInvoiceListPage from '../../pages/supplier-invoice/ObjectList'

// import CashReceiptViewPage from '../../pages/cash-receipt/ObjectView'
// import CashReceiptEditPage from '../../pages/cash-receipt/ObjectEdit'
// import CashReceiptListPage from '../../pages/cash-receipt/ObjectList'

// import CashPaymentViewPage from '../../pages/cash-payment/ObjectView'
// import CashPaymentEditPage from '../../pages/cash-payment/ObjectEdit'
// import CashPaymentListPage from '../../pages/cash-payment/ObjectList'

// import PaymentReceiptViewPage from '../../pages/payment-receipt/ObjectView'
// import PaymentReceiptEditPage from '../../pages/payment-receipt/ObjectEdit'
// import PaymentReceiptListPage from '../../pages/payment-receipt/ObjectList'

// import PaymentExpenseViewPage from '../../pages/payment-expense/ObjectView'
// import PaymentExpenseEditPage from '../../pages/payment-expense/ObjectEdit'
// import PaymentExpenseListPage from '../../pages/payment-expense/ObjectList'

/////////////////////////////////////////////
// Main's

export interface XTSRelatedPageProps {
    objectId: XTSObjectId
    dataObject?: XTSObject
    title: string
    open: boolean
    pageName: string
    choiceItemValue: (itemValue: XTSItemValue) => void
}



// OK
const RelatedPage: React.FC<XTSRelatedPageProps> = (props) => {

    // const navigate = useNavigate()
    const { objectId } = props
    const [renderKey, setRenderKey] = useState(0)
    // const [itemValue, setItemValue] = useState<XTSItemValue>(createXTSObject('XTSItemValue', { action: ITEM_VALUE_ACTIONS.LIST }))

    const closeRelatedPage = () => {
        const itemValue = createXTSObject('XTSItemValue', { dataType: objectId.dataType, action: ITEM_VALUE_ACTIONS.ESCAPE })
        props.choiceItemValue(itemValue)
    }

    const choiceItemValue = (itemValue: XTSItemValue) => {
        props.choiceItemValue(itemValue)
    }

    useEffect(() => {
        if (props.open) {
            setRenderKey(prevValue => prevValue + 1)
        }
    }, [props.open])

    // console.log('props.dataObject', props.dataObject)

    /////////////////////////////////////////////
    // 

    return (
        <Drawer
            className='related-modal-page'
            title={props.title}
            open={props.open}
            width='100%'
            onClose={closeRelatedPage}
        >
            <RelatedIndexPage
                // pageId={pageId}
                objectId={objectId}
                dataObject={props.dataObject}
                choiceItemValue={choiceItemValue}
                // stepBack={stepBack}
                renderKey={renderKey}
            />
        </Drawer >
    )
}

export default RelatedPage
