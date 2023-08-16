import { createContext, useState, Dispatch, SetStateAction } from 'react';

interface IProviderProps {
  children?: any;
}

interface CommunicationContextValue {
  successMessage: string;
  setSuccessMessage: Dispatch<SetStateAction<string>>;
  errorMessage: string;
  setErrorMessage: Dispatch<SetStateAction<string>>;
}

const communicationCtxDefaultValue: CommunicationContextValue = {
  successMessage: '',
  setSuccessMessage: (successMessage) => {},
  errorMessage: '',
  setErrorMessage: (errorMessage) => {},
};

export const CommunicationContext = createContext(communicationCtxDefaultValue);

export function CommunicationProvider(props: IProviderProps) {
  const [successMessage, setSuccessMessage] = useState<string>(
    communicationCtxDefaultValue.successMessage,
  );
  const [errorMessage, setErrorMessage] = useState<string>(
    communicationCtxDefaultValue.errorMessage,
  );

  return (
    <CommunicationContext.Provider
      value={{
        successMessage,
        setSuccessMessage,
        errorMessage,
        setErrorMessage,
      }}
    >
      {props.children}
    </CommunicationContext.Provider>
  );
}
