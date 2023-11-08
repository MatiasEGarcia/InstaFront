import { useState } from "react"
import Loading from "./Loading";
import { LOADING_OPTIONS, NOTIFICATION_SEVERITIES } from "../Util/UtilTexts";
import { save } from "../Service/PublicationService";
import { useNotification } from "../hooks/useNotification";
import { useForm } from "../hooks/useForm";

const initialForm = {
    img: '',
    imgDescription: ''
}

const validationsForm = (form) => {
    let errors = {};
    if (!form.img.trim()) {
        errors.img = 'Please, add an image';
    }

    if (!form.imgDescription.trim()) {
        errors.imgDescription = 'Please, add a description';
    } else if (form.imgDescription.length > 100) {
        errors.imgDescription = 'Description exceeds the maximum character limit of 100.';
    }

    return errors;
}

export default function CreatePublicationMain() {
    const [loading, setLoading] = useState(false);
    const setNotification = useNotification();
    const { form,
        fieldsTouched,
        errors,
        handleChange,
        handleMultipleChange,
        handleBlur,
        handleSubmit
    } = useForm(initialForm, validationsForm);

    function publiSubmit(evt) {
        setLoading(true);
        save({
            img: evt.target.img.files[0],
            description: evt.target.imgDescription.value
        }).then((data) => {//data should be the new publication already saved
            setNotification({
                sev: NOTIFICATION_SEVERITIES[0],
                msg: 'Publication successfully created'
            })
        }).catch((error) => {
            setNotification({
                sev: NOTIFICATION_SEVERITIES[1],
                msg: error.message
            })
        }).finally(() => {
            //input values reset
            handleMultipleChange({img:'',imgDescription:''});//Without this I got an error after file submit, because the file doesn't be there any more.
            setLoading(false);
        });
    }

    if (loading) {
        return (
            <main className="col-12 col-md-8 col-xl-10">
                <Loading spaceToTake={LOADING_OPTIONS[1]} />
            </main>
        )
    }

    return (
        <main className="col-12 col-md-8 col-xl-10
                        vh-100
                        d-flex flex-column justify-content-start justify-content-md-center align-items-center">
            <h1 className="mt-4">New Publication</h1>
            <form action="" className="w-75" noValidate onSubmit={evt => handleSubmit(evt, publiSubmit)}>
                <div className="mt-3 input-group input-group-lg">
                    <label htmlFor="img">
                        <p className="fs-4 mb-1">Select publication image</p>
                    </label>
                    <input className="form-control border rounded w-100"
                        type="file"
                        accept=".jpg, .jpeg, .png"
                        id="img"
                        name="img"
                        value={form.img}
                        onChange={handleChange}
                        onBlur={handleBlur} />
                    <small className={`${fieldsTouched.img && !!errors.img ? "d-block" : "d-none"} text-danger`}>
                        {errors.img}
                    </small>
                </div>
                <div className="mt-3">
                    <label htmlFor="imgDescription">
                        <p className="fs-4 mb-1">Write a description</p>
                    </label>
                    <textarea 
                        style={{maxHeight:'300px'}}
                        className="form-control"
                        id="imgDescription"
                        name="imgDescription"
                        aria-label="With textarea"
                        maxLength="100"
                        value={form.imgDescription}
                        onChange={handleChange}
                        onBlur={handleBlur} />
                    <small className={`${fieldsTouched.imgDescription && !!errors.imgDescription ? "d-block" : "d-none"} text-danger`}>
                        {errors.imgDescription}
                    </small>
                </div>
                <div className="mt-3 text-center">
                    <button type="submit" className="btn btn-success w-50">Submit</button>
                </div>
            </form>
        </main>
    )
}