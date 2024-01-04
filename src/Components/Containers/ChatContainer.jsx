import { useRef, useState } from "react";
import { House, PencilSquare } from "react-bootstrap-icons";
import { Link } from 'react-router-dom';
import { PAG_TYPES } from "../../Util/UtilTexts";
import useChat from "../../hooks/UseChat";
import useAuth from "../../hooks/useAuth";
import ChatCard from "../ChatCard";
import ChatMain from "../Mains/ChatMain";
import Modal from "../Modal";
import NewChatModal from "../NewChatModal";
import Pagination from "../Pagination";

/**
 * @returns {JSX.Element} Chat view with chats and it's messages
 */
function ChatContainer() {
    const [newChatModal, setNewChatModal] = useState(false);
    const {chatList, changeChatPage , setChatContent , chatSelected} = useChat();
    const { auth } = useAuth();
    const refChatListDiv = useRef();

    /**
     * Function to open modal to create a new chat.
     */
    function openNewChatModal() {
        setNewChatModal(true);
    }

    /**
     * Function to close modal to create a new chat.
     */
    function closeNewChatModal() {
        setNewChatModal(false);
    }

    return (
        <div className="container-lg">
            <div className="row">
                <nav className="col-4 col-md-3 pt-2 border vh-100">
                    <Link to="/home" className="link-underline link-underline-opacity-0">
                        <button className="btn btn-light w-100 d-flex justify-content-center justify-content-md-between ">
                            <House size={40} />
                            <h2 className="ps-2 d-none d-lg-block">
                                FrontReact
                            </h2>
                        </button>
                    </Link>
                    <div className="p-2 d-flex justify-content-center justify-content-md-between">
                        <span className="fs-4 d-none d-md-block">{auth.user.username}</span>
                        <button className="btn" onClick={openNewChatModal}>
                            <PencilSquare size={40} />
                        </button>
                    </div>
                    <hr />
                    <div className="vstack gap-2 h-75 overflow-auto" ref={refChatListDiv}>
                        <Pagination
                            itemsList={chatList}
                            pageType={PAG_TYPES[0]}
                            changePage={changeChatPage}
                            observerRoot = {refChatListDiv.current}
                            mapItem={setChatContent}
                            ComponentToDisplayItem={(props) => <ChatCard {...props} />} />
                    </div>
                </nav>
                {!chatSelected.users &&
                    <div className="col d-flex justify-content-center align-items-center">
                        <p className="m-0 fs-2 pb-5">Select a chat</p>
                    </div>}
                {chatSelected.users && <ChatMain/>
                }
            </div>
            <Modal modalState={newChatModal} setModalState={setNewChatModal}>
                <NewChatModal closeModal={closeNewChatModal}/>
            </Modal>
        </div >
    )
}

export default ChatContainer;