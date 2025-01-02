/////////////////////////////////////////////
// Standard's

import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Form, Input, Button, Space, Card, Select, Tabs, Typography } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
// import Password from 'antd/es/input/Password'
// import { IdcardOutlined, KeyOutlined, PhoneOutlined } from '@ant-design/icons'

/////////////////////////////////////////////
// Application's

// import { apiRequest, actions, } from '../../data-storage/slice-session'
import { getLocalDeviceId, getLocalUserToken } from '../../commons/users'
import { Loader } from '../../components/Loader'
import { RootState } from '../../data-storage'
import { requestData_ByDataItem } from '../../data-objects/request-data'
import { getXTSSlice } from '../../data-storage/xts-mappings'

/////////////////////////////////////////////
// Object's




/////////////////////////////////////////////
// Main component

// function ConnectPage() {
const ConnectPage: React.FC<any> = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()

    const [loading, setLoading] = useState(true)

    const deviceId = getLocalDeviceId()
    // const userToken = getLocalUserToken()

    // Sau khi đăng nhập thành công thì chuyển đến trang trước
    const { path } = location?.state || { path: '/home' }
    const { user, telegramId, zaloId, phone } = useSelector((state: RootState) => state.session)
    useEffect(() => {
        if (user) {
            navigate(path, { replace: true })
        }
        setLoading(false)
    }, [user])

    // const externalAccountId = useSelector(state => state.session.externalAccountId) || null
    // const telegramId = useSelector(state => state.session.telegramId) || null
    // const TWA = window.Telegram.WebApp
    // const telegramId = TWA.initDataUnsafe.user?.id || ''
    // const zaloId = null

    // const telegramId = useSelector(state => state.session.telegramId)
    // const zaloId = useSelector(state => state.session.zaloId)
    // const phone = useSelector(state => state.session.phone)

    const checkSignIn = (dataItem: any) => {
        const requestData = requestData_ByDataItem('XTSSignInRequest', dataItem)
        const { sliceName, apiRequest, actions } = getXTSSlice('XTSSession')
        dispatch(actions.setTemp(null))
        dispatch(apiRequest(requestData))
    }

    // Hàm xử lý đăng nhập
    const onFinish = ((values: any) => {
        const userName = values.userName
        const password = values.password

        const dataItem = { deviceId, userName, password, telegramId, zaloId, phone }
        console.log('SignIn', dataItem)

        checkSignIn(dataItem)
    })

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    }

    // const cancel = () => {

    // }


    return (
        <div >

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Typography.Title level={5}>
                    Kết nối người dùng nội bộ
                </Typography.Title>
            </div>

            <Loader isLoading={loading} />

            <Form
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                layout='vertical'
                // align='center'
                className={(loading) && 'hidden' || '_'}
            >
                <Space direction='vertical' align='center' style={{ marginTop: '30px', width: '100%' }} >

                    <Card>
                        <Form.Item
                            label='Tên đăng nhập'
                            name='userName'
                            initialValue='Test'
                            style={{ width: '210px' }}
                        >
                            <Input
                                placeholder='Tên đăng nhập'
                                required={false}
                                style={{ width: '100%' }}
                            />
                        </Form.Item>

                        <Form.Item
                            label='Mật khẩu'
                            name='password'
                            initialValue='1'
                            style={{ width: '210px' }}
                        >
                            <Input.Password
                                placeholder='Password'
                                style={{ width: '100%' }}
                            />
                        </Form.Item>

                        <Space direction='horizontal'>
                            <Form.Item>
                                <Button block type='primary' htmlType='submit'>Đăng nhập</Button>
                            </Form.Item>
                        </Space>
                    </Card>

                </Space>
            </Form>

        </div >
    )
}

/////////////////////////////////////////////
// Export's

export default ConnectPage