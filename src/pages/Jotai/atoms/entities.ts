import { atom } from "jotai";

export interface EntityStore extends Record<string, Record<string, any>> {}

const _entityAtom = atom<EntityStore>({});

export const entityStoreAtom = atom(
  (get) => {
    return get(_entityAtom);
  },
  (get, set, newEntities: EntityStore) => {
    set(_entityAtom, newEntities);
  }
);
