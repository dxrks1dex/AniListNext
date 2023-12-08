import { GetStaticPaths } from "next";

type RouteProps = { params?: { Character: string[] } };

export async function getStaticProps({ params }: RouteProps) {
  return {
    props: { params },
  };
}
export const getStaticPaths: GetStaticPaths<
  NonNullable<RouteProps["params"]>
> = async () => {
  return {
    paths: [],
    fallback: true,
  };
};

export default function CharacterPage(props: RouteProps) {
  const id = props.params?.Character[0];
  const name = props.params?.Character[1];

  return (
    <>
      {id} {name}
    </>
  );
}
