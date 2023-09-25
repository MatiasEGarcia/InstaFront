import { LOADING_OPTIONS } from "../Util/UtilTexts";

/**
 * Component to show loading effect, should use it when you are waiting for a response by the server.
 * @param {string} spaceToTake how much space do you want to occupy with the loading?
 * @returns {JSX.Element} The rendered loading component.
 */
function Loading({spaceToTake}) {
    const style = {
        width: '3rem',
        height: '3rem',
    }

    switch (spaceToTake) {
        case LOADING_OPTIONS[0]:
            spaceToTake = 'vh-100 vw-100';
            break;
        case LOADING_OPTIONS[1]:
            spaceToTake = 'h-100 w-100';
            break;
        default:
            throw new Error(ACTION_NO_EXIST);
    }

    return (
        <div className={`${spaceToTake} d-flex justify-content-center align-items-center`}>
            <div className="spinner-border" style={style} role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    )
}

export default Loading;