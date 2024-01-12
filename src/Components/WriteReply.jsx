import { useRef } from "react";

/**
 * @param {Function} param.saveReply function to save the reply writed.
 * @param {Function} param.cancel to cancel writing the response.
 * @returns {JSX.Element} text area to write a reply on root comment.
 */
export default function WriteReply({
    saveReply,
    cancel
}) {
    const refReply = useRef();

    return (
        <div className="row ms-5 me-2 mb-2" style={{ height: '150px' }}>
            <div className="h-70 form-floating px-1">
                <textarea
                    id="floatingTextarea"
                    className="w-100 h-100 form-control"
                    style={{ resize: 'none' }}
                    ref={refReply}
                />
                <label htmlFor="floatingTextarea">Your reply</label>
            </div>
            <div className="h-20 mt-1 d-flex justify-content-end">
                <button className="btn btn-light btn-sm me-2" onClick={() => cancel()}>Cancel</button>
                <button className="btn btn-light btn-sm"
                    onClick={() => saveReply(refReply.current.value)}>
                    Save
                </button>
            </div>
        </div>
    )
}