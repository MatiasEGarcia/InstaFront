import { Link } from "react-router-dom";
import HomeMain from "./HomeMain";
import LeftNavigation from "./LeftNavigation";
import StickyBottomIconNavigation from "./StickyBottomIconNavigation";
import UserMainHome from "./UserMainHome";
import { APP_TITLE } from "../Util/UtilTexts";

function MainContainer({ wichMain }) {
    let main;

    switch (wichMain) {
        case 'home':
            main = <HomeMain />
            break;
        case 'userMainhome':
            main = <UserMainHome />
            break;
    }


    return (
        <div className="container-fluid">
            <div className="row d-flex justify-content-center d-md-none mt-2">
                <Link to="/home" className="btn btn-light w-50">
                    <h1 className="display-3 m-0 px-2 pb-1">{APP_TITLE}</h1>
                </Link>
            </div>
            <div className="row vh-100 position-relative">
                <LeftNavigation />
                {main}
                <StickyBottomIconNavigation />
            </div>
        </div>
    )
}

export default MainContainer;