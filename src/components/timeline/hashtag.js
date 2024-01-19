import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import timelineReducer from "redux/reducers/timelineReducer";
import * as action from '../../redux/actions/timelineActions';

const HashTag = () => {
    const dispatch = useDispatch();
    const { trendingHashTags } = useSelector(({ timelineReducer }) => timelineReducer)

    useEffect(() => {
        dispatch(action.getTrendingHashTags());
    }, []);

    return (
        <div className="hashtag-card">
            <h3 className="hashtag-heading">Most Trending Hashtags</h3>

            {trendingHashTags &&
                <div className="hashtag-list">
                    {trendingHashTags.map((items) => {
                        return <a key={items.hashtag} href={`/timeline?type=${items.hashtag.replace('#','')}`}>{items.hashtag}</a>
                    })}
                </div>
            }
        </div>
    )
}

export default HashTag;