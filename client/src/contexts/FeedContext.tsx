// FeedContext.tsx
import { createContext, useState, useContext, ReactNode } from 'react';

// Define the type for the feed context state
interface FeedContextState {
  reload: boolean;
  setReload: (reload: boolean) => void;
}

// Create the context
export const FeedContext = createContext<FeedContextState>({
  reload: false,
  setReload: () => {},
});

// FeedProvider component
export function FeedProvider({ children }: { children: ReactNode }) {
  const [reload, setReload] = useState(false);

  // Pass the context state and functions in the value
  const contextValue: FeedContextState = {
    reload,
    setReload,
  };

  return (
    <FeedContext.Provider value={contextValue}>{children}</FeedContext.Provider>
  );
}
