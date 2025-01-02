/////////////////////////////////////////////
// Standard's

import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Input, Button, Modal, List, Card, Space, FloatButton, Descriptions, Popconfirm, Image } from 'antd'
import { CheckCircleOutlined, CloseCircleOutlined, CloudUploadOutlined, FileDoneOutlined, MinusCircleOutlined, MinusOutlined, PlusCircleOutlined, PlusOutlined } from '@ant-design/icons'

/////////////////////////////////////////////
// Application's

// import ChoicePage from '../../hocs/choice-page'
import BackButton from '../../components/BackButton'
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


/////////////////////////////////////////////
// Object's



/////////////////////////////////////////////
// Main components

// OK
export const OrderProductRowView: React.FC<any> = (props) => {

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
export const OrderProductRowEditPage: React.FC<any> = (props) => {

    const { dataRow, modalProps } = props
    // const [pageId] = useState(generateUUID())

    // const dispatch = useDispatch()

    // console.log('CustomersPage.pageId', pageId)

    const stepBack = () => {
        props.updateObjectRow()
        // dispatch(setPageInfo({ pageId: props.pageOwnerId }))        // Cần xem lại 
    }

    const createPageParams: UseCreatePageParams = {
    }
    const { form } = useCreatePage(createPageParams)

    // const updateUOMs = () => {

    //     // console.log('uoms 1', uoms)

    //     // uoms
    //     uoms.splice(0, uoms.length)
    //     if (productData) {
    //         if (productData._uoms?.length > 0) {
    //             for (let uomRow of productData._uoms) {
    //                 uoms.push({ uom: uomRow.uom, coefficient: uomRow.coefficient })
    //             }
    //         } else {
    //             let uom = productData.measurementUnit
    //             console.log('uom', uom)
    //             uom = { id: uom.id, dataType: uom.dataType, presentation: uom.presentation }
    //             const coefficient = 1
    //             uoms.push({ uom, coefficient })
    //         }
    //     } else {
    //         const uom = { id: row.uom_id, dataType: row.uom_dataType, presentation: row.uom_presentation, _type: 'XTSObjectId' }
    //         const coefficient = row.coefficient
    //         uoms.push({ uom, coefficient })
    //     }

    //     // console.log('uoms 2', uoms)

    //     // update uomOptions
    //     const _uomOptions = []
    //     for (let uomRow of uoms) {
    //         const { uom, coefficient } = uomRow
    //         const label = uom.presentation
    //         const value = { id: uom.id, dataType: uom.dataType, presentation: uom.presentation, _type: 'XTSObjectId' }
    //         _uomOptions.push({ label, value })
    //     }
    //     setUOMOptions(_uomOptions)
    // }

    // useEffect(() => {

    //     const rowData = (dataRow._lineNumber) && { ...dataRow, uom: dataRow.uom_id } ||
    //     {
    //         product: null,
    //         price: 0,
    //         quantity: 1,
    //         total: 0,
    //         _coefficient: 1,
    //         _lineNumber: 0,
    //         uom: null
    //     }

    //     console.log('rowData', rowData)
    //     // console.log('modalProps', modalProps)

    //     if (modalProps.open) {
    //         form.setFieldsValue(rowData)
    //     }
    //     // updateUOMs()
    // }, [dataRow])

    // const {
    //     choiceOpen,
    //     openChoicePage,
    //     closeChoicePage,
    //     initialItemValue,
    //     chosenItemValues,
    //     setChosenItemValues,
    // } = useChoicePage()

    // const productId = (chosenItemValues?.product) && chosenItemValues?.product?.id || row.product_id

    // const productData = useSelector(state =>
    //     state.products.items[productId]
    // )
    // console.log('productData', productData)

    const [uomOptions, setUOMOptions] = useState()

    // useEffect(() => {
    //     if (productData) {
    //         updateUOMs()
    //         if (uoms.length > 0) {
    //             const { uom, coefficient } = uoms[0]
    //             let newValues = {
    //                 price: productData._price,
    //                 uom: uom.id,
    //                 uom_dataType: uom.dataType,
    //                 uom_id: uom.id,
    //                 uom_presentation: uom.presentation,
    //                 _price: productData._price,
    //                 _coefficient: coefficient,
    //             }
    //             form.setFieldsValue(newValues)
    //         }
    //         const { _vatRate, _vatRateRate } = productData
    //         if (_vatRate) {
    //             const { uom, coefficient } = uoms[0]
    //             // console.log('uoms', uoms)
    //             let newValues = {
    //                 vatRate: _vatRate.presentation,
    //                 vatRate_id: _vatRate.id,
    //                 // vatRate_type: _vatRate._type,
    //                 vatRate_presentation: _vatRate.presentation,
    //                 vatRate_dataType: _vatRate.dataType,
    //                 _vatRateRate: _vatRateRate || 0,
    //             }
    //             // console.log(newValues)
    //             form.setFieldsValue(newValues)
    //         }
    //         updateAmount()
    //         // const values = form.getFieldsValue()
    //         // console.log('values', values)
    //     }
    // }, [productData])

    // const changeUOM = (option) => {
    //     const selectedUOM = uoms.find(item => item.value.uom?.id === option?.value?.id)
    //     console.log('option - uoms', uoms)
    //     // if (selectedUOM) {
    //     form.setFieldValue('_coefficient', selectedUOM?.coefficient)
    //     updateAmount()
    //     // }
    // }

    // finish
    // Hàm sự kiện khi bấm nút Hoàn thành (Ghi lại) trên Form
    const finish = ((values: any) => {
        const formValues = { ...values }
        formValues['uom'] = formValues['uom_presentation']
        props.updateOrderProductRow(formValues)
        // dispatch(setPageInfo({ pageId: props.pageOwnerId }))         // Cần xem lại
    })

    // finishFailed
    // Hàm sự kiện khi có lỗi trên Form
    const finishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    }

    const deleteOrderProductRow = () => {
        props.deleteOrderProductRow(dataRow._lineNumber)
    }

    // const cancel = () => {
    //     props.updateOrderProductRow()
    // }

    // // Hàm sự kiện khi bấm nút OK trên biểu mẫu Modal ChoicePage
    // const handleOk = (value: any) => {
    //     closeChoicePage();
    // }

    // // Hàm sự kiện khi bấm nút Cancel trên biểu mẫu Modal ChoicePage
    // const handleCancel = () => {
    //     closeChoicePage()
    // }

    const updateAmount = () => {
        const formValues = form.getFieldsValue()
        const price = formValues._price * formValues._coefficient
        console.log('formValues', formValues)
        const { discountsMarkupsAmount = 0, automaticDiscountAmount = 0, _vatRateRate = 0 } = formValues
        const amount = formValues.quantity * price - discountsMarkupsAmount - automaticDiscountAmount
        const vatAmount = Math.round(amount * _vatRateRate / (100 + _vatRateRate) * 100) / 100
        const newValues = {
            price,
            vatAmount,
            discountsMarkupsAmount,
            automaticDiscountAmount,
            amount,
            total: amount,
        }
        form.setFieldsValue(newValues)
    }

    /////////////////////////////////////////////
    // props

    const commonItemProps = { form, dataObject: dataRow }

    /////////////////////////////////////////////
    //  

    return (
        <Modal
            {...modalProps}
        >
            <div style={{ height: '80vh', overflowY: 'auto' }} >
                <Card>
                    {/* <BackButton stepBack={stepBack} /> */}
                    {/* <OrderProductRowCard
                        row={row}
                    /> */}

                    <Form
                        onFinish={finish}
                        onFinishFailed={finishFailed}
                        form={form}
                    >
                        <FormInput
                            itemName='_lineNumber'
                            dataType='Number'
                            itemProps={{
                                label: 'Số thứ tự',
                            }}
                            inputNumberProps={{
                                placeholder: '',
                                readOnly: true
                            }}
                            {...commonItemProps}
                        />

                        <FormInput
                            itemName='product'
                            dataType='XTSProduct'
                            itemProps={{
                                label: 'Sản phẩm',
                                required: true,
                            }}
                            inputProps={{
                                placeholder: 'Nhập sản phẩm',
                                allowClear: true,
                                required: true,
                            }}
                            {...commonItemProps}
                        />

                        <FormInput
                            itemName='vatRate'
                            dataType='XTSVATRate'
                            itemProps={{
                                label: 'Thuế suất GTGT',
                                required: false,
                            }}
                            inputNumberProps={{
                                placeholder: 'Thuế suất GTGT',
                                required: false,
                                onChange: updateAmount,
                            }}
                            {...commonItemProps}
                        />

                        <FormInput
                            itemName='_vatRateRate'
                            dataType='Number'
                            itemProps={{
                                label: 'Thuế suất GTGT',
                                required: false,
                            }}
                            inputNumberProps={{
                                placeholder: 'Thuế suất GTGT',
                                required: false,
                                onChange: updateAmount,
                            }}
                            {...commonItemProps}
                        />

                        <FormSelect
                            itemName='uom'
                            dataType='XTSUOMClassifier'
                            options={uomOptions}
                            itemProps={{
                                label: 'Đơn vị tính',
                                required: true,
                            }}
                            selectProps={{
                                // placeholder: 'Nhập đơn vị tính',
                                // allowClear: true,
                                required: true,
                                // onChange: changeUOM
                            }}
                            {...commonItemProps}
                        />

                        <FormInput
                            itemName='quantity'
                            dataType='Number'
                            itemProps={{
                                label: 'Số lượng',
                                required: true,
                            }}
                            inputNumberProps={{
                                placeholder: 'Nhập số lượng',
                                required: true,
                                onChange: updateAmount,
                            }}
                            {...commonItemProps}
                        />

                        <FormInput
                            itemName='_coefficient'
                            dataType='Number'
                            itemProps={{
                                label: 'Hệ số',
                                required: true,
                            }}
                            inputNumberProps={{
                                placeholder: '',
                                // allowClear: true,
                                required: true,
                                readOnly: true,
                                onChange: updateAmount,
                            }}
                            {...commonItemProps}
                        />

                        <FormInput
                            itemName='_price'
                            dataType='Number'
                            itemProps={{
                                label: 'Đơn giá (chiếc)',
                                required: true,
                            }}
                            inputNumberProps={{
                                placeholder: 'Nhập đơn giá (chiếc)',
                                required: false,
                                onChange: updateAmount,
                            }}
                            {...commonItemProps}
                        />

                        <FormInput
                            itemName='price'
                            dataType='Number'
                            itemProps={{
                                label: 'Đơn giá (ĐVT)',
                                required: true,
                            }}
                            inputNumberProps={{
                                placeholder: 'Nhập đơn giá (ĐVT)',
                                required: false,
                                onChange: updateAmount,
                            }}
                            {...commonItemProps}
                        />

                        <FormInput
                            itemName='vatAmount'
                            dataType='Number'
                            itemProps={{
                                label: 'Thuế GTGT',
                                required: false,
                            }}
                            inputNumberProps={{
                                placeholder: 'Nhập thuế GTGT',
                                required: false,
                                onChange: updateAmount,
                            }}
                            {...commonItemProps}
                        />

                        <FormInput
                            itemName='automaticDiscountAmount'
                            dataType='Number'
                            itemProps={{
                                label: 'Chiết khấu tự động',
                                required: false,
                            }}
                            inputNumberProps={{
                                placeholder: 'Nhập chiết khấu tự động',
                                required: false,
                                onChange: updateAmount,
                            }}
                            {...commonItemProps}
                        />

                        <FormInput
                            itemName='discountsMarkupsAmount'
                            dataType='Number'
                            itemProps={{
                                label: 'Chiết khấu thủ công',
                                required: false,
                            }}
                            inputNumberProps={{
                                placeholder: 'Nhập chiết khấu thủ công',
                                required: false,
                                onChange: updateAmount,
                            }}
                            {...commonItemProps}
                        />

                        <FormInput
                            itemName='amount'
                            dataType='Number'
                            itemProps={{
                                label: 'Thành tiền',
                                required: false,
                            }}
                            inputNumberProps={{
                                placeholder: 'Tính thành tiền',
                                required: false,
                                onChange: updateAmount,
                            }}
                            {...commonItemProps}
                        />

                        <FormInput
                            itemName='total'
                            dataType='Number'
                            itemProps={{
                                label: 'Tổng số',
                            }}
                            inputNumberProps={{
                                placeholder: 'Tính tổng số',
                                readOnly: true,
                                required: true,
                            }}
                            {...commonItemProps}
                        />

                        <Space>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" style={{ display: 'none' }} />
                                {/* <FloatButton
                                    type='default'
                                    onClick={() => { form.submit() }}
                                    icon={<FileDoneOutlined />}
                                /> */}
                            </Form.Item>
                            {/* <RowEditMenu
                                finish={() => { form.submit() }}
                                deleteRow={deleteOrderProductRow}
                                stepBack={stepBack}
                            /> */}
                        </Space>

                    </Form>

                </Card >
            </div>
        </Modal >
    )
}

