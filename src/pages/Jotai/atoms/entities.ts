import { atom } from "jotai";

export interface EntityStore {}

const _entityAtom = atom<EntityStore>({});

export const entityAtom = atom(
  (get) => {
    return get(_entityAtom);
  },
  (get, set, type: keyof EntityStore, entities: Array<{ id: string }>) => {
    // very naive implementation of normalizing data
    const entitiesById = Object.fromEntries(
      entities.map((entity) => [entity.id, entity])
    );
    const entitiesStore = get(_entityAtom);
    set(_entityAtom, {
      ...entitiesStore,
      [type]: entitiesById,
    });
  }
);
