/////////////////////////////////////////////
// Standard's

import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

/////////////////////////////////////////////
// Application's

import { useIndexPage } from '../../hooks/usePage'
import { ITEM_VALUE_ACTIONS, XTSObjectIndexProps } from '../../data-objects/types-components'

/////////////////////////////////////////////
// Object's

import ListPage from './EmployeeList'                      // Employee
import ViewPage from './EmployeeView'                      // Employee
import EditPage from './EmployeeEdit'                      // Employee

/////////////////////////////////////////////
// Main component

// OK
const EmployeesPage: React.FC<XTSObjectIndexProps> = (props) => {

    const navigate = useNavigate()
    const { itemName } = props

    const [searchParams, setSearchParams] = useSearchParams()
    const id = searchParams.get('id')
    let action = (id) && ITEM_VALUE_ACTIONS.VIEW || undefined
    if (searchParams.get('edit')) {
        action = ITEM_VALUE_ACTIONS.EDIT
    }

    const afterSave = (tempData: any): void => {

    }

    const params = {
        dataType: 'XTSEmployee',
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

export default EmployeesPage                                // Employees