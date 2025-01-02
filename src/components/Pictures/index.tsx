/////////////////////////////////////////////
// Standard's

import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button, Space, Card, List, Image, Upload, Skeleton } from 'antd'
import { CameraOutlined, CheckSquareOutlined, CloseOutlined, LeftOutlined, RightOutlined, SelectOutlined, ShoppingCartOutlined, UploadOutlined } from '@ant-design/icons'
import LazyLoad from 'react-lazyload'

/////////////////////////////////////////////
// Application's

// import { createRequestDataByDataItems, newItemValue, xtsObjectToFormData } from '../data-exchange/common-use'
// import { createXTSObject } from '../data-exchange/objects'
// import { useSaveFormData } from '../hooks/use-page'
// import { formatCurrency, getRandomInt } from '../commons/common-use'

/////////////////////////////////////////////
// Object's

// import { XTSMediaItem } from '../data-objects/types-components'
// import { apiRequest, actions } from '../data-storage/slice-carts'
import { AppWebcam } from '../Webcam'
import { RootState } from '../../data-storage'
import { RcFile } from 'antd/lib/upload/interface'
import { XTSMediaItem } from '../../data-objects/types-components'

import './index.css'

/////////////////////////////////////////////
// Main component

export interface XTSAppPicturesProps {
    // pictureProps: any
    // edit: boolean
    dataType: string,
    pictures: XTSMediaItem[],
    newPictures?: XTSMediaItem[],
    deletedPictures?: XTSMediaItem[],
    setNewPictures?: any,
    setDeletedPictures?: any,
    setDefaultPicture?: any,
    imageProps?: any,
}

