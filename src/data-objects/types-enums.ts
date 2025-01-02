
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