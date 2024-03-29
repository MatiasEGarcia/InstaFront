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
export const FOLLOW_STATUS_LABEL = {
    ACCEPTED : 'Accepted',
    REJECTED : 'Rejected',
    IN_PROCESS : 'In process',
    NOT_ASKED : 'Not asked'
}
export const FOLLOWED_LABEL= 'Followed';
export const FOLLOWERS_LABEL= 'Followers';
export const PUBLICATIONS_LABEL = 'Publications';

export const LOADING_OPTIONS = ['allWindow', 'justAvailable'];

//for server notifications.
export const NOTIFICATION_SEVERITIES=['Success', 'Error', 'Info'];
//for events from anothers users, like a follow request, a new message, etc
export const NOTIFICATION_TYPE=['FOLLOW','MESSAGE','LIKE','COMMENT','PUBLICATION']

export const APP_TITLE = 'FrontReact';
export const NAV_OPTIONS = ['Search','Notifications', 'Chats', 'Navigate', 'Create' , 'Settings'];

export const PAG_TYPES = ['scrollDownPagination', 'scrollUpPagination'];

export const CHAT_TYPE = ['PRIVATE', 'GROUP'];

export const TYPE_MAIN = ['home', 'userMainHome', 'userDetailsMain','createPublicationMain', 'navigationMain'];

export const SIGN_IN = 'signIn';
export const SIGN_UP = 'signUp';

//DIRECTIONS FOR SEARCH
export const DIR_ASC_DIRECTION = 'ASC';
export const DIR_DESC_DIRECTION = 'DESC';
//OPERATION FOR SEARCH
export const BETWEEN = 'BETWEEN';
export const EQUAL = 'EQUAL';
export const NOT_EQUAL = 'NOT_EQUAL';
export const GREATER_THAN = 'GREATER_THAN';
export const IN = 'IN';
export const IS_FALSE = 'IS_FALSE';
export const IS_TRUE = 'IS_TRUE';
export const LESS_THAN = 'LESS_THAN';
export const LIKE = 'LIKE';
export const IN_ZONED_DATE_TIME = 'IN_DATES';
export const GLOBAL_OPERATORS = ['AND', 'OR', 'NONE']

//HEADERS FROM BACKEND
export const BACK_HEADERS = ['exception-detail'];
export const SCROLL_POSITIONS = ['start' , 'center', 'end'];

//ERROR
export const REQUIRED_PARAM = 'Some required param was not given.'

export const WICH_FOLLOW = {
    FOLLOWER : 'FOLLOWER',
    FOLLOWED : 'FOLLOWED',
}

export const ITEM_LIKED = {
    COMMENT : 'COMMENT',
    PULICATED_IMAGE : 'PULICATED_IMAGE'
}
