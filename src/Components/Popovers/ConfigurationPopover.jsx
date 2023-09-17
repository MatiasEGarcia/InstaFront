import Loading from "../Loading";


/**
 * Component that returns configuration details popover to use in some navigation.
 * @param {Object} param0 - The component props.
 * @param {Function} param.hidePopover - function to close popover
 * @param {String} param.container - type of container , for bottom navigation or left navigation
 * @returns {JSX.Element} - configuration popover.
 */
function ConfigurationPopover({ hidePopover, container, logoutAction }) {

    return (
        <div className={`${container} border rounded p-2 gy-2 bg-secondary-subtle`} onMouseLeave={() => hidePopover()}>
            <div className="h-15"><h3>Configuration</h3></div>
            <div className="h-70">body</div>
            <div className="h-15 text-center">
                <button className="btn btn-danger w-50" onClick={() => logoutAction()}>
                    <p className="m-0">Logout</p>
                </button>
            </div>
        </div>
    )
}

export default ConfigurationPopover;