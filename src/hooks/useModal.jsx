import { useState } from "react";

/**
 * 
 * @param {Function} getModalContent - function to ask the server for the information to display in the modal
 */
export function useModal(getModalContent) {
    const [modalState, setModalState] = useState(false);//used by Modal component to know if should show the modal or not
    const [publicationModal, setPublicationModal] = useState({});//here we save the the future modal content

    /**
     * Function to show a modal with publication selected information.
     * @param {string} id - publication id.
     */
    function showModal(id) {
        setPublicationModal[getModalContent()];
        setModalState(true);
    }

    return {
        modalState,
        setModalState,
        publicationModal,
        showModal
    };
}