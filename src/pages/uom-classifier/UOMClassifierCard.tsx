/////////////////////////////////////////////
// Standard's

import { Form, Button, Space, Card, List } from 'antd'
import { SelectOutlined } from '@ant-design/icons'

/////////////////////////////////////////////
// Application's

// import { newItemValue, xtsObjectToFormData } from '../../data-exchange/common-use'
import { ITEM_VALUE_ACTIONS, XTSObjectCardProps } from '../../data-objects/types-components'
import { XTSUOMClassifier } from '../../data-objects/types-application'
import { createXTSObject } from '../../data-objects/common-use'

/////////////////////////////////////////////
// Object's

import './index.css'

/////////////////////////////////////////////
// Main component

// OK
const UOMClassifierCard: React.FC<XTSObjectCardProps> = (props) => {

    const { item } = props
    const formData = item as XTSUOMClassifier

    // const formData = xtsObjectToFormData(item)
    // console.log('props.choiceItemValue', props.choiceItemValue)
    // console.log('props', props)
    // console.log(formData)

    const doItem = (action: ITEM_VALUE_ACTIONS): void => {
        if (props.choiceItemValue) {
            const itemValue = createXTSObject('XTSItemValue')
            Object.assign(itemValue, item.objectId)
            itemValue.dataItem = item
            itemValue.action = action
            props.choiceItemValue(itemValue)
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

        <Card className='card-group' onClick={clickItem}>
            <div className='card-content' >
                <div>
                    <div>Tên gọi: {formData?.description}</div>
                    <div>Mã: {formData?.code}</div>
                </div>
                <Button
                    className='card-button'
                    onClick={choiceItem}
                    icon={<SelectOutlined />}
                >
                    {(props.itemName) && 'Chọn' || ''}
                </Button>
            </div>
        </Card>
    )
}

/////////////////////////////////////////////
// Export's

export default UOMClassifierCard