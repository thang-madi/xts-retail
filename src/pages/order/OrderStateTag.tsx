
import React from 'react'
import { Tag } from 'antd'

interface OrderStateTagProps {
    value: string
}

function getTagClass(value: string): string {
    switch (value) {
        case 'Đang soạn': return 'order-state-tag-editing';
        case 'Chờ trả trước': return 'order-state-tag-to-prepay';
        case 'Đang chuẩn bị': return 'order-state-tag-preparing';
        case 'Đang vận chuyển': return 'order-state-tag-transporting';
        case 'Đã giao hàng': return 'order-state-tag-delivered';
        case 'Đã hoàn thành': return 'order-state-tag-completed';
        default: return 'order-state-tag-error';
    }
}

const OrderStateTag: React.FC<OrderStateTagProps> = ({ value }) => {
    const tagClass = getTagClass(value)
    return (
        <Tag className={tagClass}>
            {value}
        </Tag>
    )
}

export default OrderStateTag;
