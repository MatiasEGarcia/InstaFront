/**
 * Component that returns configuration details popover to use in some navigation.
 * @param {Object} param0 - The component props.
 * @param {Function} param.hidePopover - function to close popover
 * @param {String} param.container - type of container , for bottom navigation or left navigation
 * @returns {JSX.Element} - configuration popover.
 */
function ConfigurationPopover({ hidePopover , container}) {
    return (
        <div className={`${container} card`} onMouseLeave={() => hidePopover()}>
            <div className="card-header"><h3>Configuration</h3></div>
            <div className="card-body">body</div>
            <div className="card-footer">
                <button className="btn btn-danger">
                    Logout
                </button>
            </div>
        </div>
    )
}

export default ConfigurationPopover;