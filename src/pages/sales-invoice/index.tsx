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
// import PrintPage from './ObjectPrint'
// import RelatedPage from './ObjectRelatedDocuments'

import './index.css'

/////////////////////////////////////////////
// Main component

const SalesInvoicesPage: React.FC<XTSObjectIndexProps> = (props) => {

    const navigate = useNavigate()
    const { itemName } = props

    const [searchParams, setSearchParams] = useSearchParams()
    const id = searchParams.get('id') || undefined
    let action = (id) && ITEM_VALUE_ACTIONS.VIEW || undefined
    if (searchParams.get('edit') === 'true') {
        action = ITEM_VALUE_ACTIONS.EDIT
    }

    const afterSave = (tempData: any): void => {

    }

    const params: UseIndexPageParams = {
        dataType: 'XTSSalesInvoice',
        id: id || undefined,
        itemName,
        action,
        // reopen: props.reopen,
        choiceItemValue: props.choiceItemValue,
        afterSave,                   // Tạm thời chưa khả dụng, cần xem xét lại
        navigate,
    }
    const { itemValue, pageId, stepBack, choiceItemValue } = useIndexPage(params)

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
                    choiceItemValue={choiceItemValue}
                    stepBack={stepBack}
                    renderKey={props.renderKey}
                />
            )
    }

}

/////////////////////////////////////////////
// Export

export default SalesInvoicesPage