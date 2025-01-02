
/////////////////////////////////////////////
// Standard's

import { useSelector } from 'react-redux'
import { FC, ReactNode, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, FloatButton } from 'antd'
import { ArrowLeftOutlined, CarryOutOutlined, CheckOutlined, EllipsisOutlined, DeleteRowOutlined, EditOutlined, PlusOutlined, ReloadOutlined, SaveOutlined, LineOutlined, InsertRowBelowOutlined, AppstoreAddOutlined, VerticalAlignBottomOutlined, SelectOutlined, ThunderboltOutlined } from '@ant-design/icons'

/////////////////////////////////////////////
// Application's

import { RootState } from '../../data-storage'
import { isFullscreenAndroid } from '../../commons/telegram'

/////////////////////////////////////////////
// Object's

import './index.css'

/////////////////////////////////////////////
// Main

export interface ContextMenuButton {
    key?: string
    visible?: boolean
    className?: string
    title?: string
    hint?: string
    icon?: ReactNode
    onClick?: (e: any) => void
}

export interface ContextMenuProps {
    // open?: boolean
    stepBack?: ContextMenuButton
    refresh?: ContextMenuButton
    loadMore?: ContextMenuButton
    newItem?: ContextMenuButton
    editItem?: ContextMenuButton
    saveItem?: ContextMenuButton
    choiceItem?: ContextMenuButton
    action1?: ContextMenuButton
    action2?: ContextMenuButton
    action3?: ContextMenuButton
}

const TopBar: React.FC<any> = (props) => {
    return (
        <div className='top-bar'
        // style={{ height: HEADER_HEIGHT }}
        >
            {props.children}
        </div>
    )
}

const BottomBar: React.FC<ContextMenuProps> = (props) => {

    const { telegramId } = useSelector((state: RootState) => state.session)

    const buttonTemplate = (title: string = '', icon: ReactNode, className: string = 'context-menu-button') => {
        return { title, icon, visible: true, className }
    }

    const standardButtons: { [key: string]: any } = {
        stepBack: buttonTemplate('', <ArrowLeftOutlined className='context-menu-button-icon' />),
        refresh: buttonTemplate('', <ReloadOutlined className='context-menu-button-icon' />, 'context-menu-button-refresh'),
        loadMore: buttonTemplate('Tải thêm', <VerticalAlignBottomOutlined className='context-menu-button-icon' />),
        newItem: buttonTemplate('Tạo mới', <PlusOutlined className='context-menu-button-icon' />),
        editItem: buttonTemplate('Soạn', <EditOutlined className='context-menu-button-icon' />),
        saveItem: buttonTemplate('Lưu lại', <SaveOutlined className='context-menu-button-icon' />),
        choiceItem: buttonTemplate('Chọn', <SelectOutlined className='context-menu-button-icon' />),
        action1: buttonTemplate('Action 1', <ThunderboltOutlined className='context-menu-button-icon' />),
        action2: buttonTemplate('Action 2', <ThunderboltOutlined className='context-menu-button-icon' />),
        action3: buttonTemplate('Action 3', <ThunderboltOutlined className='context-menu-button-icon' />),
    }

    const buttons: ContextMenuButton[] = []

    for (let key in props) {
        if (standardButtons.hasOwnProperty(key)) {
            const button = Object.assign(standardButtons[key], (props as any)[key])
            if (key === 'stepBack') {
                button.visible = !Boolean(telegramId)
            }
            if (button.visible) {
                button.key = key
                buttons.push(button)
            }
        }
    }
    if (Object.keys(buttons).length === 0) {
        // buttons.push(standardButtons.stepBack)
    }

    /////////////////////////////////////////////
    // 

    return (
        // <div className={(isFullscreenAndroid()) && 'bottom-bar-fullscreen-android' || 'bottom-bar'}>
        <div className='bottom-bar'>
            {buttons.map(button =>
                <Button
                    className={button.className}
                    key={button.key}
                    onClick={button.onClick}
                    icon={button.icon}
                >
                    <div className='context-menu-button-title'>
                        {button.title}
                    </div>
                </Button>
            )}
        </div >
    )
}

export { TopBar, BottomBar } 