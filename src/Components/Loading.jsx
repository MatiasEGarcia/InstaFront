/**
 * Component to show loading effect, should use it when you are waiting for a response by the server.
 * @returns {JSX.Element} - The rendered loading component.
 */
function Loading() {
    const style = {
        width: '3rem',
        height: '3rem',
    }

    return (
        <div className="vh-100 vw-100 d-flex justify-content-center align-items-center">
            <div className="spinner-border" style={style} role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    )
}

export default Loading;