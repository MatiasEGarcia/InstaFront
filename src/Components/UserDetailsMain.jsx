import useAuth from "../hooks/useAuth";
import { uploadProfileImage } from "../Service/UserService";
import { PencilSquare } from "react-bootstrap-icons";
import { useNotification } from "../hooks/useNotification";
import { NOTIFICATION_SEVERITIES } from "../Util/UtilTexts";
import UserImageProfile from "./UserImageProfile";
import { useRef, useState } from "react";
import { useForm } from "../hooks/useForm";

/**
 * Initial valies in user details input form.
 */
const initialForm = {
    name: "",
    lastname: "",
    age: "",
    email: ""
}

const validationsForm = (form) => {
    let errors = {};

    if (!/^[A-Za-z]{1,20}$/.test(form.name)) {
        errors.name = "Name can't contain spaces, special characters or be more than 20 characters";
    }
    if (!/^[A-Za-z]{1,20}$/.test(form.lastname)) {
        errors.lastname = "Lastname can't contain spaces, special characters or be more than 20 characters";
    }
    if (!/^(1[8-9]|[2-9][0-9])$/.test(form.age)) {
        errors.age = "Age should be between 18 and 99";
    }
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(form.email)) {
        errors.email = "Should be a valid email";
    }
    return errors;
}


export default function UserDetailsMain() {
    const [displayImageEditIcon, setdisplayImageEditIcon] = useState('d-none');//to show or hide PencilSquare
    const fileInputRef = useRef(null);
    const { auth, setAuth } = useAuth();
    const setNotification = useNotification();
    const {
        form,
        fieldsTouched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit
    } = useForm(initialForm, validationsForm);



    function handleProfileButtonClick() {
        fileInputRef.current.click();
    };

    function saveNewProfileImage(evt) {
        uploadProfileImage(evt.target.files[0]).then((data) => {
            setAuth({ ...auth, user: { ...auth.user, image: data.image64 } });
            setNotification({
                sev: NOTIFICATION_SEVERITIES[0], //success
                msg: 'user profile image updated'
            })
        }).catch((error) => {
            setNotification({
                sev: NOTIFICATION_SEVERITIES[1], //error
                msg: error.message
            })
        });
    }

    function setUserDetails() {
        console.log("ENTRO");
    }

    return (
        <div className="col-12 col-md-8 col-xl-10 
                        d-flex flex-column justify-content-center align-items-center">
            <button className="position-relative btn"
                type="button"
                onMouseOver={() => setdisplayImageEditIcon('d-block')}
                onMouseLeave={() => setdisplayImageEditIcon('d-none')}
                onClick={handleProfileButtonClick}>
                <UserImageProfile imgWith="240px"
                    imgHeight="240px"
                    img={auth.user.image}
                    moreClasses="shadow-lg" />
                <span className={`${displayImageEditIcon} 
                                 position-absolute top-50 start-50 translate-middle 
                                 opacity-75`}>
                    <PencilSquare size={100} />
                </span>
            </button>
            <input
                type="file"
                id="img"
                name="img"
                className="d-none"
                ref={fileInputRef}
                onChange={saveNewProfileImage} />
            <form className="border rounded bg-light shadow-lg
                            mt-3 p-2 w-75 w-md-50 
                            needs-validation"
                onSubmit={evt => handleSubmit(evt, setUserDetails)}>
                <div className="mt-2 row text-center">
                    <h2>Your user details</h2>
                </div>
                <div className="mt-2 row  gy-3">
                    <div className="col-6">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            onBlur={handleBlur} />
                        <small className={`${fieldsTouched.name && !!errors.name ? "d-block" : "d-none"} text-danger`}>
                            {errors.name}
                        </small>
                    </div>
                    <div className="col-6">
                        <label htmlFor="lastname">Lastname</label>
                        <input
                            type="text"
                            className="form-control"
                            id="lastname"
                            name="lastname"
                            value={form.lastname}
                            onChange={handleChange}
                            onBlur={handleBlur} />
                        <small className={`${fieldsTouched.lastname && !!errors.lastname ? "d-block" : "d-none"} text-danger`}>
                            {errors.lastname}
                        </small>
                    </div>
                    <div className="col-6">
                        <label htmlFor="age">Age</label>
                        <input
                            type="number"
                            className="form-control"
                            id="age"
                            name="age"
                            value={form.age}
                            min="1"
                            max="99"
                            onChange={handleChange}
                            onBlur={handleBlur} />
                        <small className={`${fieldsTouched.age && !!errors.age ? "d-block" : "d-none"} text-danger`}>
                            {errors.age}
                        </small>
                    </div>
                    <div className="col-6">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            onBlur={handleBlur} />
                        <small className={`${fieldsTouched.email && !!errors.email ? "d-block" : "d-none"} text-danger`}>
                            {errors.email}
                        </small>
                    </div>
                    <div className="col-12 text-center text-primary">
                        <small>None of the fields are required</small>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <button type="submit" className="btn btn-success w-50">
                        Finish
                    </button>
                </div>
            </form>
        </div>
    )
}