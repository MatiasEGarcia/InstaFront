/**
 * Component that returns configuration details popover to use in some navigation.
 * @param {Object} param0 - The component props.
 * @param {Function} param.hidePopover - function to close popover
 * @param {String} param.container - type of container , for bottom navigation or left navigation
 * @returns {JSX.Element} - configuration popover.
 */
function ConfigurationPopover({ hidePopover , container}) {
    return (
        <div className={`${container} border rounded p-2 gy-2 bg-secondary-subtle`} onMouseLeave={() => hidePopover()}>
            <div className=""><h3>Configuration</h3></div>
            <div className="">body</div>
            <div className="">
                <button className="btn btn-danger">
                    Logout
                </button>
            </div>
        </div>
    )
}

export default ConfigurationPopover;