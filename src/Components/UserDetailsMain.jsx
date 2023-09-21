import useAuth from "../hooks/useAuth";
import { uploadProfileImage } from "../Service/UserService";
import {PencilSquare} from "react-bootstrap-icons";
import { useNotification } from "../hooks/useNotification";
import { NOTIFICATION_SEVERITIES } from "../Util/UtilTexts";
import UserImageProfile from "./UserImageProfile";
import { useRef, useState } from "react";

export default function UserDetailsMain() {
    const [displayImageEditIcon, setdisplayImageEditIcon] = useState('d-none');//to show or hide PencilSquare
    const fileInputRef = useRef(null);
    const { auth, setAuth } = useAuth();
    const setNotification = useNotification();

    function handleProfileButtonClick(){
        fileInputRef.current.click();
    };
    
    function saveNewProfileImage(evt){
        uploadProfileImage(evt.target.files[0]).then((data) => {
            setAuth({...auth,user:{...auth.user, image: data.image64}});
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
                    <PencilSquare size={100}/>
                </span>
            </button>
            <input
                type="file"
                id="img"
                name="img"
                className="d-none"
                ref={fileInputRef}
                onChange={saveNewProfileImage}/>
            <form className="border rounded bg-light shadow-lg
                            mt-3 p-2 w-75 w-md-50 
                            needs-validation" action="">
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
                            name="name" />
                    </div>
                    <div className="col-6">
                        <label htmlFor="lastname">Lastname</label>
                        <input
                            type="text"
                            className="form-control"
                            id="lastname"
                            name="lastname" />
                    </div>
                    <div className="col-6">
                        <label htmlFor="age">Age</label>
                        <input
                            type="number"
                            className="form-control"
                            id="age"
                            name="age" />
                    </div>
                    <div className="col-6">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email" />
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