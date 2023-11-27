import {BodyStyle, ContentContainer} from "~/common/bodyStyle";
import {Searcher} from "~/components/Search/Search";
import {PopularThisSeason} from "~/components/mainPageComponents/TrendingNow/popularThisSeason";
import {UpcomingNextSeason} from "~/components/mainPageComponents/TrendingNow/upcomingNextSeason";
import {Top100Anime} from "~/components/mainPageComponents/Top100/top100";
import {AllTimePopular} from "~/components/mainPageComponents/TrendingNow/allTimePopular";
import {TrendingNow} from "~/components/mainPageComponents/TrendingNow/trendingnow";

export function MainPage() {

    return (<>
        <ContentContainer>
            <Searcher/>
            <TrendingNow/>
            <PopularThisSeason/>
            <UpcomingNextSeason/>
            <AllTimePopular/>
            <Top100Anime/>
        </ContentContainer>
        </>
    )
}