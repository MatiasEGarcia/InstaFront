import { useState } from "react";
import { useParams } from "react-router-dom";
import {
    LOADING_OPTIONS
} from "../Util/UtilTexts";
import Loading from "./Loading";
import Modal from "./Modal";
import PublicationModal from "./PublicationModal";
import UsersHomeInformation from "./UserHomeInformation";
import UsersHomePublications from "./UserHomePublications";

//cuando me comunique con el server esto lo borro
const contentModalPublication = {
    username: "matias",
    date: 22 - 5 - 23,
    description: "Some quick example text to build on the card title and make up thebulk of the card's content. "
}
/**
 * Main component for user home page. where should be its publications,followers ,etc.
 * 
 * @returns {JSX.Element} - show every user main page.
 */
function UserMainHome() {
    const { userId } = useParams();

    return (
        <main className="col-12 col-md-8 col-xl-10">
            <UsersHomeInformation userId={userId}/>
            <UsersHomePublications userOwnerId={userId} />
        </main>
    )
}
export default UserMainHome;