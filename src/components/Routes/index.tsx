/////////////////////////////////////////////
// Standard's

import { Routes, Route, Outlet } from 'react-router-dom'
import { Layout } from 'antd'

/////////////////////////////////////////////
// Object's

// import CheckAuth from '../hocs/auth-checking'
// import { ParamsProvider } from '../hocs/params-provider'

import HomePage from '../../pages/home'
// import AboutPage from '../../pages/others/about'
import LandingPage from '../../pages/landing'
import LoginPage from '../../pages/user/LogIn'
import LogoutPage from '../../pages/user/LogOut'
import ConnectPage from '../../pages/user/ConnectUser'
// import SupportPage from '../../pages/others/support'
import CartsPage from '../../pages/cart'

// import CustomersListPage from '../pages/customer/customer-list'

import CustomersPage from '../../pages/customer'
// import IndividualsPage from '../../pages/individual'
import ProductsPage from '../../pages/product'
import OrdersPage from '../../pages/order'
// import ProductCharacteristicListPage from '../pages/product-characteristic/product-characteristic-list'
// import ProductCharacteristicPage from '../pages/product-characteristic/product-characteristic-view'
import UOMClassifierPage from '../../pages/uom-classifier'
import UserProfilePage from '../../pages/user/UserProfile'
import EmployeesPage from '../../pages/employee'
import SettingsPage from '../../pages/user/Settings'

import StructuralUnitPage from '../../pages/structural-unit'
import SalesInvoicePage from '../../pages/sales-invoice'
import SupplierInvoicePage from '../../pages/supplier-invoice'
import CashReceiptPage from '../../pages/sales-invoice'
import PaymentReceiptPage from '../../pages/sales-invoice'


import AppHeader from '../AppHeader'
import AppFooter from '../AppFooter'
// import AppSider from './sider';

// import { HEADER_HEIGHT, FOOTER_HEIGHT, MENU_BACKGROUND_COLOR } from '../../commons/constants'

/////////////////////////////////////////////
// Object's

import CheckAuth from '../../hocs/CheckAuth'

import './index.css'
import AppStatusBar from '../AppStatusBar'
import AppNavBar from '../AppNavBar'
import { isAndroid, isFullscreenAndroid, isFullscreenIOS, isFullscreenTDesktop, isIOS } from '../../commons/telegram'
import DailyReport from '../../pages/pdf-reports/DailyReport'
import SettlementWithCustomersReport from '../../pages/pdf-reports/SettlementWithCustomers'

/////////////////////////////////////////////
// Test

// import TestPage from '../../pages/Test'        // Test
// import MobileTestPage from '../pages/mobile-test'

/////////////////////////////////////////////
// Main component

export const routeItems = () => {

    const { Header, Sider, Content, Footer } = Layout
    const element = (
        <Layout className='layout-app'>
            <CheckAuth >
                <Header className={`layout-app-header${(isFullscreenTDesktop()) && ' layout-app-header-desktop' || ''}${(isFullscreenAndroid() || isFullscreenIOS()) && ' layout-app-header-mobile' || ''}`}>
                    <AppStatusBar />
                    <AppHeader />
                </Header>
                <Content className='layout-app-content'>
                    <Outlet />
                </Content>
                <Footer className='layout-app-footer'>
                    <AppFooter />
                    <AppNavBar />
                </Footer>
            </CheckAuth>
        </Layout >
    )

    return [
        {
            path: '/',
            element,
            children: [
                { path: '/', element: < LandingPage /> },
                // { path: '/landing', element: < LandingPage /> },
                { path: '/home', element: < HomePage /> },
                // { path: '/support', element: < SupportPage /> },
                // { path: '/about', element: < AboutPage /> },
                { path: '/about', element: < LandingPage /> },
                { path: '/login', element: < LoginPage /> },
                { path: '/logout', element: < LogoutPage /> },
                { path: '/connect-user', element: < ConnectPage /> },
                { path: '/carts', element: < CartsPage /> },
                { path: '/customers', element: < CustomersPage /> },
                { path: '/orders', element: < OrdersPage /> },
                // { path: '/order/:id', element: < OrderViewPage /> },
                { path: '/products', element: < ProductsPage /> },
                // { path: '/product/:id', element: < ProductViewPage /> },
                // { path: '/product-characteristics', element: < ProductCharacteristicListPage /> },
                // { path: '/product-characteristic/:id', element: < ProductCharacteristicPage /> },
                { path: '/uom-classifier', element: < UOMClassifierPage /> },
                { path: '/employees', element: < EmployeesPage /> },
                { path: '/user-profile', element: < UserProfilePage /> },
                // { path: '/individuals', element: < IndividualsPage /> },
                { path: '/settings', element: < SettingsPage /> },
                { path: '/daily-report', element: < DailyReport /> },
                { path: '/settlement-with-customers-report', element: < SettlementWithCustomersReport /> },

                { path: '/structural-unit', element: < StructuralUnitPage /> },
                { path: '/sales-invoice', element: < SalesInvoicePage /> },
                { path: '/supplier-invoice', element: < SupplierInvoicePage /> },
                { path: '/cash-receipt', element: < CashReceiptPage /> },
                { path: '/payment-receipt', element: < PaymentReceiptPage /> },

                // { path: '/test', element: < TestPage /> },
                // { path: '/test-mobile', element: < MobileTestPage /> },
            ]
        }
    ]
}
