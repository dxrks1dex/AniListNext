import {FooterDescription, FooterStyle, SiteTheme, TextContainer} from "~/common/footerStyle";

export default function Footer() {
    return <FooterStyle>
        <TextContainer>
            <SiteTheme>Site Theme</SiteTheme>
            <FooterDescription>Donate</FooterDescription>
        </TextContainer>
    </FooterStyle>
}