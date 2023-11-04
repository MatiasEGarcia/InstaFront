export const MESS_ERROR_SERVER_CONNECTION = "There was some error trying to connect to the server";
export const MESS_AUTH_TOKEN_EXPIRED = "Auth token expired, using refresh token";
export const MESS_TOKENS_INVALID = "Invalid tokens, user need to authenticate again";

//I use this message when I need to pass a flag to another method but the type of the flag doesn't exist
export const ACTION_NO_EXIST = "Action passed as param don't exist";

export const NOTI_MESSAGE_LOGOUT_SUCCESSFULLY = 'User logout successfully!';

//FORMS
export const USERNAME_LABEL = 'Username';
export const PASSWORD_LABEL = 'Password';

export const FOLLOWED_STATUS = ['ACCEPTED','REJECTED','IN_PROCESS','NOT_ASKED'];
export const FOLLOWED_LABEL= 'Followed';
export const FOLLOWERS_LABEL= 'Followers';
export const PUBLICATIONS_LABEL = 'Publications';

export const LOADING_OPTIONS = ['allWindow', 'justAvailable'];

export const NOTIFICATION_SEVERITIES=['Success', 'Error', 'Info'];//info for follow, like, etc notifications, 
export const NOTIFICATION_TYPE=['FOLLOW','MESSAGE','LIKE','COMMENT','PUBLICATION','SERVERERROR','SUCCESSACCESS']//error and successaccess is custom in frontend, backend will not give this type of notif
export const NOTIFICATION_MESSAGES= new Map([
    [NOTIFICATION_TYPE[0], 'There is a new follow'],
    [NOTIFICATION_TYPE[1], 'There is a new message'],
    [NOTIFICATION_TYPE[2], 'There is a new like'],
    [NOTIFICATION_TYPE[3], 'There is a new comment'],
    [NOTIFICATION_TYPE[4], 'There is a new publication']
]);

export const APP_TITLE = 'FrontReact';
export const NAV_OPTIONS = ['Search','Notifications', 'Chats', 'Navigate', 'Create' , 'Settings'];

export const PAG_TYPES = ['navPagination', 'scrollDownPagination'];

//types of navigation for the app
export const TYPE_NAV = ['leftNavigation', 'stickyBottomIconNavigation'];
export const TYPE_MAIN = ['home', 'userMainHome', 'userDetailsMain','createPublicationMain'];

export const SIGN_IN = 'signIn';
export const SIGN_UP = 'signUp';

//DIRECTIONS FOR SEARCH
export const DIR_ASC_DIRECTION = 'ASC';
export const DIR_DESC_DIRECTION = 'DESC';
//OPERATION FOR SEARCH
export const BETWEEN = 'BETWEEN';
export const EQUAL = 'EQUAL';
export const GREATER_THAN = 'GREATER_THAN';
export const IN = 'IN';
export const IS_FALSE = 'IS_FALSE';
export const IS_TRUE = 'IS_TRUE';
export const LESS_THAN = 'LESS_THAN';
export const LIKE = 'LIKE';
export const IN_ZONED_DATE_TIME = 'IN_DATES';