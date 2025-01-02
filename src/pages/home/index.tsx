

/////////////////////////////////////////////
// Standard's

import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { Navigate, useLocation } from 'react-router-dom';
import { Avatar, Badge, Card, Col, Divider, FloatButton, Image, Row, Space, Statistic } from 'antd'
import debounce from 'lodash.debounce';
import dayjs from 'dayjs'
import 'dayjs/locale/vi'

import {
    BarChartOutlined,
    FileDoneOutlined,
    GroupOutlined,
    HomeOutlined,
    ReloadOutlined,
    TruckOutlined,
} from '@ant-design/icons'

/////////////////////////////////////////////
// Application's

import { capitalizeFirstLetter, dayjsToString, generateUUID } from '../../commons/common-use';
import { RootState } from '../../data-storage';
import { requestData_ByDataItem } from '../../data-objects/request-data';
import { getXTSSlice } from '../../data-storage/xts-mappings';
import { REQUEST_STATUSES } from '../../commons/enums';

/////////////////////////////////////////////
// Object's

import './index.css'
import { XTSCondition } from '../../data-objects/types-common';
import { createXTSObject, getXTSEnum, getXTSEnumItem } from '../../data-objects/common-use';
import { TWA } from '../../commons/telegram';
import { useOpenPage, UseOpenPageParams } from '../../hooks/usePage';
import { useNavigate } from 'react-router-dom';

/////////////////////////////////////////////
// Main component

const HomePage: React.FC<any> = (props) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    dayjs.locale('vi')

    const dashboard = useSelector((state: RootState) => state.report.dashboard) || {}

    // console.log('dashboardData', dashboard)

    const {
        salesAmount,
        salesOrders,
        receiptCash,
        receiptBank,
        postPayment,
        orderToPrepay,
        orderPreparing,
        orderTransporting
    } = dashboard

    /////////////////////////////////////////////
    // OpenPage

    const [pageId] = useState(generateUUID())
    const openPageParams: UseOpenPageParams = {
        pageId,
        pageName: 'Home',
        pageTitle: 'Home'
    }
    useOpenPage(openPageParams)

    /////////////////////////////////////////////
    // 

    const { company, employee, user, customer } = useSelector((state: RootState) => state.session)

    const conditions: XTSCondition[] = []
    if (company) {
        const condition = createXTSObject('XTSCondition', {
            property: 'company',
            value: company
        })
        conditions.push(condition)
    } else if (employee) {
        const condition = createXTSObject('XTSCondition', {
            property: 'employeeResponsible',
            value: employee
        })
        conditions.push(condition)
    } else if (customer) {
        const condition = createXTSObject('XTSCondition', {
            property: 'customer',
            value: customer
        })
        conditions.push(condition)
    }

    const getReportData = () => {

        const dataItem = {
            reportName: 'Dashboard',
            conditions
        }
        const requestData = requestData_ByDataItem('XTSGetReportDataRequest', dataItem)
        const { apiRequest, actions } = getXTSSlice('XTSReport')

        // console.log('requestData', requestData)
        dispatch(actions.setStatus(REQUEST_STATUSES.SENDING))
        dispatch(actions.setTemp(null))
        dispatch(apiRequest(requestData))
    }

    const refreshData = useCallback(
        debounce(() => {
            // console.log('request sent')
            getReportData()
        }, 1000), // 1000ms
        []
    )

    /////////////////////////////////////////////
    // 

    const openOrders = (orderStateId: string) => {
        const { actions } = getXTSSlice('XTSOrder')
        const orderStates = getXTSEnum('XTSSalesOrderState')
        dispatch(actions.setFilterItem({ key: 'orderState', value: orderStates[orderStateId] }))
        navigate('/orders')
    }

    /////////////////////////////////////////////
    // 

    useEffect(() => {
        getReportData()
    }, [])

    /////////////////////////////////////////////
    // 

    return (

        <div className={(TWA.isFullscreen) && 'home-page-fullscreen' || 'home-page'}>

            <div className='home-page-title'>
                {capitalizeFirstLetter(dayjs().format('dddd, DD/MM/YYYY'))}
            </div>

            <div className='home-page-group'>
                BÁN HÀNG
            </div>

            <Card className='home-page-sales-group' >
                <BarChartOutlined className='home-page-sales-icon' />
                <Statistic className='home-page-sales-value' title='Doanh số (đồng)' value={salesAmount || '-'} groupSeparator='.' prefix={''} />
                <Statistic className='home-page-sales-value' title='Số lượng đơn' value={salesOrders || '-'} groupSeparator='.' prefix={''} />
            </Card>

            <div className='home-page-group'>
                THU TIỀN KHI CHỐT ĐƠN
            </div>

            <Space className='home-page-payment-group'>

                <Card className='home-page-payment-card'>
                    <Statistic className='home-page-payment-statistic' title='Tiền mặt' value={receiptCash || '-'} groupSeparator='.' precision={0} />
                </Card>
                <Card className='home-page-payment-card'>
                    <Statistic className='home-page-payment-statistic' title='Chuyển khoản' value={receiptBank || '-'} groupSeparator='.' precision={0} />
                </Card>
                <Card className='home-page-payment-card'>
                    <Statistic className='home-page-payment-statistic' title='Trả sau' value={postPayment || '-'} groupSeparator='.' precision={0} />
                </Card>

            </Space>

            <div className='home-page-group'>
                ĐƠN HÀNG
            </div>

            <Card className='home-page-order-group'>
                <div className='home-page-order-badge' onClick={() => openOrders('ToPrepay')}>
                    <Badge count={orderToPrepay}>
                        <Avatar shape='square' size='large' icon={<FileDoneOutlined />} />
                    </Badge>
                    <div className='home-page-order-badge-title'>
                        Chờ thanh toán
                    </div>
                </div>
                <div className='home-page-order-badge' onClick={() => openOrders('Preparing')}>
                    <Badge className='home-page-order-badge' count={orderPreparing} >
                        <Avatar shape='square' size='large' icon={<GroupOutlined />} />
                    </Badge>
                    <div className='home-page-order-badge-title'>
                        Đang chuẩn bị
                    </div>
                </div>
                <div className='home-page-order-badge' onClick={() => openOrders('Delivered')}>
                    <Badge className='home-page-order-badge' count={orderTransporting} >
                        <Avatar shape='square' size='large' icon={<TruckOutlined />} />
                    </Badge>
                    <div className='home-page-order-badge-title'>
                        Đã giao hàng
                    </div>
                </div >
            </Card >

            <div className='home-page-bottom'>
                * {(company?.presentation) || employee?.presentation}
            </div>

            <FloatButton
                type='primary'
                onClick={refreshData}
                icon={<ReloadOutlined />}
            />

        </div >
    )
}

/////////////////////////////////////////////
// Export's

export default HomePage