import { PersonFillAdd, PersonUp } from "react-bootstrap-icons";
import { PASSWORD_LABEL, USERNAME_LABEL } from "../Util/UtilTexts";
import { useForm } from "../hooks/useForm";

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
    const { form,
        fieldsTouched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit
    } = useForm(initialForm, validationsForm);

    function authSubmit(evt) {
        console.log('formulario enviado');
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
                        <small className={`${fieldsTouched.username && !!errors.username ? "d-block": "d-none"} text-danger `}>
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
                        <small className={`${fieldsTouched.password && !!errors.password ? "d-block": "d-none"} text-danger`}>
                            {errors.password}
                        </small>
                    </div>
                    <div className="col-12 text-center">
                        <button type="submit" className="btn btn-success w-50">
                            Submit
                        </button>
                    </div>
                </div>
            </form>
        </main>
    );
}

export default Access