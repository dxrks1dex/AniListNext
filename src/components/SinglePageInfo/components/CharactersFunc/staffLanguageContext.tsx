import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { InputMaybe, StaffLanguage } from "~/gql/types.g";

interface IStaffLanguageContext {
  data: {
    staffLanguage: InputMaybe<StaffLanguage> | undefined;
  };
  operations: {
    setStaffLanguage: Dispatch<
      SetStateAction<InputMaybe<StaffLanguage> | undefined>
    >;
  };
}

const StaffLanguageContext = createContext<IStaffLanguageContext | null>(null);
export const StaffLanguageContextWrapper: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [staffLanguage, setStaffLanguage] = useState<string | undefined>(
    "Japanese",
  );

  const context: IStaffLanguageContext = {
    data: {
      staffLanguage,
    },
    operations: {
      setStaffLanguage,
    },
  };

  return (
    <StaffLanguageContext.Provider value={context}>
      {children}
    </StaffLanguageContext.Provider>
  );
};

export const useStaffLanguageContext = (): IStaffLanguageContext => {
  const value = useContext(StaffLanguageContext);
  if (value === null) {
    throw new Error("empty StaffLanguageContext");
  }

  return value;
};
