/////////////////////////////////////////////
// Standard's

import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Input, Button, Modal, List, Card, Space, FloatButton, Descriptions, Popconfirm, Image } from 'antd'
import { CheckCircleOutlined, CloseCircleOutlined, CloudUploadOutlined, FileDoneOutlined, MinusCircleOutlined, MinusOutlined, PlusCircleOutlined, PlusOutlined } from '@ant-design/icons'

/////////////////////////////////////////////
// Application's

// import ChoicePage from '../../hocs/choice-page'
import { FormInput, FormSelect } from '../../components/FormItems'
// import { formDataToItemValue, xtsObjectToFormData } from '../../data-exchange/common-use'
import { generateUUID } from '../../commons/common-use'
// import { setPageInfo } from '../../data-storage/slice-current'
// import { RowEditMenu } from '../../components/ContextMenu'
import { XTSObject, XTSObjectId, XTSObjectRow } from '../../data-objects/types-common'
import { XTSObjectRowProps } from '../../data-objects/types-components'
import { XTSOrderProductRow, XTSProduct, XTSProductUOMRow } from '../../data-objects/types-application'
import { createXTSObject } from '../../data-objects/common-use'
import { useCreatePage, UseCreatePageParams } from '../../hooks/usePage'
import { RootState } from '../../data-storage'
import AmountInput from '../../components/AmountInput'


/////////////////////////////////////////////
// Object's

import './index.css'

/////////////////////////////////////////////
// Main components

// OK
export const OrderInventoryView: React.FC<any> = (props) => {

    const { dataRow } = props
    // console.log('OrderProductRowCard.dataRow', dataRow)

    const editRow = () => {
        if (props.openObjectRow) {
            props.openObjectRow(dataRow)
        }
    }

    const fileStorageURL = useSelector((state: RootState) => state.session.fileStorageURL)

    return (
        <Card
            style={{ margin: '0px', height: '100px' }}
            styles={{ body: { padding: '0px' } }}
        >
            <div style={{ display: 'flex', width: '100%', alignItems: 'center' }}>

                <div style={{ margin: 10, width: 22, }}>
                    #{dataRow._lineNumber}
                </div>

                <div style={{ width: '100px', height: '100px', overflow: 'hidden', }}>
                    <Image
                        width='100%'
                        height='auto'
                        src={fileStorageURL + dataRow._picture?.presentation}
                        fallback=''
                        style={{
                            objectFit: 'cover',
                        }}
                    />
                </div>

                <div style={{ paddingLeft: '15px', paddingRight: '20px', flexGrow: 1 }}>
                    <div style={{ fontWeight: 'bold' }}>{dataRow.product?.presentation}</div>
                    <div>Đơn giá: {dataRow._price} đồng/chiếc</div>
                    <div>Số lượng: {dataRow.quantity} {dataRow.uom?.presentation}</div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div>Thành tiền: </div>
                        <b>{dataRow.amount?.toLocaleString('vi-VN')} đồng</b>
                    </div>
                </div>

            </div >
        </Card >
    )
}

