
import { FormInstance } from "antd"
import { XTSObject, XTSObjectRow, XTSRecord } from "./types-common"
import { XTSItemValue } from "./types-form"

export enum ITEM_VALUE_ACTIONS {
    VIEW = 'VIEW',
    EDIT = 'EDIT',
    PRINT = 'PRINT',
    CHOICE = 'CHOICE',
    LIST = 'LIST',
    ESCAPE = 'ESCAPE',
}

// export interface XTSChoicePageProps {
//     modalProps: { [key: string]: any }
//     initialItemValue: XTSItemValue
//     closeChoicePage: () => void
//     form: any
//     pageSettings: any
//     chosenItemValues: { [key: string]: XTSItemValue }
//     setChosenItemValues: any         // có thể xem xét bỏ đi, thay bằng choiceItemValue
//     choiceItemValue: (itemValue: XTSItemValue) => void
//     pageOwnerId: string
// }

export interface XTSChoicePageProps {
    modalProps: { [key: string]: any }
    itemName: string
    dataType: string
    form: any
    // pageOwnerId: string
    choiceItemValue: (itemValue: XTSItemValue) => void
    // setPageInfo: () => void
}

export interface XTSSubPageProps {
    modalProps: { [key: string]: any }
    pageName: string
    itemValue: XTSItemValue
    // form?: any
    // pageOwnerId: string
    choiceItemValue: (itemValue: XTSItemValue) => void
    // setPageInfo: () => void
}

/////////////////////////////////////////////
// Object's

export interface XTSObjectIndexProps {
    itemName?: string
    renderKey?: number
    choiceItemValue?: (itemValue: XTSItemValue | undefined) => void
}

export interface XTSObjectListProps {
    pageId: string
    itemName?: string
    renderKey?: number
    choiceItemValue?: (itemValue: XTSItemValue) => void
    stepBack?: () => void
}

export interface XTSObjectCardProps {
    item: XTSObject
    itemName?: string
    additionals?: any
    choiceItemValue?: (itemValue: XTSItemValue) => void
    stepBack?: () => void
}

export interface XTSObjectViewProps {
    pageId: string
    itemValue: XTSItemValue
    itemName?: string
    additionals?: any
    // renderKey?: number
    choiceItemValue?: (itemValue: XTSItemValue) => void
    stepBack?: () => void
}

export interface XTSObjectEditProps {
    pageId: string
    itemValue: XTSItemValue
    itemName?: string
    additionals?: any
    // renderKey?: number
    choiceItemValue?: (itemValue: XTSItemValue) => void
    stepBack?: () => void
    afterSave?: (saveParams: any) => void
}

export interface XTSObjectPrintProps {
    pageId: string
    itemValue: XTSItemValue
    itemName?: string
    additionals?: any
    choiceItemValue?: (itemValue: XTSItemValue) => void
    stepBack?: () => void
}

export interface XTSObjectRowProps {
    dataRow: XTSObjectRow
    // pageId: string
    // itemName?: string
    additionals?: any
    form?: FormInstance
    updateRow: (tabName: string, dataRow: XTSObjectRow) => void
    deleteRow: (tabName: string, _lineNumber: number) => void
}

/////////////////////////////////////////////
// Record's

export interface XTSRecordIndexProps {
    itemName?: string
    choiceItemValue?: (itemValue: XTSItemValue | undefined) => void
}

export interface XTSRecordListProps {
    pageId: string
    itemName?: string
    renderKey?: number
    choiceItemValue?: (itemValue: XTSItemValue) => void
    stepBack?: () => void
}

export interface XTSRecordCardProps {
    item: XTSRecord
    itemName?: string
    additionals?: any
    choiceItemValue?: (itemValue: XTSItemValue) => void
    stepBack?: () => void
}

export interface XTSRecordViewProps {
    itemValue: XTSItemValue
    itemName?: string
    additionals?: any
    choiceItemValue?: (itemValue: XTSItemValue) => void
    stepBack?: () => void
}

export interface XTSRecordEditProps {
    itemValue: XTSItemValue
    pageId: string
    itemName?: string
    additionals?: any
    choiceItemValue?: (itemValue: XTSItemValue) => void
    stepBack?: () => void
}

// export interface XTSObjectRowProps {
//     dataRow: XTSObjectRow
//     // pageId: string
//     // itemName?: string
//     additionals?: any
//     updateRow: (tabName: string, dataRow: XTSObjectRow) => void
//     deleteRow: (tabName: string, _lineNumber: number) => void
// }

/////////////////////////////////////////////
// 


/////////////////////////////////////////////
// 

export interface XTSMediaItem {
    id: string,
    dataType: string,
    imageSrc: string,
    presentation: string,
}

