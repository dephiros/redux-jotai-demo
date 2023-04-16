import { createContext, ComponentChildren } from "preact";
import { StateUpdater, useCallback, useState } from "preact/hooks";

export const FilterContext = createContext<{
  filterVisible: boolean;
  toggleFilterVisible: () => void;
}>({} as any);

export function FilterContextProvider({
  children,
}: {
  children: ComponentChildren;
}) {
  const [filterVisible, setFilterVisible] = useState(false);
  const toggleFilterVisible = useCallback(
    () => setFilterVisible((v) => !v),
    [setFilterVisible]
  );
  return (
    <FilterContext.Provider value={{ filterVisible, toggleFilterVisible }}>
      {children}
    </FilterContext.Provider>
  );
}
