import styled from "styled-components";
import Link from "next/link";
import { MediaAnimeQuery } from "~/enteris/anime/titleList.g";
interface props {
  relations: NonNullable<MediaAnimeQuery["Media"]>["relations"];
}
export default function Overviewed({ relations }: props) {
  return (
    <>
      Relations
      <OverviewedGrid>
        {relations?.nodes?.map((mediaItem) => (
          <RelationsCard key={mediaItem?.id}>
            <Link
              href={{
                pathname: `[id]/[name]`,
                query: { id: mediaItem?.id, name: mediaItem?.title?.romaji },
              }}
            >
              <CardImg src={mediaItem?.coverImage?.extraLarge ?? ""} />
              <RelationsName>{mediaItem?.title?.romaji}</RelationsName>
            </Link>
            <div>{mediaItem?.type}</div>
          </RelationsCard>
        ))}
      </OverviewedGrid>
    </>
  );
}

const OverviewedGrid = styled.div`
  display: grid;

  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  background-color: #0b1622;
`;
const RelationsCard = styled.section`
  color: lightgrey;

  background-color: #151f2e;

  display: flex;

  border-radius: 5px;
`;

const CardImg = styled.img`
  height: 115px;
  width: 85px;
`;
const RelationsName = styled.span`
  color: #9fadbd;

  &:hover {
    color: #61dafb;
    transition: 0.2s;
  }

  text-decoration: none;
`;
