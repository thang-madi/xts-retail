
import { XTSObject, XTSObjectId, XTSObjectRow, XTSRecord, XTSRecordKey, XTSRequest, XTSResponse } from "./types-common"
// import { createXTSObject } from "./common-use"
// import { XTSFile } from "./types-library"

// Tạm thời không cần dùng ???
export function getXTSClass_Application(_type: string) {

    try {
        const XTSClass = eval(`${_type}`)
        return XTSClass
    } catch (error) {
        //         
    }
}

// OK
export class XTSProduct extends XTSObject {

    description: string = ''
    descriptionFull: string = ''
    sku: string = ''
    comment: string = ''
    productType: XTSObjectId = new XTSObjectId('XTSProductType')
    productCategory: XTSObjectId = new XTSObjectId('XTSProductCategory')
    measurementUnit: XTSObjectId = new XTSObjectId('XTSUOMClassifier')
    picture: XTSObjectId = new XTSObjectId('XTSProductAttachedFile')
    _price: number = 0
    _priceKind: XTSObjectId = new XTSObjectId('XTSPriceKind')
    _vatRate: XTSObjectId = new XTSObjectId('XTSVATRate')
    _vatRateRate: number = 0
    _uoms: XTSProductUOMRow[] = []
    _characteristics: XTSObjectId[] = []
    _prices: XTSPriceRow[] = []
    _pictures: XTSFileRow[] = []

    constructor() {
        super('XTSProduct')
    }
}

// OK
export class XTSProductUOMRow extends XTSObjectRow {

    uom?: XTSObjectId
    coefficient: number = 0

    constructor() {
        super('XTSProductUOMRow')
    }
}

// 
export class XTSProductCharacteristic extends XTSObject {

    description: string = ''
    _price: number = 0

    constructor() {
        super('XTSProductCharacteristic')
    }
}

// OK
export class XTSPriceRow extends XTSObjectRow {

    product: XTSObjectId = new XTSObjectId('XTSProduct')
    characteristic: XTSObjectId = new XTSObjectId('XTSProductCharacteristic')
    priceKind: XTSObjectId = new XTSObjectId('XTSPriceKind')
    measurementUnit: XTSObjectId = new XTSObjectId('XTSUOMClassifier')
    price: number = 0

    constructor() {
        super('XTSPriceRow')
    }
}

// OK
export class XTSFileRow extends XTSObjectRow {

    file: XTSObjectId = new XTSObjectId('XTSFile')
    fileName: string = ''
    extension: string = ''
    size: number = 0

    constructor() {
        super('XTSFileRow')
    }
}

// OK
export class XTSCounterparty extends XTSObject {

    code: string = ''
    description: string = ''
    descriptionFull: string = ''
    counterpartyKind: XTSObjectId = new XTSObjectId('XTSCounterpartyKind')
    gender: XTSObjectId = new XTSObjectId('XTSGender')
    employeeResponsible: XTSObjectId = new XTSObjectId('XTSEmployeeResponsible')
    dateOfBirth: string = '0001-01-01T00:00:00'
    comment: string = ''
    taxIdentifactionNumber: string = ''
    invalid: boolean = false
    mainInfo: string = ''
    customer: boolean = false
    vendor: boolean = false
    otherRelations: boolean = false
    phone: string = ''
    email: string = ''
    address: string = ''
    addressValue: string = ''
    picture: XTSObjectId = new XTSObjectId('XTSCounterpartyAttachedFile')

    constructor() {
        super('XTSCounterparty')
    }

    dateFields(): string[] {
        const result: string[] = ['dateOfBirth']
        return result
    }
}

// OK
export class XTSOrder extends XTSObject {

    date: string = '0001-01-01T00:00:00'
    number: string = ''

    operationKind: XTSObjectId = new XTSObjectId('XTSOperationKindsSalesOrder')
    orderKind: XTSObjectId = new XTSObjectId('XTSSalesOrderKind')
    priceKind: XTSObjectId = new XTSObjectId('XTSPriceKind')
    orderState: XTSObjectId = new XTSObjectId('XTSSalesOrderState')

    company: XTSObjectId = new XTSObjectId('XTSCompany')
    customer: XTSObjectId = new XTSObjectId('XTSCounterparty')
    documentCurrency: XTSObjectId = new XTSObjectId('XTSCurrency')
    documentAmount: number = 0
    vatTaxation: XTSObjectId = new XTSObjectId('XTSVATTaxation')
    rate: number = 1
    multiplicity: number = 1
    comment: string = ''
    author: XTSObjectId = new XTSObjectId('XTSUser')
    shipmentDate: string = '0001-01-01T00:00:00'
    deliveryAddress: string = ''
    deliveryAddressValue: string = ''
    cash: number = 0
    bankTransfer: number = 0
    postPayment: number = 0
    paymentNote: string = ''
    inventory: XTSOrderProductRow[] = []
    externalAccount: XTSObjectId = new XTSObjectId('XTSExternalAccount')
    employeeResponsible: XTSObjectId = new XTSObjectId('XTSEmployee')
    _receiptableIncrease: number = 0
    _receiptableDecrease: number = 0
    _receiptableBalance: number = 0

