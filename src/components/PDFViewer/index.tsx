
import React from 'react'

import { Viewer, Worker } from '@react-pdf-viewer/core'
import { defaultLayoutPlugin, SidebarTab, ToolbarProps, ToolbarSlot } from '@react-pdf-viewer/default-layout'

import '@react-pdf-viewer/core/lib/styles/index.css'
import '@react-pdf-viewer/default-layout/lib/styles/index.css'
import { isAndroid, isIOS } from '../../commons/telegram'

import './index.css'

interface PDFViewerProps {
    fileUrl: string
}

export interface printFormParams {
    id: string
    dataType: string
    templateName: string
}

export const printFormURL = (params: printFormParams): string => {

    const URL = process.env.REACT_APP_URL_FILES as string
    return `${URL}?id=${params.id}&data-type=${params.dataType}&template-name=${params.templateName}`
}

const PDFViewer: React.FC<PDFViewerProps> = (props: PDFViewerProps) => {

    // const defaultLayoutPluginInstance = defaultLayoutPlugin()
    const renderToolbar = (Toolbar: (props: ToolbarProps) => React.ReactElement) => (
        <Toolbar>
            {(slots: ToolbarSlot) => {
                const {
                    // CurrentPageInput,
                    Download,
                    // EnterFullScreen,
                    // GoToNextPage,
                    // GoToPreviousPage,
                    // NumberOfPages,
                    Print,
                    // ShowSearchPopover,
                    Zoom,
                    ZoomIn,
                    ZoomOut,
                } = slots;
                return (
                    <div className='toolbar'>
                        <div className='toolbar-button'>
                            <Download />
                        </div>
                        {/* <div className='toolbar-button'>
                            <ShowSearchPopover />
                        </div> */}
                        <div className='toolbar-button'>
                            <ZoomOut />
                        </div>
                        <div className='toolbar-button'>
                            <Zoom />
                        </div>
                        <div className='toolbar-button'>
                            <ZoomIn />
                        </div>
                        {/* <div className='toolbar-button'>
                            <GoToPreviousPage />
                        </div> */}
                        {/* <div className='toolbar-button'>
                            <CurrentPageInput /> / <NumberOfPages />
                        </div> */}
                        {/* <div className='toolbar-button'>
                            <GoToNextPage />
                        </div> */}
                        {/* <div className='toolbar-button'>
                            <EnterFullScreen />
                        </div> */}
                        <div className={(isIOS() || isAndroid()) && 'toolbar-button-hidden' || 'toolbar-button'}>
                            <Print />
                        </div>
                    </div>
                );
            }}
        </Toolbar>
    );

    const sidebarTabs = (defaultTabs: SidebarTab[]) => [];

    const defaultLayoutPluginInstance = defaultLayoutPlugin({ renderToolbar, sidebarTabs });


    return (
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.16.105/build/pdf.worker.js" >
            <div
                style={{
                    height: '100%',
                    // width: '100%',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                }}
            >
                <Viewer
                    // fileUrl={`${process.env.PUBLIC_URL}/pdf-open-parameters.pdf`}
                    fileUrl={props.fileUrl}
                    plugins={[defaultLayoutPluginInstance]}
                    theme='dark'
                    defaultScale={1.2}
                />
            </div>
        </Worker >
    )
}

export { PDFViewer }
