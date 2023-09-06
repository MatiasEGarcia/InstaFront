
import HomeMain from "./HomeMain";
import LeftNavigation from "./LeftNavigation";
import StickyBottomNavigation from "./StickyBottomNavigation";

function MainContainer() {
    return (
        <div className="container-fluid">
            <div className="row vh-100 position-relative">
                <LeftNavigation />
                <HomeMain/>
                <StickyBottomNavigation />
            </div>
        </div>
    )
}

export default MainContainer;