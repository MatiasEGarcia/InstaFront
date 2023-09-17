/**
 * Component that returns notifications popover to use in some navigation.
 * @param {Object} param0 - The component props.
 * @param {Function} param.hidePopover - function to close popover
 * @param {String} param.container - type of container , for bottom navigation or left navigation
 * @returns {JSX.Element} - notifications popover.
 */
function NotificationsPopover({ hidePopover, container }) {
    return (
        <div className={`${container} border rounded p-3 gy-2 bg-secondary-subtle`} onMouseLeave={() => hidePopover()}>
            <div className="text-center"><h3>Notifications</h3></div>
            <div className="">
                Notifications body not implemented
            </div>
        </div>
    )
}

export default NotificationsPopover;