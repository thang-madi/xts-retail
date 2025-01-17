/////////////////////////////////////////////
// Standard's

import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

/////////////////////////////////////////////
// Application's

import { useIndexPage, UseIndexPageParams } from '../../hooks/usePage'
import { ITEM_VALUE_ACTIONS, XTSObjectIndexProps } from '../../data-objects/types-components'

/////////////////////////////////////////////
// Object's

import ListPage from './ObjectList'
import ViewPage from './ObjectView'
import EditPage from './ObjectEdit'


/////////////////////////////////////////////
// Main component

// OK
export const dataType = 'XTSProduct'

// OK
export function getPages() {
    return {
        IndexPage: ProductsPage,
        ViewPage,
        EditPage,
        ListPage,
    }
}

//                             
const ProductsPage: React.FC<XTSObjectIndexProps> = (props) => {

    const navigate = useNavigate()
    const { itemName } = props

    console.log('objectIds', props.objectIds)

    const [searchParams, setSearchParams] = useSearchParams()
    const id = searchParams.get('id')
    // let action = (id) && ITEM_VALUE_ACTIONS.VIEW || undefined
    // if (searchParams.get('edit') === 'true') {
    //     action = ITEM_VALUE_ACTIONS.EDIT
    // }

    let action = ITEM_VALUE_ACTIONS.LIST
    if (!props.itemName && searchParams.get('edit')) {
        action = ITEM_VALUE_ACTIONS.EDIT
    } else if (!props.itemName && id) {
        action = ITEM_VALUE_ACTIONS.VIEW
    }

    const afterSave = (tempData: any): void => {

    }

    const params: UseIndexPageParams = {
        dataType,
        id: id || undefined,
        itemName,
        action,
        choiceItemValue: props.choiceItemValue,
        afterSave,              // Tạm thời chưa khả dụng, cần xem xét lại
        navigate,
    }

    const { itemValue, pageId, stepBack, choiceItemValue } = useIndexPage(params)       // pageId dùng cho ITEM_VALUE_ACTIONS.EDIT

    switch (itemValue.action) {
        case ITEM_VALUE_ACTIONS.EDIT:
            return (
                <EditPage
                    pageId={pageId}
                    itemValue={itemValue}
                    itemName={props.itemName}
                    choiceItemValue={choiceItemValue}
                    stepBack={stepBack}
                />
            )
        case ITEM_VALUE_ACTIONS.VIEW:
            return (
                <ViewPage
                    pageId={pageId}
                    itemValue={itemValue}
                    itemName={props.itemName}
                    choiceItemValue={choiceItemValue}
                    stepBack={stepBack}
                />
            )
        default:
            return (
                <ListPage
                    pageId={pageId}
                    itemName={props.itemName}
                    objectIds={props.objectIds}                 // Hiện tại mới chỉ dùng cho Product
                    choiceItemValue={choiceItemValue}
                    stepBack={stepBack}
                    renderKey={props.renderKey}
                />
            )
    }
}

/////////////////////////////////////////////
// Export

export default ProductsPage                                // Products