    constructor() {
        super('XTSOrder')
    }
}

// OK
export class XTSOrderProductRow extends XTSObjectRow {

    _lineNumber: number = 0
    product: XTSObjectId = new XTSObjectId('XTSProduct')
    characteristic: XTSObjectId = new XTSObjectId('XTSProductCharacteristic')
    vatRate: XTSObjectId = new XTSObjectId('XTSVATRate')
    uom: XTSObjectId = new XTSObjectId('XTSMeasurementUnit')
    quantity: number = 1
    comment: string = ''
    price: number = 0
    amount: number = 0
    automaticDiscountAmount: number = 0
    discountsMarkupsAmount: number = 0
    vatAmount: number = 0
    total: number = 0

    _coefficient: number = 0
    _price: number = 0
    _vatRateRate: number = 0
    _picture: XTSObjectId = new XTSObjectId('XTSFile')

    constructor() {
        super('XTSOrderProductRow')
    }
}

// OK
export class XTSUOMClassifier extends XTSObject {

    description: string = ''
    code: string = ''

    constructor() {
        super('XTSUOMClassifier')
    }
}

// OK
export class XTSMeasurementUnit extends XTSObject {

    description: string = ''
    coefficient: number = 0

    constructor() {
        super('XTSMeasurementUnit')
    }
}

// 
export class XTSCompany extends XTSObject {

    description: string = ''
    phone: string = ''
    address: string = ''
    email: string = ''

    constructor() {
        super('XTSCompany')
    }
}

// 
export class XTSIndividual extends XTSObject {

    description: string = ''
    fullName: string = ''
    dateOfBirth: string = '0001-01-01T00:00:00'
    phone: string = ''
    email: string = ''
    address: string = ''

    constructor() {
        super('XTSIndividual')
    }
}

// OK
export class XTSCart extends XTSRecord {

    recordKey?: XTSRecordKey

    date: string = ''
    externalAccount: XTSObjectId = new XTSObjectId('XTSExternalAccount')
    company: XTSObjectId = new XTSObjectId('XTSCompany')
    customer: XTSObjectId = new XTSObjectId('XTSCounterparty')
    product: XTSObjectId = new XTSObjectId('XTSProduct')
    characteristic: XTSObjectId = new XTSObjectId('XTSProductCharacteristic')
    uom: XTSObjectId = new XTSObjectId('XTSUOMClassifier')
    vatRate: XTSObjectId = new XTSObjectId('XTSVATRate')
    coefficient: number = 0
    quantity: number = 0
    price: number = 0
    amount: number = 0
    total: number = 0
    selected: boolean = false
    _picture: XTSObjectId = new XTSObjectId('XTSFile')

    constructor() {
        super('XTSCart')
    }
}

// OK
export class XTSExternalAccount extends XTSObject {

    description: string = ''
    customer: XTSObjectId = new XTSObjectId('XTSCounterparty')
    user: XTSObjectId = new XTSObjectId('XTSUser')
    id: string = ''

    constructor() {
        super('XTSExternalAccount')
    }
}

// OK
export class XTSConnectUserRequest extends XTSRequest {

    externalAccount: XTSObjectId = new XTSObjectId('XTSExternalAccount')
    customer?: XTSObjectId = new XTSObjectId('XTSConterparty')
    user?: XTSObjectId = new XTSObjectId('XTSUser')

    constructor() {
        super('XTSConnectUserRequest')
    }
}

// OK
export class XTSConnectUserResponse extends XTSResponse {

    externalAccount: XTSObjectId = new XTSObjectId('XTSExternalAccount')
    customer?: XTSObjectId = new XTSObjectId('XTSConterparty')
    employee?: XTSObjectId = new XTSObjectId('XTSEmployee')
    user?: XTSObjectId = new XTSObjectId('XTSUser')
    defaultValues?: any

    constructor() {
        super('XTSConnectUserResponse')
    }
}

// OK
export class XTSEmployee extends XTSObject {

    description: string = ''
    invalid: boolean = false
    individual: XTSObjectId = new XTSObjectId('XTSIndividual')
    parentCompany: XTSObjectId = new XTSObjectId('XTSCompany')
    headEmployee: XTSObjectId = new XTSObjectId('XTSEmployee')

    constructor() {
        super('XTSEmployee')
    }
}