// 
export const OrderProductRowEdit: React.FC<XTSObjectRowProps> = (props) => {

    const dataRow = props.dataRow as XTSOrderProductRow

    const fileStorageURL = useSelector((state: RootState) => state.session.fileStorageURL)

    // console.log('OrderProductRowEdit.props', props)

    // const [pageId] = useState(generateUUID())
    // const dispatch = useDispatch()

    const tabName = 'inventory'

    const [quantity, setQuantity] = useState<number>(dataRow.quantity)
    const [amount, setAmount] = useState<number>(dataRow.amount)
    const [total, setTotal] = useState<number>(dataRow.total)
    const [uom, setUOM] = useState<XTSObjectId>(dataRow.uom)
    const [characteristic, setCharacteristic] = useState<XTSObjectId>(dataRow.characteristic)

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

    const changeRowData = (newData: _ChangeData): void => {

        const { delta, characteristic, uom } = newData

        const newQuantity = quantity + (delta || 0)
        if (newQuantity <= 0) {
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

            // console.log('OrderProductRowEdit.newRow', newRow)

            // const rowItem = {
            //     _lineNumber: dataRow._lineNumber,
            //     product: dataRow.product,
            //     characteristic: dataRow.characteristic,
            //     uom: dataRow.product,
            //     coefficient: dataRow.coefficient,
            //     vatRate: dataRow.vatRate,
            //     vatRateRate: dataRow.vatRateRate,
            //     vatAmount: dataRow.vatAmount,
            //     price: dataRow.price,
            //     quantity: dataRow.quantity,
            //     automaticDiscountAmount: dataRow.automaticDiscountAmount,
            //     discountsMarkupsAmount: dataRow.discountsMarkupsAmount,
            //     amount: dataRow.amount,
            //     total: dataRow.total,
            // }

            // const newDataRow = createXTSObject('XTSOrderProductRow',
            //     {
            //         ...dataRow,
            //         quantity: newQuantity,
            //         amount: newAmout,
            //         total: newTotal,
            //         characteristic: newCharacteristic,
            //         uom: newUOM
            //     })

            const newDataRow = createXTSObject('XTSOrderProductRow', newRow)

            // console.log('OrderProductRowEdit.newDataRow', newDataRow)

            // props.updateOrderProductRow(xtsObjectToFormData(rowItem))
            // console.log('rowData 1', rowData)
            props.updateRow(tabName, newDataRow)

            // setQuantity(newQuantity)
            // setTotal(newTotal)
            // setAmount(newAmout)
            // setCharacteristic(newCharacteristic)
            // setUOM(newUOM)
        }
    }

    // const {
    //     choiceOpen,
    //     openChoicePage,
    //     closeChoicePage,
    //     initialItemValue,
    //     chosenItemValues,
    //     setChosenItemValues,
    // } = useChoicePage()

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
        setQuantity(dataRow.quantity)
        setAmount(dataRow.amount)
        setTotal(dataRow.total)
        setUOM(dataRow.uom)
        setCharacteristic(dataRow.characteristic)
    }, [dataRow])

    /////////////////////////////////////////////
    // 

    return (
        <div style={{ overflowY: 'auto', margin: '0px' }} >
            <Card
                style={{ margin: '0px', height: '122px' }}
                styles={{ body: { padding: '0px' } }}
            >
                <div style={{ display: 'flex', width: '100%', alignItems: 'center' }}>
                    <div style={{ margin: 10, width: 22, }}>
                        #{dataRow._lineNumber}
                    </div>

                    <div style={{ width: '120px', height: '120px', overflow: 'hidden', }}>
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

                    <div style={{ paddingLeft: '15px', paddingRight: '20px', flexGrow: 1, }}>

                        <div style={{ fontWeight: 'bold' }}>{dataRow.product?.presentation}</div>

                        <Space className='edit-page-quantity'>

                            <div>
                                <div className='edit-page-quantity-title-short'>SL: </div>
                                <div className='edit-page-quantity-title-long'>Số lượng: </div>
                            </div>

                            <Space className='edit-page-quantity-group'>
                                <Button
                                    htmlType='button'
                                    onClick={(e) => handleChangeData(e, { delta: -1 })}
                                    icon={<MinusOutlined style={{ fontSize: '10px' }} />}
                                />

                                <Popconfirm
                                    open={openPopConfirm}
                                    title="Xóa bỏ mặt hàng"
                                    description="Bạn muốn xóa bỏ mặt hàng này?"
                                    onConfirm={deleteConfirm}
                                    onCancel={deleteCancel}
                                    okText="Có"
                                    cancelText="Không"
                                >
                                    <b><div>{quantity}</div></b>
                                </Popconfirm>

                                <Button
                                    htmlType='button'
                                    onClick={(e) => handleChangeData(e, { delta: 1 })}
                                    icon={<PlusOutlined style={{ fontSize: '10px' }} />}
                                />

                                <FormSelect
                                    itemName='uom'
                                    prefix={dataRow._lineNumber.toString()}
                                    dataType='XTSObjectId'
                                    options={uomOptions}
                                    itemProps={{
                                        // label: 'Đơn vị tính',
                                        required: false,
                                        style: { width: '100px', marginBottom: '0px' }
                                    }}
                                    selectProps={{
                                        placeholder: 'Chọn đơn vị tính',
                                        required: true,
                                        onChange: uomOnChange
                                    }}
                                    form={props.form}
                                    dataObject={dataRow}
                                />
                            </Space>
                        </Space>

                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div>Đơn giá theo chiếc:</div>
                            <div>{dataRow._price} đồng</div>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div>Thành tiền: </div>
                            {/* <div><b>{dataRow.amount} đồng</b></div> */}
                            <b>{dataRow.amount?.toLocaleString('vi-VN')} đồng</b>
                        </div>
                    </div>

                    <Space direction='vertical' style={{ minWidth: 120 }}>
                        {/* <div>{dataRow.product?.presentation}</div> */}
                        {/* <div>Đơn giá (c): {dataRow._price}</div> */}
                        {/* <div>Thành tiền: {amount}</div> */}
                        {/* <div>Đơn giá (đvt): {dataRow.price}</div> */}
                        {/* <div>Tổng số: {total}</div> */}
                    </Space>

                </div >

                {/* <Space > */}
                {/* <Space direction='vertical' style={{ width: 100 }} >
                        <Image
                            src={fileStorageURL + dataRow._picture?.presentation}
                            alt='Picture'
                            preview={false}
                            height={120}
                            style={{ margin: 0 }}
                        />
                    </Space> */}

                <Space direction='vertical' style={{ minWidth: 90 }}>
                    {/* <FormSelect
                            itemName='uom'
                            prefix={dataRow._lineNumber.toString()}
                            dataType='XTSObjectId'
                            options={uomOptions}
                            itemProps={{
                                // label: 'Đơn vị tính',
                                required: false,
                            }}
                            selectProps={{
                                placeholder: 'Chọn đơn vị tính',
                                required: true,
                                onChange: uomOnChange
                            }}
                            form={props.form}
                            dataObject={dataRow}
                        /> */}

                </Space>

                {/* <div>Hệ số: {dataRow._coefficient}</div>
                <div>Thuế suất GTGT: {dataRow.vatRate?.presentation}</div>
                <div>Giá trị thuế suất: {dataRow._vatRateRate}</div>
                <div>Thuế GTGT: {dataRow.vatAmount}</div>
                <div>Chiết khấu tự động: {dataRow.automaticDiscountAmount}</div>
                <div>Chiết khấu thủ công: {dataRow.discountsMarkupsAmount}</div>
                <div>Đơn vị tính: {dataRow.uom?.presentation}</div> */}





                {/* <ChoicePage
                    modalProps={{
                        centered: true,
                        title: 'Chọn phần tử',
                        open: choiceOpen,
                        footer: []
                    }}
                    initialItemValue={initialItemValue}
                    closeChoicePage={closeChoicePage}
                    form={form}
                    chosenItemValues={chosenItemValues}
                    setChosenItemValues={setChosenItemValues}
                    pageOwnerId={pageId}
                /> */}
            </Card >
        </div >
    )
}

/////////////////////////////////////////////
// Export's

