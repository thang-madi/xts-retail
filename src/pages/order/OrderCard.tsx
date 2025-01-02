/////////////////////////////////////////////
// Standard's

import { useNavigate, useSearchParams } from 'react-router-dom'
import { Form, Button, Space, Card, List, Descriptions, Divider, Tag } from 'antd'

/////////////////////////////////////////////
// Application's

// import { setValue } from '../../data-storage/slice-current'
import { CheckOutlined, SelectOutlined } from '@ant-design/icons'
import { ITEM_VALUE_ACTIONS, XTSObjectCardProps } from '../../data-objects/types-components'
import { XTSOrder } from '../../data-objects/types-application'
import { createXTSObject } from '../../data-objects/common-use'
import OrderStateTag from './OrderStateTag'

/////////////////////////////////////////////
// Object's


/////////////////////////////////////////////
// Main component

// function OrderCard({ item, initialItemValue, setItemValue, choiceItemValue }) {
const OrderCard: React.FC<XTSObjectCardProps> = (props) => {

    const { item, itemName, additionals } = props
    const formData = item as XTSOrder

    // const clickItem = (e) => {
    //     if (setItemValue) {
    //         setItemValue(newItemValue({ ...initialItemValue, id: objectId.id }))
    //     }
    // }

    // const choiceItem = (e) => {
    //     e.stopPropagation()
    //     if (choiceItemValue) {
    //         const itemValue = {
    //             ...initialItemValue,
    //             id: objectId.id,
    //             presentation: objectId.presentation,
    //             dataType: objectId.dataType,
    //             dataItem: item,
    //         }
    //         choiceItemValue(itemValue)
    //     }
    // }

    const doItem = (action: ITEM_VALUE_ACTIONS): void => {
        if (props.choiceItemValue) {
            const itemValue = createXTSObject('XTSItemValue')
            Object.assign(itemValue, item.objectId)
            itemValue.dataItem = item
            itemValue.action = action
            itemValue.itemName = itemName
            props.choiceItemValue(itemValue)
            // console.log('clickItem.choiceItemValue', itemValue)
            // console.log('clickItem.choiceItemValue', choiceItemValue)
        }
    }

    const clickItem = (e: React.MouseEvent) => {
        e.stopPropagation()
        doItem(ITEM_VALUE_ACTIONS.VIEW)
    }

    const choiceItem = (e: React.MouseEvent) => {
        e.stopPropagation()
        doItem(ITEM_VALUE_ACTIONS.CHOICE)
    }

    return (
        <Card
            style={{ margin: 5 }}
            onClick={clickItem}
        >
            <div style={{ fontWeight: 'bold' }}>
                {formData.objectId.presentation
                    .replace('của khách', '')
                    .replace('(chưa kết chuyển)', '(nháp)')
                    .replace('Đơn hàng', 'Đơn hàng số')}
            </div>

            <Divider orientation='center' style={{ borderColor: 'lightgray', marginTop: '5px', marginBottom: '5px' }} />

            <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
                <div>Khách hàng: </div>
                <div>{formData.customer?.presentation}</div>
            </div>

            <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
                <div>Trạng thái đơn hàng: </div>
                <OrderStateTag value={formData.orderState?.presentation} />
            </div>

            <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
                <div>Tỷ lệ thanh toán: </div>
                <div>{'__ %'}</div>
            </div>

            <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
                <div>Tỷ lệ giao hàng: </div>
                <div>{'__ %'}</div>
            </div>

            <Divider orientation='center' style={{ borderColor: 'lightgray', marginTop: '5px', marginBottom: '5px' }} />

            <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
                <div>Số tiền đơn hàng: </div>
                <b>{formData.documentAmount?.toLocaleString('vi-VN')} đồng</b>
            </div>

            <Button
                htmlType='button'
                onClick={choiceItem}
                style={{ display: (props.itemName) && 'block' || 'none' }}
            >
                <SelectOutlined />Chọn
            </Button>

        </Card >
    )
}

/////////////////////////////////////////////
// Export's

export default OrderCard