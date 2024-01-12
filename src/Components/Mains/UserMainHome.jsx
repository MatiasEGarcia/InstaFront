import { useParams } from "react-router-dom";
import UsersHomeInformation from "../UserHomeInformation";
import UsersHomePublications from "../UserHomePublications";
import { UserHomeInfoProvider } from "../../Context/UserHomeInfoContext";

/**
 * @returns {JSX.Element} - Main component for user home page. where should be its publications,followers ,etc.
 */
function UserMainHome() {
    return (
        <main className="col-12 col-md-8 col-xl-10">
            <UserHomeInfoProvider >
                <UsersHomeInformation />
            </UserHomeInfoProvider>
            <UsersHomePublications />
        </main>
    )
}
export default UserMainHome;