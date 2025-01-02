/////////////////////////////////////////////
// Standard's

import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useNavigate, useSearchParams } from 'react-router-dom'
import { Button, Empty, FloatButton, Image, List, Skeleton, Space } from 'antd'
import { ArrowLeftOutlined, CopyOutlined, EditOutlined, LeftOutlined, LinkOutlined, ReloadOutlined, RightOutlined, SelectOutlined, ShoppingCartOutlined } from '@ant-design/icons'


/////////////////////////////////////////////
// Application's

import { useGetDataObject, UseGetDataObjectParams, useOpenPage, UseOpenPageParams } from '../../hooks/usePage'
import { copyToClipboard, formatCurrency } from '../../commons/common-use'
import { BottomBar, } from '../../components/ContextMenu'
import { ITEM_VALUE_ACTIONS, XTSMediaItem, XTSObjectViewProps } from '../../data-objects/types-components'
import { createXTSObject } from '../../data-objects/common-use'

/////////////////////////////////////////////
// Object's

import { XTSFileRow } from '../../data-objects/types-application'
import { REQUEST_STATUSES } from '../../commons/enums'
import { Loader } from '../../components/Loader'
import { useSaveCart } from '../../hooks/useCarts'
import { RootState } from '../../data-storage'
// import { FOOTER_HEIGHT } from '../../commons/constants'
import { TWA } from '../../commons/telegram'


/////////////////////////////////////////////
// Main component