export const Pictures: React.FC<XTSAppPicturesProps> = (props) => {

    const { dataType, pictures, newPictures, deletedPictures, setNewPictures, setDeletedPictures, setDefaultPicture, imageProps } = props
    const [imageItems, setImageItems] = useState<XTSMediaItem[]>([])
    const [currentIndex, setCurrentIndex] = useState<number>(0)
    const fileStorageURL = useSelector((state: RootState) => state.session.fileStorageURL)

    // console.log('Pictures.imageProps', imageProps)

    useEffect(() => {
        const tempPictures = pictures.filter((picture: any) =>
            (!deletedPictures) && true ||
            deletedPictures.findIndex((item: any) => item.id === picture.id) === -1
        )
        // console.log('pictures', pictures)
        // console.log('tempPictures', tempPictures)
        const _imageItems = tempPictures.map((item: XTSMediaItem) => ({ ...item, imageSrc: fileStorageURL + item.presentation }))
        if (newPictures && newPictures.length > 0) {
            for (let newPicture of newPictures) {
                _imageItems.push(newPicture)
            }
        }
        // console.log('_imageItems', _imageItems)
        setImageItems(_imageItems)
    }, [pictures, newPictures, deletedPictures])

    /////////////////////////////////////////////
    // Button: Left, Rigth, Select Icon

    const handlePrevClick = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? imageItems.length - 1 : prevIndex - 1))
    }

    const handleNextClick = () => {
        setCurrentIndex((prevIndex) => (prevIndex === imageItems.length - 1 ? 0 : prevIndex + 1))
    }

    const handleImageClick = (item: any) => {
        const index = imageItems.findIndex((e: any) => e.imageSrc === item.imageSrc)
        setCurrentIndex(index)
    }

    /////////////////////////////////////////////
    // Button: Delete Picture

    const setDefault = () => {
        if (imageItems.length > 0) {
            if (!imageItems[currentIndex].imageSrc.startsWith('data:')) {
                const tempImageItems = [imageItems[currentIndex], ...imageItems]
                tempImageItems.splice(currentIndex + 1, 1)
                setDefaultPicture(tempImageItems[0])
                setImageItems(tempImageItems)
                setCurrentIndex(0)
            }
        }
    }

    /////////////////////////////////////////////
    // Button: Delete Picture

    const deletePicture = () => {

        if (imageItems.length > 0) {
            if (currentIndex === imageItems.length - 1) {
                setCurrentIndex(currentIndex - 1)
            }
            if (imageItems[currentIndex].imageSrc.startsWith('data:')) {
                if (newPictures) {
                    setNewPictures(newPictures.filter(
                        (newPicture: any) => newPicture.imageSrc !== imageItems[currentIndex].imageSrc)
                    )
                }
            } else {
                if (deletedPictures) {
                    setDeletedPictures([...deletedPictures, imageItems[currentIndex]])
                }
            }
        }
    }

    /////////////////////////////////////////////
    // Choice picture

    const beforeUpload = (file: RcFile) => {
        // console.log('file', file)
        const reader = new FileReader()
        reader.onload = (e) => {
            if (newPictures) {
                setNewPictures([...newPictures, {
                    id: null,
                    dataType,
                    imageSrc: e.target?.result
                }])
                setCurrentIndex(imageItems.length)
            }
            // console.log('file', e.target.result)
        }
        reader.readAsDataURL(file)
        return false
    }

    /////////////////////////////////////////////
    // Webcam

    const [webcamOpen, setWebcamOpen] = useState(false)

    const captureImage = (file: RcFile) => {
        if (newPictures) {
            setNewPictures([...newPictures, { id: null, dataType, imageSrc: file }])
            setCurrentIndex(imageItems.length)
        }
        // console.log('file', e.target.result)
    }

    /////////////////////////////////////////////
    // 

    return (

        <Space
            className='pictures-group'
            direction='vertical'
            size={0}
        // style={{
        //     alignItems: 'center',
        //     // border: '2px solid #000',
        //     width: '100%',
        //     padding: '10px',
        //     position: 'relative',
        // }}
        >
            <Skeleton active loading={false} paragraph={{ rows: 5 }} title />
            <LazyLoad height={200} offset={100} once >
                <Image
                    // className='lazyload'
                    src={imageItems[currentIndex]?.imageSrc}
                    alt="Picture"
                    preview={false}
                    {...imageProps}
                    style={{
                        // display: 'block',
                        // marginBottom: '50px',
                        // marginRight: '0px'
                    }}
                />
            </LazyLoad>

            <Button
                className='left-button'
                icon={<LeftOutlined />}
                onClick={handlePrevClick}
            // style={{
            //     position: 'absolute',
            //     top: '45%',
            //     left: '20px',
            //     transform: 'translateY(-50%)',
            //     backgroundColor: 'rgba(0, 0, 0, 0.5)',
            //     color: 'white'
            // }}
            />

            <Button
                className='right-button'
                icon={<RightOutlined />}
                onClick={handleNextClick}
            // style={{
            //     position: 'absolute',
            //     top: '45%',
            //     right: '30px',
            //     transform: 'translateY(-50%)',
            //     backgroundColor: 'rgba(0, 0, 0, 0.5)',
            //     color: 'white'
            // }}
            />

            <List
                className='picture-list'
                grid={{ gutter: 16 }}
                dataSource={imageItems}
                // style={{
                //     width: '100%',
                //     height: '50px',
                //     display: 'flex',
                //     justifyContent: 'center',
                //     alignItems: 'center',
                //     flexWrap: 'wrap',
                //     marginTop: '10px',
                //     // paddingBottom: '0px',
                // }}
                locale={{ emptyText: '...' }}
                renderItem={item => (
                    <List.Item
                        className='picture-form-item'
                        onClick={() => handleImageClick(item)}
                    // style={{
                    //     display: 'flex',
                    //     justifyContent: 'center',
                    //     alignItems: 'center',
                    //     marginBottom: '0px',
                    //     paddingBottom: '0px',
                    // }}
                    >
                        <Image
                            className={`picture-icon ${imageItems.indexOf(item) === currentIndex ? 'picture-icon-active' : ''}`}
                            // className='picture-icon img'
                            style={{
                                width: '30px', height: '40px', objectFit: 'contain',
                                borderRadius: '5px',
                                // border: imageItems.indexOf(item) === currentIndex ? '2px solid blue' : 'none',
                            }}
                            src={item.imageSrc}
                            alt={item.presentation}
                            preview={false}
                            placeholder={<div>Loading...</div>}
                        />
                    </List.Item>
                )}
            />

            <div style={{ display: 'flex' }}>
                <Upload
                    showUploadList={false}
                    beforeUpload={beforeUpload}
                // style={{ margin: 0, padding: 0 }}
                >
                    <Button className='picture-button' icon={<UploadOutlined />}>
                        Chọn
                    </Button>
                </Upload>
                <Button
                    className='picture-button'
                    // style={{ marginLeft: '10px' }}
                    icon={<CameraOutlined />}
                    onClick={() => setWebcamOpen(true)}
                >
                    Chụp
                </Button>
                <Button
                    className='picture-button'
                    // style={{ marginLeft: '10px' }}
                    icon={<CheckSquareOutlined />}
                    onClick={setDefault}
                >
                    Mặc định
                </Button>
                <Button
                    className='picture-button'
                    // style={{ marginLeft: '10px' }}
                    icon={<CloseOutlined />}
                    onClick={deletePicture}
                >
                    Xóa
                </Button>
            </div>

            <AppWebcam
                webcamProps={{}}
                modalProps={{
                    open: webcamOpen,
                    footer: null
                }}
                setPicture={captureImage}
                setWebcamOpen={setWebcamOpen}
            />

        </Space >

    )
}

/////////////////////////////////////////////
// Export's

