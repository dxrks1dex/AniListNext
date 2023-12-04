import Footer from "~/components/common/footer/Footer";
import { ReactNode } from "react";
import { MainContainer } from "~/common/mainContainer";
// import { InformationBlock} from "~/components/common/DiscriptoinCard/discription";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      {/*<InformationBlock/>*/}
      <MainContainer>{children}</MainContainer>
      <Footer />
    </>
  );
}
