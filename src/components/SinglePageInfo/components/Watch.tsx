import { MediaConnection } from "~/gql/types.g";
import Link from "next/link";
import { useRouter } from "next/router";

interface props {
  name: string | undefined;
}
export default function Watch({ name }: props) {
  const urlName = name?.replace(/ /g, "-");
  return (
    <>
      <Link href={`https://www.anilibria.tv/release/${urlName}.html`}>
        {urlName}
      </Link>
    </>
  );
}
