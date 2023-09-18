import { Link } from "react-router-dom";
import HomeMain from "./HomeMain";
import UserMainHome from "./UserMainHome";
import { APP_TITLE , TYPE_NAV } from "../Util/UtilTexts";
import Navigation from "./Navigation/Navigation";

function MainContainer({ wichMain }) {
    console.log("entrando en el MainContainer");
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
                <Navigation typeNavigation={TYPE_NAV[0]}/>
                {main}
                <Navigation typeNavigation={TYPE_NAV[1]}/>
            </div>
        </div>
    )
}

export default MainContainer;