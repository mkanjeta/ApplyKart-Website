import SidebarJobList from "./jobList";
import SidebarProfileSuggestions from "./profileSuggestions";
import RightSidebarCard from "./rightSidebarCard";

const TimelineRightSidebar = () => {
    return (
        <div className="right-sidebar">
            <RightSidebarCard
                title="Top Jobs"
                viewAll="true"
                viewAllLink="/dashboard"
            >
                <SidebarJobList />
            </RightSidebarCard>

            <RightSidebarCard
                title="Suggestions"
                viewAll="true"
                viewAllLink="/timeline/network"
                class="rs-card mdx-sticky"
            >
                <SidebarProfileSuggestions />
            </RightSidebarCard>

        </div>
    )
}

export default TimelineRightSidebar;