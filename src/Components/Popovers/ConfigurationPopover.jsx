import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { changeUserVisibility } from "../../Service/UserService";
import { useNotification } from "../../hooks/useNotification";


/**
 * Component that returns configuration details popover to use in some navigation.
 * @param {Object} param - The component props.
 * @param {Function} param.hidePopover - function to close popover
 * @param {String} param.container - type of container , for bottom navigation or left navigation
 * @returns {JSX.Element} - configuration popover.
 */
function ConfigurationPopover({ hidePopover, container }) {
    const {auth,logout, setAuth} = useAuth();
    const {setNotification} = useNotification();

    function setUserVisibility() {
        changeUserVisibility().then((data) => {
            setAuth({ ...auth, user: data.body });
            setNotification({
                sev: NOTIFICATION_SEVERITIES[0],//success
                msg: "visibility changed",
            })
        }).catch((error) => {
            setNotification({
                sev: NOTIFICATION_SEVERITIES[1],//error
                msg: error.message,
            })
        })
    }


    return (
        <div className={`${container} border rounded p-2 gy-2 bg-secondary-subtle`} onMouseLeave={() => hidePopover()}>
            <div className="h-15 text-center"><h3>Configuration</h3></div>
            <div className="h-70 vstack gap-2">
                <div className="mb-2 border-bottom border-black">
                    <p className="mb-2">Change your visibility:</p>
                    <div className="d-flex justify-content-evenly">
                        <div className="form-check">
                            <input className="form-check-input"
                                type="radio"
                                name="visibilityRadio"
                                id="publicRadio"
                                checked={auth.user.visible === true}
                                onChange={setUserVisibility} />
                            <label className="form-check-label" htmlFor="publicRadio">
                                Public
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input"
                                type="radio"
                                name="visibilityRadio"
                                id="privateRadio"
                                checked={auth.user.visible === false}
                                onChange={setUserVisibility} />
                            <label className="form-check-label" htmlFor="privateRadio">
                                Private
                            </label>
                        </div>
                    </div>
                </div>
                <Link to="/userDetails" className="btn btn-light">
                    <p className="m-0">Set Profile details</p> {/*THIS WILL GO TO A MAIN PAGE TO EDIT USERNAME AND USER DETAILS LIKE MAIL, NAME AND SURNAME*/}
                </Link>
            </div>
            <div className="h-15 text-center">
                <button className="btn btn-danger w-50" onClick={() => logout()}>
                    <p className="m-0">Logout</p>
                </button>
            </div>
        </div>
    )
}

export default ConfigurationPopover;