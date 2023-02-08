import { createContext, useContext, useState } from 'react';
import { useSession } from 'next-auth/react';

interface KeyValuePairs {
  [key: string]: any;
}

const AppContext = createContext({
  state: {} as KeyValuePairs,
  setState: (state: KeyValuePairs) => {},
});

export function AppWrapper({ children }) {
  const [state, setState] = useState<KeyValuePairs>({});
  const { data: session, status } = useSession();

  let value = {
    state,
    setState,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  return useContext(AppContext);
}
