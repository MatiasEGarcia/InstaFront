import {PersonFillAdd, PersonUp} from "react-bootstrap-icons"; 
import { PASSWORD_LABEL, USERNAME_LABEL } from "../Util/UtilTexts";
/**
 * 
 * @param {string} props.typeOfAccess - depend of the type of the access that the user wants, the authenticationForm will sign up or sign in the user.
 * @returns {JSX.Element} - The rendered AccessForm component.
 */
function Access({typeOfAccess}) {

    return (
        <main className="container-fluid d-flex justify-content-center align-items-center vh-100">
            <form action="" className="w-75 w-md-25">
                <div className="row">
                    <div className="col-12 text-center">
                        {typeOfAccess === 'signIn'
                            ? <PersonFillAdd size={160} />
                            : <PersonUp size={160} />}
                    </div>
                </div>
                <div className="row gap-3">
                    <div className="col-12 text-center">
                        <label for="username" classname="form-label">
                            <p className="fs-4">{USERNAME_LABEL}</p>
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="username"
                            name="username"
                            placeholder="---" />
                    </div>
                    <div className="col-12 text-center">
                        <label for="password" classname="form-label">
                            <p className="fs-4">{PASSWORD_LABEL}</p>
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            placeholder="---" />
                    </div>
                    <div className="col-12 text-center">
                        <button type="submit" class="btn btn-success w-50">
                            Submit
                        </button>
                    </div>
                </div>
            </form>
        </main>
    );
}

export default Access