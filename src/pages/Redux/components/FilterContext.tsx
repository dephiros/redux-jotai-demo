import React, { createContext, ReactNode } from "react";

export const FilterContext = createContext<{
  filterVisible: boolean;
  toggleFilterVisible: () => void;
}>({} as any);

export function FilterContextProvider({ children }: { children: ReactNode }) {
  const [filterVisible, setFilterVisible] = React.useState(false);
  const toggleFilterVisible = React.useCallback(
    () => setFilterVisible((v) => !v),
    [setFilterVisible]
  );
  return (
    <FilterContext.Provider value={{ filterVisible, toggleFilterVisible }}>
      {children}
    </FilterContext.Provider>
  );
}
