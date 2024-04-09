import useAuth from "../hooks/useAuth";
import { WICH_FOLLOW, PUBLICATIONS_LABEL, FOLLOWERS_LABEL, FOLLOWED_LABEL, FOLLOWED_STATUS } from "../Util/UtilTexts";

/**
 * 
 * @param {String} param.userVisitedId user visited's id.
 * @param {String} param.username user's username.
 * @param {FOLLOWED_STATUS} param.followerFollowStatus follower status between auth user and visited user(auth user is the follower).
 * @param {FOLLOWED_STATUS} param.followedFollowStatus followed status between auth user and visited user(auth user is the followed).----
 * @param {String} param.numberPublications visited user's number of publications created.
 * @param {String} param.numberFollowers visited user's number of followers.
 * @param {String} param.numberFollowed visited user's number of followed.
 * @returns 
 */
function UserVisitedSocialInfo({
    userVisitedId,
    username, 
    followerFollowStatus,
    followedFollowStatus,
    numberPublications,
    numberFollowers,
    numberFollowed,
    updateFollowFollowStatusByFollower,
    unfollowHandler,
    followHandler,
    handlerFollowModal
}) {
    const {auth} = useAuth();
   

    return (
        <>
            <div className="mt-3 w-100 w-lg-80 d-flex">
                <h3>{username}</h3>
                {auth.user.userId !== userVisitedId &&   //if auth user is the same as the one in the page I will not show this
                    <div className="ms-3 d-flex  gap-2">
                        {/**Follow status where authenticated user is the follower */}
                        {followerFollowStatus === FOLLOWED_STATUS[0] &&
                            <button className="btn btn-light" onClick={() => unfollowHandler()}>Unfollow</button>}
                        {followerFollowStatus === FOLLOWED_STATUS[1] &&
                            <span className="btn btn-light">Follow request was rejected</span>}
                        {followerFollowStatus === FOLLOWED_STATUS[2] &&
                            <span className="btn btn-light">Follow request in proccess</span>}
                        {followerFollowStatus === FOLLOWED_STATUS[3] &&
                            <button className="btn btn-light" onClick={() => followHandler()}>Follow</button>}

                        {/**Follow status where authenticated user is the followed */}
                        {followedFollowStatus === FOLLOWED_STATUS[0] &&
                            <button className="btn btn-light"
                                onClick={() => updateFollowFollowStatusByFollower({ newFollowStatus: FOLLOWED_STATUS[1], followerId: userVisitedId })}>
                                Cancel follow permision
                            </button>}
                        {followedFollowStatus === FOLLOWED_STATUS[1] ||
                            followedFollowStatus === FOLLOWED_STATUS[2]
                            ? <button className="btn btn-light"
                                onClick={() => updateFollowFollowStatusByFollower({ newFollowStatus: FOLLOWED_STATUS[0], followerId: userVisitedId })}>
                                Allow to follow you
                            </button>
                            : ''
                        }

                    </div>
                }
                {auth.user.id === userVisitedId &&
                    <div className="ms-3 d-flex gap-2">
                        <button className="btn btn-light" onClick={() => handlerFollowModal(WICH_FOLLOW.FOLLOWED)}>Want to follow you</button>
                        <button className="btn btn-light" onClick={() => handlerFollowModal(WICH_FOLLOW.FOLLOWER)}>You want to follow</button>
                    </div>
                }
            </div>
            <div className="mt-3 w-100 w-lg-80 d-flex justify-content-between">
                <p>{numberPublications} {PUBLICATIONS_LABEL}</p>
                <p>{numberFollowers} {FOLLOWERS_LABEL}</p>
                <p>{numberFollowed} {FOLLOWED_LABEL}</p>
            </div>
        </>
    )
}
export default UserVisitedSocialInfo;