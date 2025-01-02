
import { isFullscreenAndroid, isFullscreenTDesktop } from '../../commons/telegram'
import './index.css'

function AppFooter() {

    return (
        // <div className={`app-footer${(isFullscreenTDesktop() || isFullscreenAndroid()) && ' app-footer-desktop' || ''}`}>
        <div className={`app-footer app-footer-desktop' || ''}`}>
            <div className='app-footer-title-left' >XTS</div>
            <div className='app-footer-title-center'>{'  -  '}</div>
            <div className='app-footer-title-right'>2024</div>
        </div >
    )
}

export default AppFooter