// 
export const OrderInventoryEdit: React.FC<XTSObjectRowProps> = (props) => {

    const dataRow = props.dataRow as XTSOrderProductRow

    const fileStorageURL = useSelector((state: RootState) => state.session.fileStorageURL)

    // console.log('OrderProductRowEdit.props', props)

    // const [pageId] = useState(generateUUID())
    // const dispatch = useDispatch()

    const tabName = 'inventory'

    // const [quantity, setQuantity] = useState<number>(dataRow.quantity)
    const [amount, setAmount] = useState<number>(dataRow.amount)
    const [total, setTotal] = useState<number>(dataRow.total)
    const [uom, setUOM] = useState<XTSObjectId>(dataRow.uom)
    const [characteristic, setCharacteristic] = useState<XTSObjectId>(dataRow.characteristic)
    // const [renderKey, setRenderKey] = useState<number>(0)

    const [productData, setProductData] = useState<XTSProduct>(useSelector((state: any) =>
        state.products.objects.find((item: XTSObject) => item.objectId.id === dataRow.product.id)
    ))

    const [_uoms, setUOMs] = useState<XTSProductUOMRow[]>()
    const [uomOptions, setUOMOptions] = useState<XTSObjectId[]>()

    useEffect(() => {
        if (productData && productData?._uoms.length > 0) {
            setUOMs(productData?._uoms)
            const _uomOptions = productData?._uoms?.map(item => item.uom as XTSObjectId)
            setUOMOptions(_uomOptions)
            // console.log('_uomOptions 1', _uomOptions)
        } else {
            const _uomOptions = [dataRow?.uom]
            setUOMOptions(_uomOptions)
            // console.log('_uomOptions 2', _uomOptions)
        }
    }, [productData])

    // console.log('uomOptions', uomOptions)
    // console.log('productData', productData)

    /////////////////////////////////////////////
    // Change dataRow

    interface _ChangeData {
        delta?: number
        characteristic?: XTSObjectId
        uom?: XTSObjectId
    }

    const handleChangeData = (e: any, newData: _ChangeData) => {
        e.stopPropagation()
        changeRowData(newData)
    }

    interface NewData {
        quantity?: number
        price?: number
        characteristic?: XTSObjectId
        uom?: XTSObjectId
    }

    const changeRowData = (newData: NewData): void => {

        const { quantity, price, characteristic, uom } = newData

        const newQuantity = quantity || dataRow.quantity
        if (newQuantity === 0) {
            setOpenPopConfirm(true)
        } else {

            const newRow = {
                ...dataRow,
                characteristic: characteristic || dataRow.characteristic,
                uom: dataRow.uom,
                quantity: newQuantity,
                price: dataRow.price,
                amount: newQuantity * dataRow.price,
                total: newQuantity * dataRow.price,
                _coefficient: dataRow._coefficient,
            }

            if (uom) {
                const _uomRow = _uoms?.find((item: XTSProductUOMRow) => item.uom?.id === uom.id)
                newRow._coefficient = _uomRow?.coefficient || 1
                newRow.price = dataRow._price * newRow._coefficient
                newRow.amount = dataRow.quantity * newRow.price
                newRow.total = newRow.amount
            }

            const newDataRow = createXTSObject('XTSOrderProductRow', newRow)
            props.updateRow(tabName, newDataRow)
        }
    }
    // const changeRowData = (newData: _ChangeData): void => {

    //     const { delta, characteristic, uom } = newData

    //     const newQuantity = quantity + (delta || 0)
    //     if (newQuantity <= 0) {
    //         setOpenPopConfirm(true)
    //     } else {

    //         const newRow = {
    //             ...dataRow,
    //             characteristic: characteristic || dataRow.characteristic,
    //             uom: dataRow.uom,
    //             quantity: newQuantity,
    //             price: dataRow.price,
    //             amount: newQuantity * dataRow.price,
    //             total: newQuantity * dataRow.price,
    //             _coefficient: dataRow._coefficient,
    //         }

    //         if (uom) {
    //             const _uomRow = _uoms?.find((item: XTSProductUOMRow) => item.uom?.id === uom.id)
    //             newRow._coefficient = _uomRow?.coefficient || 1
    //             newRow.price = dataRow._price * newRow._coefficient
    //             newRow.amount = dataRow.quantity * newRow.price
    //             newRow.total = newRow.amount
    //         }

    //         const newDataRow = createXTSObject('XTSOrderProductRow', newRow)
    //         props.updateRow(tabName, newDataRow)

    //     }
    // }

    const uomOnChange = (data: any) => {
        console.log('uomOnChange', data)
        changeRowData({ uom: data })
    }

    const [openPopConfirm, setOpenPopConfirm] = useState(false)

    /////////////////////////////////////////////
    // Row deletion

    const deleteConfirm = (e: any) => {
        console.log('deleteConfirm')
        e.stopPropagation()
        setOpenPopConfirm(false)

        props.deleteRow(tabName, dataRow._lineNumber)
    }

    const deleteCancel = (e: any) => {
        console.log('deleteCancel')
        e.stopPropagation()
        setOpenPopConfirm(false)
    }

    /////////////////////////////////////////////
    // 

    useEffect(() => {
        // setQuantity(dataRow.quantity)
        setAmount(dataRow.amount)
        setTotal(dataRow.total)
        setUOM(dataRow.uom)
        setCharacteristic(dataRow.characteristic)
    }, [dataRow])

    /////////////////////////////////////////////
    // 

    return (
        <div className='order-inventory-edit'
        // style={{ overflowY: 'auto', margin: '0px' }}
        >
            <Card className='order-inventory-edit-card'>
                <div style={{ margin: 10, width: 22, }}>
                    #{dataRow._lineNumber}
                </div>

                <div className='order-inventory-edit-card-picture'>
                    <Image
                        className='order-inventory-edit-card-picture-image'
                        width='100%'
                        height='auto'
                        src={fileStorageURL + dataRow._picture?.presentation}
                        fallback=''
                    />
                </div>

                <div className='order-inventory-edit-card-info'>
                    <div className='product-row-edit-card-info-description'>
                        {dataRow.product?.presentation}
                    </div>

                    <div className='order-inventory-edit-quantity'>

                        <div>
                            <div className='order-inventory-edit-quantity-title-short'>SL: </div>
                            <div className='order-inventory-edit-quantity-title-long'>Số lượng: </div>
                        </div>

                        <div className='order-inventory-edit-quantity-group'>

                            <FormSelect
                                itemName='uom'
                                prefix={dataRow._lineNumber.toString()}
                                dataType='XTSObjectId'
                                options={uomOptions}
                                itemProps={{
                                    // label: 'Đơn vị tính',
                                    required: false,
                                    className: 'order-inventory-edit-uom'
                                    // style: { width: '100px', marginBottom: '0px' }
                                }}
                                selectProps={{
                                    placeholder: 'Chọn đơn vị tính',
                                    required: true,
                                    onChange: uomOnChange
                                }}
                                form={props.form}
                                dataObject={dataRow}
                            />
                        </div>
                        <AmountInput
                            dataObject={dataRow}
                            itemName='quantity'
                            min={0}
                            // max={dataRow.amount}
                            title='Nhập số lượng'
                            description='Số lượng'
                            // renderKey={renderKey}
                            onChange={(quantity) => changeRowData({ quantity })}
                        />

                    </div>

                    <div className='order-inventory-edit-price'>

                        <div>Đơn giá (đồng/c.):</div>
                        <AmountInput
                            dataObject={dataRow}
                            itemName='_price'
                            min={0}
                            // max={dataRow.amount}
                            title='Nhập đơn giá (chiếc)'
                            description='Đơn giá (chiếc)'
                            // renderKey={renderKey}
                            onChange={(price) => changeRowData({ price })}
                        />
                    </div>

                    <div className='order-inventory-edit-amount'>
                        <div>Thành tiền: </div>
                        <b>{dataRow.amount?.toLocaleString('vi-VN')} đồng</b>
                    </div>
                </div>

                {/* <div>Hệ số: {dataRow._coefficient}</div>
                <div>Thuế suất GTGT: {dataRow.vatRate?.presentation}</div>
                <div>Giá trị thuế suất: {dataRow._vatRateRate}</div>
                <div>Thuế GTGT: {dataRow.vatAmount}</div>
                <div>Chiết khấu tự động: {dataRow.automaticDiscountAmount}</div>
                <div>Chiết khấu thủ công: {dataRow.discountsMarkupsAmount}</div>
                <div>Đơn vị tính: {dataRow.uom?.presentation}</div> */}

            </Card >
        </div >
    )
}

/////////////////////////////////////////////
// Export's

