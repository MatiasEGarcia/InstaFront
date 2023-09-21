
/**
 * Display user basic profile image.
 * 
 * @param {Object} props - The component props.
 * @param {String} props.imgWith - image width
 * @param {String} props.imgHeight - image height
 * @param {String} props.moreClasses - more style classes to add in img tag.
 * @returns {JSX.Element} - The rendered UserImageProfile component.
 */
export default function UserImageProfile({
    imgWith,
    imgHeight,
    img,
    moreClasses
}) {

    return (
        <img height={imgHeight} width={imgWith}
            className={`rounded-circle ${moreClasses}`}
            src={(img) ? `data:image/jpeg;charset=utf-8;base64,${img}` : "/defaultImg/profile.jpg" }
        />
    )
}