import { Link } from "react-router-dom";
import HomeMain from "../Mains/HomeMain";
import UserMainHome from "../Mains/UserMainHome";
import { APP_TITLE, TYPE_MAIN } from "../../Util/UtilTexts";
import UserDetailsMain from "../Mains/UserDetailsMain";
import CreatePublicationMain from "../Mains/CreatePublicationMain";
import LeftNavigation from "../Navigation/LeftNavigation";
import StickyBottomIconNavigation from "../Navigation/StickyBottomIconNavigation";
/**
 * Will hold basic Main display.
 * 
 * @param {Object} param - The component props. 
 * @param {String} param.wichMain - main component to display.
 * @returns {JSX.Element} - a main component selected.
 */
function MainContainer({ wichMain }) {
    let main;

    switch (wichMain) {
        case TYPE_MAIN[0]:
            main = <HomeMain />
            break;
        case TYPE_MAIN[1]:
            main = <UserMainHome />
            break;
        case TYPE_MAIN[2]:
            main = <UserDetailsMain />
            break;
        case TYPE_MAIN[3]:
            main = <CreatePublicationMain/>
            break;
    }


    return (
        <div className={`container-fluid vh-100  ${wichMain === TYPE_MAIN[0] && 'overflow-hidden'}`}>
            <div className="row d-flex justify-content-center d-md-none mt-2">
                <Link to="/home" className="btn btn-light w-50">
                    <h1 className="display-3 m-0 px-2 pb-1">{APP_TITLE}</h1>
                </Link>
            </div>
            <div className="row position-relative">
                <LeftNavigation/> 
                {main}
                <StickyBottomIconNavigation/>
            </div>
        </div>
    )
}

export default MainContainer;