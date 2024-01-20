import { StaffLanguageContextWrapper } from "~/components/SinglePageInfo/components/CharactersFunc/staffLanguageContext";
import type { PropsWithChildren } from "react";

export default function AnimePageLayout({
  children,
}: PropsWithChildren<unknown>) {
  return <StaffLanguageContextWrapper>{children}</StaffLanguageContextWrapper>;
}
