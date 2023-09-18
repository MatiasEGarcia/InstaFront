
/**
 * Display user basic profile image.
 * 
 * @param {Object} props - The component props.
 * @param {string} props.imgWith - image width
 * @param {string} props.imgHeight - image height
 * @returns {JSX.Element} - The rendered UserImageProfile component.
 */
export default function UserImageProfile({
    imgWith,
    imgHeight,
    img
}) {

    return (
        <img height={imgHeight} width={imgWith}
            className="rounded-circle"
            src={(!img) ? "/defaultImg/profile.jpg" : `data:image/jpeg;charset=utf-8;base64,${img}`}
        />
    )
}