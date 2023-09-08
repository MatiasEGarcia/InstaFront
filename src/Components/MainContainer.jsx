
import HomeMain from "./HomeMain";
import LeftNavigation from "./LeftNavigation";
import StickyBottomIconNavigation from "./StickyBottomIconNavigation";

function MainContainer() {
    return (
        <div className="container-fluid">
            <div className="row vh-100 position-relative">
                <LeftNavigation />
                <HomeMain/>
                <StickyBottomIconNavigation />
            </div>
        </div>
    )
}

export default MainContainer;