// OK
const ProductViewPage: React.FC<XTSObjectViewProps> = (props) => {

    const { itemValue, pageId } = props

    const object_id = itemValue.id
    const dataType = 'XTSProduct'

    const { user, telegramId } = useSelector((state: any) => state.session)

    const getDataObjectParams: UseGetDataObjectParams = {
        dataType,
        object_id,
        refresh: false,
    }

    const {
        dataObject,
        refreshObject,
        status
    } = useGetDataObject(getDataObjectParams)

    const openPageParams: UseOpenPageParams = {
        pageId,
        pageName: dataType,
        pageTitle: (dataObject?.description) || '',
        // renderKey: 0,
    }
    useOpenPage(openPageParams)

    /////////////////////////////////////////////
    // addToCart    

    const { addToCart } = useSaveCart()

    const handleAddToCart = (e: any) => {
        addToCart(dataObject)
    }

    /////////////////////////////////////////////
    // 

    const doItem = (action: ITEM_VALUE_ACTIONS): void => {
        if (props.choiceItemValue) {
            // console.log('dataObject', dataObject)
            const itemValue = createXTSObject('XTSItemValue', {
                id: dataObject.objectId.id,
                presentation: dataObject.presentation,
                dataType: dataObject.objectId.dataType,
                itemName: props.itemName,
                dataItem: dataObject,
                action,
            })
            props.choiceItemValue(itemValue)
        }
    }

    const editItem = () => {
        doItem(ITEM_VALUE_ACTIONS.EDIT)
    }

    const choiceItem = () => {
        doItem(ITEM_VALUE_ACTIONS.CHOICE)
    }

    /////////////////////////////////////////////
    // Copy Link

    const copyLink = () => {
        // const url = `http://localhost:3000/products?id=${dataObject.objectId.id}`
        const url = `https://t.me/XTSRetail_bot?startapp=products__${dataObject.objectId.id}`
        copyToClipboard(url)

        // if (TWA.shareMessage) {
        //     const preparedMessage = {
        //         user_id: telegramId,
        //         result: {
        //             type: 'article',
        //             id: 'unique-article-id',
        //             title: 'Link sản phẩm trên XTS Retail',
        //             input_message_content: {
        //                 message_text: url
        //             }
        //         }
        //     }
        //     const preparedInlineMessage = TWA.savePreparedInlineMessage(preparedMessage)
        //     console.log('preparedInlineMessage', preparedInlineMessage)
        //     TWA.shareMessage(preparedInlineMessage.id).
        //         then(() => {
        //             console.log('Tin nhắn đã được chia sẻ thành công!')
        //         })
        //         .catch((error: any) => {
        //             console.error('Lỗi khi chia sẻ tin nhắn:', error)
        //         })
        // }
    }

    /////////////////////////////////////////////
    // Pictures

    // const dataType_AttachedFile = 'XTSProductAttachedFile'
    // const [pictures, setPictures] = useState<XTSMediaItem[]>([])
    const [pictureItems, setPictureItems] = useState<string[]>([])
    const [picture, setPicture] = useState<string>('')
    // const [newPictures, setNewPictures] = useState()
    // const [deletedPictures, setDeletedPictures] = useState()
    const fileStorageURL = useSelector((state: RootState) => state.session.fileStorageURL)

    // const pictureProps = { dataType: dataType_AttachedFile, pictures }
    // const imageProps = { height: '400px' }

    const _pictures = dataObject['_pictures']

    useEffect(() => {
        const items = _pictures.map((item: any) => fileStorageURL + item.fileName)
        setPictureItems(items)
        setPicture(fileStorageURL + dataObject?.picture?.presentation)
    }, [_pictures])

    /////////////////////////////////////////////
    // 

    return (
        // <div style={{ width: '100%', overflowY: 'hidden' }}>
        <div className='view-page' >

            <Loader isLoading={status === REQUEST_STATUSES.LOADING} />

            <div style={{ width: '100%', height: '500px', overflow: 'hidden', margin: '0px' }}>
                <Image.PreviewGroup items={pictureItems}>
                    <Image src={picture} />
                </Image.PreviewGroup>
            </div>

            < div style={{ display: 'flex', width: '100%', minHeight: '50px', backgroundColor: 'azure', alignItems: 'center' }}>
                <div style={{
                    display: 'flex',
                    textAlign: 'center',
                    marginLeft: '20px',
                    fontSize: '28px',
                    fontStyle: 'italic',
                    fontWeight: 'bold',
                    color: 'orange'
                }}>
                    {formatCurrency(dataObject?._price)}
                </div>
            </div>

            <div style={{ marginLeft: '20px', marginTop: '10px' }}>
                {dataObject?.description}
            </div>

            <div style={{ marginLeft: '20px', marginTop: '10px', marginBottom: '5px' }}>
                <b>Đơn vị tính:</b>
            </div>
            <List
                dataSource={dataObject?._uoms || []}
                renderItem={(row: any) => (
                    <Space style={{ display: 'flex' }}>
                        <div>Hệ số: {row?.coefficient}</div>
                        <b style={{ color: 'blue' }}>{row?.uom?.presentation}</b>
                    </Space>
                )}
                style={{ marginLeft: '20px' }}
            />

            {(dataObject?._characteristics?.length > 0) &&
                <>
                    <div>Đặc tính sản phẩm</div>
                    <List
                        grid={{
                            gutter: 16,
                            xs: 2,
                            sm: 2,
                            md: 4,
                            lg: 6,
                            xl: 8,
                            xxl: 10,
                        }}
                        dataSource={dataObject?._characteristics || []}
                        locale={{ emptyText: '-' }}
                        renderItem={(row: any) => (
                            <List.Item>
                                {/* <ProductUOMCard
                            row={row}
                        /> */}
                                <div>
                                    {row?.characteristic_presentation}
                                </div>
                                <div>
                                    {formatCurrency(row?.price)}
                                </div>
                            </List.Item>
                        )}
                    />
                </>
            }

            <div style={{ marginLeft: '20px', marginTop: '10px', }}>
                <b>Chi tiết sản phẩm:</b>
                <div style={{ marginTop: '10px' }}> {dataObject?.descriptionFull}</div>
            </div>

            {/* <ViewMenu
                editItem={(user) && editItem || undefined}
                refresh={refreshObject}
                stepBack={props.stepBack}
            /> */}

            <BottomBar
                stepBack={{ onClick: props.stepBack, visible: Boolean(props.stepBack) }}
                refresh={{ onClick: refreshObject, }}
                editItem={{ onClick: editItem, visible: (user) }}
                choiceItem={{ onClick: choiceItem, visible: Boolean(props.itemName) }}
                action1={{
                    onClick: (handleAddToCart), icon: <ShoppingCartOutlined />, title: 'Vào giỏ', visible: Boolean(!props.itemName && !user)
                }}
                action2={{
                    onClick: (copyLink), icon: <LinkOutlined />, title: 'Link', visible: Boolean(!props.itemName && user)
                }}
            />

        </div >
    )
}

/////////////////////////////////////////////
// Export's

export default ProductViewPage