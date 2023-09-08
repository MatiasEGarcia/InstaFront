/**
 * Component that works as modal.
 * @param {Object} props - The component props.
 * @param {ReactNode} props.children - The content to be displayed within the modal.
 * @param {boolean} props.modalState - true display modal, false not.
 * @param {boolean} props.setModalState - to change {modalState} value.
 * @returns {JSX.Element} - The rendered Modal component.
 */
function Modal({ children, modalState, setModalState }) {

    /**
     * Function to check if close click is in the overlay div,and not in its children, and then close the modal. 
     * @param {Event} evt 
     */
    function clickOverlay(evt) {
        if (evt.target.classList.contains('modal')) {
            setModalState(false)
            console.log("entro")
        }
    }

    return (
        <>
            {modalState &&
                <div className="modal
                                    h-100 vw-100 
                                    d-flex justify-content-center align-items-center 
                                    overflow-hidden
                                    bg-dark bg-opacity-50"
                    onClick={clickOverlay}>
                    {children}
                </div>

            }
        </>
    )
}

export default Modal;