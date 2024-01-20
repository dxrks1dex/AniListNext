import { InputMaybe, StaffLanguage } from "~/gql/types.g";

interface props {
  languageOption: string | undefined;
}
export const language = (
  languageOption: props,
): InputMaybe<StaffLanguage> | undefined => {
  if (languageOption === undefined) {
    return "JAPANESE";
  } else {
    return languageOption;
  }
};
