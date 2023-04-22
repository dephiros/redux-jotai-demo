import { atom } from "jotai";
import { Entity, schema } from "@rest-hooks/rest";
import { normalize } from "@rest-hooks/normalizr";

export interface EntityStore
  extends Record<string, Record<string, any> | undefined> {}

const _entityAtom = atom<EntityStore>({});

export const entityStoreAtom = atom(
  (get) => {
    return get(_entityAtom);
  },
  (get, set, EntityClass: typeof Entity, resources: Array<any>) => {
    const entities = get(_entityAtom);
    const newEntities = normalize<
      schema.Array<typeof EntityClass>,
      EntityStore
    >(resources, new schema.Array(EntityClass), entities).entities;
    set(_entityAtom, newEntities);
  }
);
