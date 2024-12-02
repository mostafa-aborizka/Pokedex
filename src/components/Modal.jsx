import ReactDom from 'react-dom'
export default function Modal(props){
    const {children, handleModalClose}= props
    return ReactDom.createPortal(
        <div className='modal-container'>
            <button className='modal-underlay' onClick={handleModalClose} />
            <div className='modal-content'>
                {children}
            </div>
        </div>
    ,document.getElementById("portal"))
}