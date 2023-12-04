import { FC, type JSX, PropsWithChildren } from "react";
import { SelectOptionSection } from "../searchStyleComponents/genreOrTagStyleComponent";
import { MediaSeason } from "~/gql/types.g";

interface Props {
  onClick: () => void;
  selected: boolean;
}
export const SelectOption: FC<PropsWithChildren<Props>> = ({
  onClick,
  selected,
  children,
}) => {
  return (
    <SelectOptionSection onClick={onClick}>
      {children}
      {selected ? "✔" : null}
    </SelectOptionSection>
  );
};
