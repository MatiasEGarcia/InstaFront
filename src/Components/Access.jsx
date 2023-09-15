import { PersonFillAdd, PersonUp } from "react-bootstrap-icons";
import { NOTIFICATION_SEVERITIES, PASSWORD_LABEL, SIGN_IN, USERNAME_LABEL } from "../Util/UtilTexts";
import { useForm } from "../hooks/useForm";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNotification } from "../hooks/useNotification";
import Loading from "./Loading";
import { userAccess } from "../Service/AuthService";
import useAuth from "../hooks/useAuth";

/**
 * initial values in the authenticationForm inputs
 */
const initialForm = {
    username: "",
    password: "",
}
/**
 * Function to validate each input in the authenticationForm.
 * @param {Object} form - object that will contain inputs values to test and see if there is any error.
 * @returns {Object} - in the case that there was any error will have input name and its error messages.
 */
const validationsForm = (form) => {
    let errors = {};
    if (!form.username.trim()) {
        errors.username = "Please , add a username";
    } else if (!/^\S{1,20}$/.test(form.username)) {
        errors.username = "Username can't contain spaces or be more than 20 characters";
    }

    if (!form.password.trim()) {
        errors.password = "Please , add a password";
    } else if (!/^\S{1,100}$/.test(form.password)) {
        errors.password = "Username can't contain spaces or be more than 100 characters";
    }
    return errors;
}

/**
 * 
 * @param {string} props.typeOfAccess - depend of the type of the access that the user wants, the authenticationForm will sign up or sign in the user.
 * @returns {JSX.Element} - The rendered AccessForm component.
 */
function Access({ typeOfAccess }) {
    const [loading, setLoading] = useState(false);
    const auth = useAuth();
    const setNotification = useNotification();
    const { form,
        fieldsTouched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit
    } = useForm(initialForm, validationsForm);
    const navigate = useNavigate();

    //if user is already authenticated then we send it to home page.
    useEffect(() => {
        if(auth.user){
            navigate("/home");
        }
    },[])


    /**
     * 
     * @param {Event} evt - event to manage user authentication.
     */   
    function authSubmit(evt) {
        setLoading(true);
        userAccess({
            action:typeOfAccess,
            username: evt.target.username.value,
            password: evt.target.password.value,
        }).then((data) => {
            console.log(data)
            setNotification({
                sev:NOTIFICATION_SEVERITIES[0],
                msg:`Welcome ${data.username}`
            });
            navigate('/home');
        }).catch((error) => {
            console.log(error)
            setNotification({
                sev: NOTIFICATION_SEVERITIES[1],
                msg: error.message
            });
        }).finally(() => {
            setLoading(false);
        })
    }

    if(loading){
        return(
            <Loading/>
        )
    }

    return (
        <main className="container-fluid d-flex justify-content-center align-items-center vh-100">
            <form className="w-75 w-md-25 needs-validation" noValidate onSubmit={evt => handleSubmit(evt, authSubmit)}>
                <div className="row">
                    <div className="col-12 text-center">
                        {typeOfAccess === 'signIn'
                            ? <PersonFillAdd size={160} />
                            : <PersonUp size={160} />}
                    </div>
                </div>
                <div className="row gap-3">
                    <div className="col-12 text-center">
                        <label htmlFor="username">
                            <p className="fs-4">{USERNAME_LABEL}</p>
                        </label>
                        <input
                            required
                            type="text"
                            className="form-control"
                            id="username"
                            name="username"
                            value={form.username}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <small className={`${fieldsTouched.username && !!errors.username ? "d-block" : "d-none"} text-danger `}>
                            {errors.username}
                        </small>
                    </div>
                    <div className="col-12 text-center">
                        <label htmlFor="password">
                            <p className="fs-4">{PASSWORD_LABEL}</p>
                        </label>
                        <input
                            required
                            type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <small className={`${fieldsTouched.password && !!errors.password ? "d-block" : "d-none"} text-danger`}>
                            {errors.password}
                        </small>
                    </div>
                    <div className="col-12 text-center">
                        <button type="submit" className="btn btn-success w-50">
                            Submit
                        </button>
                    </div>
                    {typeOfAccess === SIGN_IN &&
                        <Link to="/signUp" className="col-12 text-center
                                                link-offset-2 link-underline link-underline-opacity-0 link-underline-opacity-100-hover">
                            <small>Are you new? Create an account.</small>
                        </Link>
                    }
                </div>
            </form>
        </main>
    );
}

export default Access