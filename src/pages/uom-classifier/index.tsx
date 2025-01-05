/////////////////////////////////////////////
// Standard's

import { useEffect, useState } from 'react'
import { useNavigate, useNavigation, useSearchParams } from 'react-router-dom'

/////////////////////////////////////////////
// Application's

// import { newItemValue } from '../../data-exchange/common-use'
import { useIndexPage } from '../../hooks/usePage'
// import { telegramBackButton } from '../../commons/telegram'
// import { generateUUID } from '../../commons/common-use'

/////////////////////////////////////////////
// Object's

import ListPage from './UOMClassifierList'                      // uom-classifier
import ViewPage from './UOMClassifierView'                      // uom-classifier
// import EditPage from './uom-classifier-edit'                   // uom-classifier
import { ITEM_VALUE_ACTIONS, XTSObjectIndexProps } from '../../data-objects/types-components'

/////////////////////////////////////////////
// Main component

// OK
const UOMClassifierPage: React.FC<XTSObjectIndexProps> = (props) => {

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

    const params = {
        dataType: 'XTSUOMClassifier',
        id: id || undefined,
        itemName,
        action,
        // reopen: props.reopen,
        choiceItemValue: props.choiceItemValue,
        afterSave,              // Tạm thời chưa khả dụng, cần xem xét lại
        navigate,
    }
    const { itemValue, pageId, stepBack, choiceItemValue } = useIndexPage(params)       // pageId dùng cho ITEM_VALUE_ACTIONS.EDIT

    switch (itemValue.action) {
        case ITEM_VALUE_ACTIONS.EDIT:
            return (
                <div>
                    {/* <EditPage
                    pageId={pageId}
                    itemValue={itemValue}
                    itemName={itemName}
                    stepBack={stepBack}
                /> */}
                </div>
            )
        case ITEM_VALUE_ACTIONS.VIEW:
            return (
                <ViewPage
                    pageId={pageId}
                    itemValue={itemValue}
                    itemName={itemName}
                    choiceItemValue={choiceItemValue}
                    stepBack={stepBack}
                />
            )
        default:
            return (
                <ListPage
                    pageId={pageId}
                    itemName={itemName}
                    choiceItemValue={choiceItemValue}
                    stepBack={stepBack}
                    renderKey={props.renderKey}
                />
            )
    }
}

/////////////////////////////////////////////
// Export

export default UOMClassifierPage                                // UOMClassifier