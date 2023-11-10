import { useState } from "react";

/**
 * 
 * @param {Function} getModalContent - function to ask the server for the information to display in the modal
 */
export function useModal(getModalContent) {
    const [modalState, setModalState] = useState(false);//used by Modal component to know if should show the modal or not
    const [contentModal, setContentModal] = useState({});//here we save the the future modal content

    //CREO QUE VOY A TENER QUE QUITAR EL SETCONTENTMODAL, PORQUE HAYA MUCHA INFOR QUE LA VOY AAOBTENER DESPUES DE QUE SE INICIE EL 
    //COMPONENTE Y JUSTO ANTES DE QUE SE HABRA EL MDOAL

    /**
     * Function to show a modal with publication selected information.
     * @param {string} id - publication id.
     */
    function showModal(id) {
        setContentModal(getModalContent());
        setModalState(true);
    }

    return {
        modalState,
        setModalState,
        contentModal,
        showModal
    };
}