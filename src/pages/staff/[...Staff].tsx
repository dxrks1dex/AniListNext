import { GetStaticPaths } from "next";

type RouteProps = { params?: { Staff: string[] } };

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

export default function StaffPage(props: RouteProps) {
  const id = props.params?.Staff[0];
  const name = props.params?.Staff[1];

  return (
    <>
      {id} {name}
    </>
  );
}
