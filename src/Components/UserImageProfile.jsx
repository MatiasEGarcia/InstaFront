
/**
 * Display user basic profile image. if there was no image then gives one by default.
 * 
 * @param {Object} props - The component props.
 * @param {String} props.imgWith - image width
 * @param {String} props.imgHeight - image height
 * @param {String} props.moreClasses - more style classes to add in img tag.
 * @returns {JSX.Element} - The rendered UserImageProfile component.
 */
export default function UserImageProfile({
    imgWidth,
    imgHeight,
    img,
    moreClasses
}) {

    return (
        <img height={imgHeight} width={imgWidth}
            className={`rounded-circle ${moreClasses}`}
            src={(img) ? `data:image/jpeg;charset=utf-8;base64,${img}` : "/defaultImg/profile.jpg" }
        />
    )
}