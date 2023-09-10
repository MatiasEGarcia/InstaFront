
import HomeMain from "./HomeMain";
import LeftNavigation from "./LeftNavigation";
import StickyBottomIconNavigation from "./StickyBottomIconNavigation";
import UserMainHome from "./UserMainHome";

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
            <div className="row vh-100 position-relative">
                <LeftNavigation />
                 {main}   
                <StickyBottomIconNavigation />
            </div>
        </div>
    )
}

export default MainContainer;