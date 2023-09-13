
/**
 * When refresh token used in an request is already invalid, maybe by expiration or logout, throw this.
 * User should auth again.
 * @extends Error
 */
export class RefreshTokenException extends Error{

     /**
     * Creates a new instance of the RefreshTokenException class.
     * @param {string} message - The error message.
     */
    constructor(msg){
        super(msg);
        /**
         * The name of the custom error.
         * @type {string}
         */
        this.name = 'RefreshTokenException';
        this.message = msg;
    }
}