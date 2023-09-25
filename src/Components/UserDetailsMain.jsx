import useAuth from "../hooks/useAuth";
import { getPersonalDetails, savePersonalDetails, uploadProfileImage } from "../Service/UserService";
import { PencilSquare } from "react-bootstrap-icons";
import { useNotification } from "../hooks/useNotification";
import { NOTIFICATION_SEVERITIES, LOADING_OPTIONS } from "../Util/UtilTexts";
import UserImageProfile from "./UserImageProfile";
import { useEffect, useRef, useState } from "react";
import { useForm } from "../hooks/useForm";
import Loading from "./Loading";

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

    if (!form.name.trim()) {
        errors.name = "Please , add a name";
    } else if (!/^[A-Za-z]{1,20}$/.test(form.name)) {
        errors.name = "Name can't contain spaces, special characters or be more than 20 characters";
    }
    if (!form.lastname.trim()) {
        errors.lastname = "Please , add a lastname";
    } else if (!/^[A-Za-z]{1,20}$/.test(form.lastname)) {
        errors.lastname = "Lastname can't contain spaces, special characters or be more than 20 characters";
    }
    if (!/^(1[8-9]|[2-9][0-9])$/.test(form.age)) {
        errors.age = "Age should be between 18 and 99";
    }
    if (!form.email.trim()) {
        errors.email = "Please , add a email";
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(form.email)) {
        errors.email = "Should be a valid email";
    }
    return errors;
}


export default function UserDetailsMain() {
    const [displayImageEditIcon, setdisplayImageEditIcon] = useState('d-none');//to show or hide PencilSquare
    const [loading, setLoading] = useState({ allWindow: false, image: false, detailsForm: false });
    const fileInputRef = useRef(null);
    const { auth, setAuth } = useAuth();
    const setNotification = useNotification();
    const {
        form,
        fieldsTouched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        handleMultipleChange
    } = useForm(initialForm, validationsForm);

    //use effect to check if is there user details already, 
    //if there is then we update input form values, if not
    //we just get a console message
    useEffect(() => {
        setLoading({ ...loading, ['allWindow']: true });
        getPersonalDetails().then((data) => {
            if (data.body) {
                handleMultipleChange(data.body);
            } else if (data.headers) {
                console.log(data.headers.get('moreInfo'));
            }
        }).catch((error) => {
            setNotification({
                sev: NOTIFICATION_SEVERITIES[0],//error
                msg: error.message
            })
        }).finally(() => {
            setLoading({ ...loading, ['allWindow']: false });
        })
    }, [])


    /**
     * Function to open input file and let the user choise an image.
     */
    function handleProfileButtonClick() {
        fileInputRef.current.click();
    };

    /**
     * Function to save a new profile image
     * @param {Event} evt event thrown out by input image
     */
    function saveNewProfileImage(evt) {
        setLoading({ ...loading, ['image']: true });
        uploadProfileImage(evt.target.files[0]).then((data) => {
            setAuth({ ...auth, user: { ...auth.user, image: data.body.image64 } });
            setNotification({
                sev: NOTIFICATION_SEVERITIES[0], //success
                msg: 'user profile image updated'
            })
        }).catch((error) => {
            setNotification({
                sev: NOTIFICATION_SEVERITIES[1], //error
                msg: error.message
            })
        }).finally(() => {
            setLoading({ ...loading, ['image']: false });
        });
    }

    /**
     * Function to save and update user details values.
     * @param {Event} evt event from user details form.
     */
    function setUserDetails(evt) {
        setLoading({ ...loading, ['detailsForm']: true });
        savePersonalDetails({
            name: evt.target.name.value,
            lastname: evt.target.lastname.value,
            age: evt.target.age.value,
            email: evt.target.email.value
        }).then((data) => {//we recive a data, but I don't need it now.
            setNotification({
                sev: NOTIFICATION_SEVERITIES[0], //SUCCESS
                msg: `${auth.user.username} update it's personal details succefuly`
            })
        }).catch((error) => {
            setNotification({
                sev: NOTIFICATION_SEVERITIES[1], //ERROR
                msg: error.message
            })
        }).finally(() => {
            setLoading({ ...loading, ['detailsForm']: false });
        })
    }

    if (loading.allWindow) {
        return (
            <Loading spaceToTake={LOADING_OPTIONS[0]} />
        )
    }
    
    return (
        <div className="col-12 col-md-8 col-xl-10 
                        d-flex flex-column justify-content-center align-items-center">
            {loading.image === true
                ? <Loading spaceToTake={LOADING_OPTIONS[1]} />
                : <div>
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
                </div>}
            {loading.detailsForm === true
                ? <Loading spaceToTake={LOADING_OPTIONS[1]} />
                :
                <form className="border rounded bg-light shadow-lg
                                 mt-1 p-2 w-75 w-md-50 
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
                    </div>
                    <div className="mt-2 row justify-content-center">
                        <button type="submit" className="btn btn-success w-50">
                            Finish
                        </button>
                    </div>
                </form>}
        </div>
    )
}