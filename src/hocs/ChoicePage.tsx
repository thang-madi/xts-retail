/////////////////////////////////////////////
// Standard's

import { ReactNode, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { Drawer, Modal } from 'antd'

/////////////////////////////////////////////
// Application's

// import { actions } from '../data-storage/slice-current'
import { ITEM_VALUE_ACTIONS, XTSChoicePageProps } from '../data-objects/types-components'
import { XTSItemValue } from '../data-objects/types-form'
import { createXTSObject } from '../data-objects/common-use'

import CustomersPage from '../pages/customer'
import OrdersPage from '../pages/order'
import ProductsPage from '../pages/product'
import UOMClassifierPage from '../pages/uom-classifier'
import EmployeesPage from '../pages/employee'

/////////////////////////////////////////////
// Object's

import './ChoicePage.css'
import { TWA } from '../commons/telegram'

/////////////////////////////////////////////
// Main's

// OK
const getObjectPage = (dataType: string): React.FC<any> => {

    const mapPages: { [key: string]: React.FC } = {
        XTSCounterparty: CustomersPage,
        XTSOrder: OrdersPage,
        XTSProduct: ProductsPage,
        XTSUOMClassifier: UOMClassifierPage,
        XTSEmployee: EmployeesPage,

        // Thêm các trang nữa
        // ...
    }

    const result = mapPages[dataType] || <></>

    return result
}

// OK
const ChoicePage: React.FC<XTSChoicePageProps> = (props) => {

    const { modalProps, itemName, dataType } = props
    const [renderKey, setRenderKey] = useState(0)
    // console.log('ChoicePage.props', props)

    // const dispatch = useDispatch()

    // choiceItemValue
    // Hàm sự kiện để xử lý kết quả chọn giá trị ChoicePage vào Attribute của Form
    const choiceItemValue = (itemValue: XTSItemValue) => {
        // const { itemName } = itemValue
        // console.log('pageOwnerId', props)
        // dispatch(actions.setParams({ pageId: pageOwnerId }))
        // props.setPageInfo()
        props.choiceItemValue(itemValue)
    }

    const closeChoicePage = () => {
        const itemValue = createXTSObject('XTSItemValue', { itemName, dataType, action: ITEM_VALUE_ACTIONS.ESCAPE })
        props.choiceItemValue(itemValue)
    }

    const ObjectIndexPage = getObjectPage(dataType)

    useEffect(() => {
        if (modalProps.open) {
            setRenderKey(prevValue => prevValue + 1)
        }
    }, [modalProps.open])

    /////////////////////////////////////////////
    // 

    return (
        // <Modal
        //     // className={(TWA.platform === 'iOS') && 'modal-page' || 'modal-page-ios'}
        //     className='modal-page'
        //     {...modalProps}
        //     width='100%'
        //     // height='30vh'
        //     centered
        //     onCancel={closeChoicePage}
        // >
        //     <div className={(TWA.platform !== 'ios') && 'modal-page-index-page' || 'modal-page-index-page-ios'} >
        //         <ObjectIndexPage
        //             itemName={itemName}
        //             choiceItemValue={choiceItemValue}
        //             renderKey={renderKey}
        //         />
        //     </div>
        // </Modal >

        <Drawer
            className='modal-page'
            {...modalProps}
            width='100%'
            onClose={closeChoicePage}
        >
            {/* <div className={(TWA.platform !== 'ios') && 'modal-page-index-page' || 'modal-page-index-page-ios'} > */}
            <div className='modal-page-index-page' >
                <ObjectIndexPage
                    itemName={itemName}
                    choiceItemValue={choiceItemValue}
                    renderKey={renderKey}
                />
            </div>
        </Drawer >
    )
}

export default ChoicePage
