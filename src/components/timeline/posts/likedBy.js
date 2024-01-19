import { useState } from "react";

export const LikedBy = (props) => {
    const { likedByData: likedBy } = props;
    // const [likedBy, setLikedBy] = useState([]);
    // console.log("likedByData ==>", likedByData)
    // useState(() => {
    //     console.log("likedByData ==>>", likedByData)
    //     setLikedBy(likedByData);
    // }, [likedByData])

    const LikeHTML = () => {
        // console.log("likedBy ==>>", likedBy)
        if (likedBy?.length === 1) {
            return (
                <span>{likedBy[0]?.firstName} Liked this</span>
            )
        } else if (likedBy?.length === 2) {
            return (
                <span>
                    {likedBy[0]?.firstName} & {likedBy[1]?.firstName} Liked this
                </span>
            )
        } else if (likedBy?.length >= 3) {
            return (
                <span>
                    {likedBy[0]?.firstName}, {likedBy[1]?.firstName} & {likedBy.length - 2} {(likedBy.length - 2) === 1 ? 'other' : 'others'} Liked this
                </span>
            )
        }
    }

    return (
        <div className="reacted-users">
            <ul className="users-list">
                {likedBy?.map((item, i) => {
                    if (i <= 3) {
                        return (
                            <li key={i}><img src={item?.profilePic?.trim()} alt={item?.firstName} onError={({ currentTarget }) => { currentTarget.onerror = null; currentTarget.src = "/assets/images/profile.jpg"; }} /></li>
                        )
                    }
                })}
            </ul>

            <LikeHTML />
        </div>
    )
}