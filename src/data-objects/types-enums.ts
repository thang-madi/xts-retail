
export function XTSEnum(_type: string): any {

    try {
        const XTSEnum = eval(`${_type}`)
        return XTSEnum
    } catch (error) {
        //
    }
}

export const XTSGender = {
    Male: {
        _type: "XTSObjectId",
        dataType: "XTSGender",
        id: "Male",
        presentation: "Nam",
    },
    Female: {
        _type: "XTSObjectId",
        dataType: "XTSGender",
        id: "Female",
        presentation: "Nữ",
    },
    Unknown: {
        _type: "XTSObjectId",
        dataType: "XTSGender",
        id: "Unknown",
        presentation: "Bí mật",
    },
}

export const XTSCounterpartyKind = {
    LegalEntity: {
        _type: "XTSObjectId",
        dataType: "XTSCounterpartyKind",
        id: "LegalEntity",
        presentation: "Doanh nghiệp",
    },
    IndividualEntrepreneur: {
        _type: "XTSObjectId",
        dataType: "XTSCounterpartyKind",
        id: "IndividualEntrepreneur",
        presentation: "Cá nhân kinh doanh",
    },
    Individual: {
        _type: "XTSObjectId",
        dataType: "XTSCounterpartyKind",
        id: "Individual",
        presentation: "Cá nhân",
    },
    StateAuthority: {
        _type: "XTSObjectId",
        dataType: "XTSCounterpartyKind",
        id: "StateAuthority",
        presentation: "Cơ quan chức năng",
    },
}

export const XTSSalesOrderState = {
    Editing: {
        _type: "XTSObjectId",
        dataType: "XTSSalesOrderState",
        id: "Editing",
        presentation: "Đang soạn",
    },
    ToPrepay: {
        _type: "XTSObjectId",
        dataType: "XTSSalesOrderState",
        id: "ToPrepay",
        presentation: "Chờ trả trước",
    },
    Preparing: {
        _type: "XTSObjectId",
        dataType: "XTSSalesOrderState",
        id: "Preparing",
        presentation: "Đang chuẩn bị",
    },
    // Transporting: {
    //     _type: "XTSObjectId",
    //     dataType: "XTSSalesOrderState",
    //     id: "Transporting",
    //     presentation: "Đang vận chuyển",
    // },
    Delivered: {
        _type: "XTSObjectId",
        dataType: "XTSSalesOrderState",
        id: "Delivered",
        presentation: "Đã giao hàng",
    },
    Completed: {
        _type: "XTSObjectId",
        dataType: "XTSSalesOrderState",
        id: "Completed",
        presentation: "Đã hoàn thành",
    },
    Delete: {
        _type: "XTSObjectId",
        dataType: "XTSSalesOrderState",
        id: "Cancelled",
        presentation: "Đã hủy",
    },
}

export const XTSStructuralUnitType = {
    Warehouse: {
        _type: "XTSObjectId",
        dataType: "XTSStructuralUnitType",
        id: "Warehouse",
        presentation: "Kho hàng",
    },
    Retail: {
        _type: "XTSObjectId",
        dataType: "XTSStructuralUnitType",
        id: "Retail",
        presentation: "Quầy bán lẻ",
    },
    RetailAccrualAccounting: {
        _type: "XTSObjectId",
        dataType: "XTSStructuralUnitType",
        id: "RetailAccrualAccounting",
        presentation: "Bán lẻ (cơ sở dồn tích)",
    },
    ShopWarehousesGroup: {
        _type: "XTSObjectId",
        dataType: "XTSStructuralUnitType",
        id: "ShopWarehousesGroup",
        presentation: "Nhóm kho cửa hàng",
    },
    Department: {
        _type: "XTSObjectId",
        dataType: "XTSStructuralUnitType",
        id: "Department",
        presentation: "Bộ phận",
    },


}

export const XTSContractKind = {
    Warehouse: {
        _type: "XTSObjectId",
        dataType: "XTSContractKind",
        id: "WithSupplier",
        presentation: "Với người bán",
    },
    Retail: {
        _type: "XTSObjectId",
        dataType: "XTSContractKind",
        id: "WithCustomer",
        presentation: "Với người mua",
    },
    RetailAccrualAccounting: {
        _type: "XTSObjectId",
        dataType: "XTSContractKind",
        id: "FromPrincipal",
        presentation: "Với người đặt ký gửi",
    },
    ShopWarehousesGroup: {
        _type: "XTSObjectId",
        dataType: "XTSContractKind",
        id: "WithAgent",
        presentation: "Với người nhận bán hộ",
    },
    Department: {
        _type: "XTSObjectId",
        dataType: "XTSContractKind",
        id: "Other",
        presentation: "Khác",
    },
}