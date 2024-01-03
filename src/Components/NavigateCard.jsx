/**
 * Component to show publications in navigate main component.
 * @param {Object} props.item - publication content.
 * @param {Function} props.selectPublication - function to open modal with all publication's info.
 */
export default function NavigateCard({item, selectPublication}) {
    return (
        <div className="col-4" style={{ height: '250px' }}>
            <div className="card w-100 h-100 cursor-pointer-hover"
                onClick={() => selectPublication(item.id)}>
                <img  src={`data:image/jpeg;charset=utf-8;base64,${item.image}`}
                    alt="publication image"
                    className="object-fit-cover w-100 h-100" />
            </div>
        </div>
    )
}