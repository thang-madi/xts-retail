/////////////////////////////////////////////
// Standard's

import { useEffect, useState } from 'react'
import { useParams, useNavigate, useSearchParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Card, Descriptions, Divider, FloatButton, List, Modal, notification, Space } from 'antd'
import { ArrowLeftOutlined, CheckCircleOutlined, CheckOutlined, ContainerOutlined, CopyOutlined, DeleteOutlined, DollarCircleOutlined, EditOutlined, ReloadOutlined, SelectOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'


/////////////////////////////////////////////
// Application's

import { useGetDataObject, UseGetDataObjectParams, useOpenPage, UseOpenPageParams } from '../../hooks/usePage'
import { BottomBar, } from '../../components/ContextMenu'
import { createXTSObject } from '../../data-objects/common-use'
import { RootState } from '../../data-storage'
import { XTSItemValue } from '../../data-objects/types-form'
import { REQUEST_STATUSES } from '../../commons/enums'
import { Loader } from '../../components/Loader'
import { XTSObjectPrintProps } from '../../data-objects/types-components'
import { PDFViewer, printFormURL } from '../../components/PDFViewer'

/////////////////////////////////////////////
// Object's

import { downloadFile } from '../../commons/common-print'

import './index.css'

/////////////////////////////////////////////
// Main component

const ObjectPrintPage: React.FC<XTSObjectPrintProps> = (props) => {

    const { objectId, pageId } = props

    const openPageParams: UseOpenPageParams = {
        pageId: '',
        pageName: 'XTSOrder',
        pageTitle: 'In đối tượng',
        // renderKey: 0,
    }
    useOpenPage(openPageParams)

    /////////////////////////////////////////
    // Print 

    const printFormParams = {
        dataType: objectId.dataType,
        id: objectId.id,
        templateName: 'ExternalPrintForm.MinSalesOrder',
    }
    const url = printFormURL(printFormParams)
    // console.log('printFormURL', url)

    // useEffect(() => {
    //     if (url && TWA.platform !== 'desktop' && TWA.platform !== 'tdesktop' && TWA.platform !== 'unknown') {
    //         // console.log('TWA.platform', TWA.platform)
    //         TWA.openLink(url)
    //     }
    // }, [url])

    /////////////////////////////////////////
    // 

    return (
        <div className='sales-order-print'>
            <PDFViewer fileUrl={url} />
        </div>
    )
}

/////////////////////////////////////////////
// Export's

export default ObjectPrintPage