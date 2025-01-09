/////////////////////////////////////////////
// Standard's

import { useEffect, useState } from 'react'
import { useParams, useNavigate, useSearchParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Card, Descriptions, Divider, FloatButton, List, Modal, notification, Space } from 'antd'
import { ArrowLeftOutlined, CheckCircleOutlined, CheckOutlined, ContainerOutlined, CopyOutlined, DeleteOutlined, DollarCircleOutlined, EditOutlined, FileTextOutlined, ReloadOutlined, SelectOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'


/////////////////////////////////////////////
// Application's

import { useGetDataObject, UseGetDataObjectParams, useOpenPage, UseOpenPageParams } from '../../hooks/usePage'
import { BottomBar, } from '../../components/ContextMenu'

/////////////////////////////////////////////
// Object's

import { apiRequest, actions } from '../../data-storage/slice-orders'                   // orders
// import { OrderProductRowView } from './ObjectInventory'
// import PaymentEditPage from './PaymentEdit'
import { ITEM_VALUE_ACTIONS, XTSObjectPrintProps, XTSObjectViewProps } from '../../data-objects/types-components'
import { createXTSObject } from '../../data-objects/common-use'
import { RootState } from '../../data-storage'
import { XTSItemValue } from '../../data-objects/types-form'
import { REQUEST_STATUSES } from '../../commons/enums'
import { Loader } from '../../components/Loader'

import './index.css'

/////////////////////////////////////////////
// Main component

const RelatedDocument: React.FC<XTSObjectPrintProps> = (props) => {

    return (
        <Card>
            Releted document...
        </Card>
    )
}

const ObjectRelatedPage: React.FC<XTSObjectPrintProps> = (props) => {

    const { objectId, pageId } = props

    const openPageParams: UseOpenPageParams = {
        pageId: '',
        pageName: 'XTSSupplierInvoice',
        pageTitle: 'Đối tượng liên quan',
        // renderKey: 0,
    }
    useOpenPage(openPageParams)

    /////////////////////////////////////////
    // Get related documents 

    const [relatedDocumets, setRelatedDocuments] = useState([
        {
            objectId: createXTSObject('XTSObjectId', { presentation: 'Document 111' }),
            documentAmount: 100,
            comment: 'comment 111',
        },
        {
            objectId: createXTSObject('XTSObjectId', { presentation: 'Document 222' }),
            documentAmount: 200,
            comment: 'comment 222',
        },
        {
            objectId: createXTSObject('XTSObjectId', { presentation: 'Document 333' }),
            documentAmount: 300,
            comment: 'comment 333',
        },
    ])

    /////////////////////////////////////////
    // 

    return (
        <div className='supplier-invoice-related'>
            <div>Chứng từ liên quan</div>
            <List
                dataSource={relatedDocumets}
                renderItem={item => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={<FileTextOutlined />}
                            title={item.objectId.presentation}
                            description={item.comment + '   ' + item.documentAmount}
                        />
                    </List.Item>
                )}
            />

            <BottomBar
                stepBack={{ onClick: props.stepBack, visible: Boolean(props.stepBack) }}
            />
        </div>
    )
}

/////////////////////////////////////////////
// Export's

export default ObjectRelatedPage