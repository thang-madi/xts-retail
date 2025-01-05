/////////////////////////////////////////////
// Standard's

import { useEffect, useState } from 'react'
import { useParams, useNavigate, useSearchParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Card, Descriptions, Divider, Drawer, FloatButton, List, Modal, notification, Space } from 'antd'
import { ArrowLeftOutlined, CheckCircleOutlined, CheckOutlined, ContainerOutlined, CopyOutlined, DeleteOutlined, DollarCircleOutlined, EditOutlined, FileTextOutlined, ReloadOutlined, SelectOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'


/////////////////////////////////////////////
// Application's

import { useGetDataObject, UseGetDataObjectParams, useOpenPage, UseOpenPageParams, useStepBack } from '../../hooks/usePage'
import { BottomBar, } from '../../components/ContextMenu'

/////////////////////////////////////////////
// Object's

import { apiRequest, actions } from '../../data-storage/slice-orders'                   // orders
import { createXTSObject } from '../../data-objects/common-use'
import { RootState } from '../../data-storage'
import { XTSItemValue } from '../../data-objects/types-form'
import { REQUEST_STATUSES } from '../../commons/enums'
import { Loader } from '../../components/Loader'

import './index.css'
import { downloadFile } from '../../commons/common-print'
import { PDFViewer, printFormURL } from '../../components/PDFViewer'
import { ITEM_VALUE_ACTIONS, XTSObjectRelatedDocumentProps, XTSObjectRelatedDocumentsProps, XTSRelatedPageProps } from '../../data-objects/types-components'
import { generateUUID } from '../../commons/common-use'

/////////////////////////////////////////////
// Main component

const RelatedPage: React.FC<XTSRelatedPageProps> = (props) => {

    const { objectId } = props
    // const { objectId, title, open, pageName } = props
    const { dataType } = objectId
    const [renderKey, setRenderKey] = useState(0)

    const closeRelatedPage = () => {
        // console.log('props.choiceItemValue', props.choiceItemValue)
        const itemValue = createXTSObject('XTSItemValue', { dataType, action: ITEM_VALUE_ACTIONS.ESCAPE })
        props.choiceItemValue(itemValue)
    }

    const [pageId] = useState(generateUUID())
    useStepBack({ pageId, stepBack: closeRelatedPage })

    const openPageParams: UseOpenPageParams = {
        pageId,
        pageName: props.pageName,
        pageTitle: props.title,
        renderKey: renderKey
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

        <Drawer
            className='modal-page'
            title={props.title}
            open={props.open}
            width='100%'
            onClose={closeRelatedPage}
        >
            <List
                className='modal-page-list'
                dataSource={relatedDocumets}
                renderItem={item => (
                    <List.Item className='modal-page-list-item'>
                        <List.Item.Meta
                            avatar={<FileTextOutlined />}
                            title={item.objectId.presentation}
                        />
                        <div>
                            amount: {item.documentAmount}
                        </div>
                    </List.Item>
                )}
            />
            <BottomBar
                stepBack={{ onClick: closeRelatedPage }}
            />

        </Drawer >

    )
}

/////////////////////////////////////////////
// Export's

export default RelatedPage