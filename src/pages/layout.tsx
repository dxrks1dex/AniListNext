import Footer from "~/components/common/footer/Footer";
// import { InformationBlock} from "~/components/common/DiscriptoinCard/discription";

export default function Layout({children}) {

    return (
        <>
            {/*<InformationBlock/>*/}
            <div>{children}</div>
            {/*<Footer/>*/}
        </>
)
}