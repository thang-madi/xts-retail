/////////////////////////////////////////////
// Standard's

import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Drawer } from 'antd'

/////////////////////////////////////////////
// Application's

import { useIndexPage, useOpenPage, UseOpenPageParams, useStepBack } from '../../hooks/usePage'
import { ITEM_VALUE_ACTIONS, XTSObjectRelatedProps, XTSRelatedPageProps } from '../../data-objects/types-components'
import { XTSItemValue } from '../../data-objects/types-form'
import { createXTSObject } from '../../data-objects/common-use'
import { generateUUID } from '../../commons/common-use'

/////////////////////////////////////////////
// Object's

import ListPage from './RelatedList'
import ViewPage from './RelatedView'

// import EditPage from './RelatedEdit'                   

/////////////////////////////////////////////
// Main component

function getPage(action: ITEM_VALUE_ACTIONS): any {

    // switch (action) {
    //     case ITEM_VALUE_ACTIONS.VIEW:
    //         return (
    //             <ViewPage
    //                 pageId={params.pageId}
    //                 objectId={params.objectId}
    //                 // itemName={props.itemName}
    //                 choiceItemValue={params.choiceItemValue}
    //                 stepBack={params.stepBack}
    //             />
    //         )
    //     default:
    //         return (
    //             <ListPage
    //                 pageId={pageId}
    //                 itemName={props.itemName}
    //                 choiceItemValue={choiceItemValue}
    //                 stepBack={stepBack}
    //                 renderKey={props.renderKey}
    //             />
    //         )
    // }
    switch (action) {
        case ITEM_VALUE_ACTIONS.VIEW:
            return ViewPage
        default:
            return ListPage
    }
}

// OK
const RelatedPage: React.FC<XTSRelatedPageProps> = (props) => {

    const navigate = useNavigate()
    const { objectId } = props
    const [renderKey, setRenderKey] = useState(0)
    const [itemValue, setItemValue] = useState<XTSItemValue>(createXTSObject('XTSItemValue', { action: ITEM_VALUE_ACTIONS.LIST }))

    const closeRelatedPage = () => {
        const itemValue = createXTSObject('XTSItemValue', { dataType: objectId.dataType, action: ITEM_VALUE_ACTIONS.ESCAPE })
        props.choiceItemValue(itemValue)
    }

    const choiceItemValue = (itemValue: XTSItemValue) => {
        if (itemValue.action === ITEM_VALUE_ACTIONS.VIEW) {
            setItemValue(itemValue)
        } else {
            props.choiceItemValue(itemValue)
        }
    }

    const stepBack = () => {
        const newItemValue = createXTSObject('XTSItemValue', itemValue)
        if (itemValue.action === ITEM_VALUE_ACTIONS.VIEW) {
            newItemValue.action = ITEM_VALUE_ACTIONS.LIST
            setItemValue(newItemValue)
        } else {
            // Đóng Modal
            // newItemValue.action = ITEM_VALUE_ACTIONS.ESCAPE
            // props.choiceItemValue(newItemValue)
            closeRelatedPage()
            console.log('props.choiceItemValue', props.choiceItemValue)
        }
    }

    const [pageId] = useState(generateUUID())
    useStepBack({ pageId, stepBack })

    const openPageParams: UseOpenPageParams = {
        pageId,
        pageName: props.pageName,
        pageTitle: props.title,
        renderKey: renderKey
    }
    useOpenPage(openPageParams)

    /////////////////////////////////////////////
    //

    useEffect(() => {
        if (props.open) {
            setRenderKey(prevValue => prevValue + 1)
            setItemValue(createXTSObject('XTSItemValue', { action: ITEM_VALUE_ACTIONS.LIST }))
        }
    }, [props.open])

    const Page = getPage(itemValue.action)
    // console.log('Page', Page)

    /////////////////////////////////////////////
    //

    return (
        <Drawer
            className='modal-page'
            title={props.title}
            open={props.open}
            width='100%'
            onClose={closeRelatedPage}
        >
            <Page
                pageId={pageId}
                objectId={objectId}
                choiceItemValue={choiceItemValue}
                stepBack={stepBack}
                renderKey={renderKey}
            />
        </Drawer >
    )
}

/////////////////////////////////////////////
// Export

export default RelatedPage