export const RightSidebarCard = (props) => {
    return (
        <div className="rs-card">
            <div className="rs-head">
                <h4 className="rs-title">{props.title}</h4>
                {props.viewAll &&
                    <a href={props.viewAllLink}>View All</a>
                }
            </div>
            <div className="rs-body">
                {props.children}
            </div>
        </div>
    )
}

export default RightSidebarCard;