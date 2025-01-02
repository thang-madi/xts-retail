import dayjs from "dayjs"

export function fillDefaultValues(object: any, defaultValues: any) {

    // console.log('defaultValues', defaultValues)
    const _type = (object) && object['_type'] || null
    if (_type === 'XTSOrder') {
        object['date'] = dayjs().format('YYYY-MM-DDTHH:mm:ss')
        object['shipmentDate'] = dayjs().format('YYYY-MM-DD')
        if (!object.customer?.id) {
            asignObject(object, defaultValues, 'customer')
        }
        asignObject(object, defaultValues, 'company')
        asignObject(object, defaultValues, 'author')
        asignObject(object, defaultValues, 'orderKind', 'salesOrderOrderKind')
        asignObject(object, defaultValues, 'orderState', 'salesOrderOrderState')
        asignObject(object, defaultValues, 'operationKind', 'salesOrderOperationKind')
        asignObject(object, defaultValues, 'employeeResponsible')
        asignObject(object, defaultValues, 'priceKind')
        asignObject(object, defaultValues, 'documentCurrency')
        asignObject(object, defaultValues, 'vatTaxation')
        asignObject(object, defaultValues, 'externalAccount')
    } else if (_type === 'XTSProduct') {
        asignObject(object, defaultValues, 'productType')
        asignObject(object, defaultValues, 'productCategory')
        asignObject(object, defaultValues, 'businessActivity')
        asignObject(object, defaultValues, 'measurementUnit', 'productsUOM')
        asignObject(object, defaultValues, '_priceKind', 'priceKind')

    } else if (_type === 'XTSCounterparty') {
        object['customer'] = true
        asignObject(object, defaultValues, 'counterpartyKind')
        object['doOperationsByContracts'] = false
        object['doOperationsByOrders'] = true
        object['doOperationsByDocuments'] = true
    } else if (_type === 'XTSCart') {
        asignObject(object, defaultValues, 'externalAccount')
        asignObject(object, defaultValues, 'company')
        asignObject(object, defaultValues, 'customer')
    }
}

function asignObject(target: any, source: any, targetAttribute: string, sourceAttribute: string | undefined = undefined) {
    if (sourceAttribute) {
        target[targetAttribute] = { ...source[sourceAttribute] }
    } else {
        target[targetAttribute] = { ...source[targetAttribute] }
    }
}

