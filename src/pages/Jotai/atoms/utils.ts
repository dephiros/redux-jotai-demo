import { atom, Getter } from "jotai";
import { Entity } from "@rest-hooks/rest";
import { normalize } from "@rest-hooks/normalizr";
import { entityStoreAtom, EntityStore } from "./entities";

/**
 * Helper function to create an atom that fetches data from an API
 * and caches it in the entity store
 */
export function createAPIResourceAtom<
  ModelClassType extends typeof Entity,
  APIInterface extends Record<string, any> | Array<Record<string, any>>
>({
  EntityClass,
  fetchResource,
  shouldFetchOnMount = true,
}: {
  EntityClass: ModelClassType;
  fetchResource: (get: Getter) => Promise<APIInterface>;
  shouldFetchOnMount?: boolean;
}) {
  const entityKey = EntityClass.key;
  const fetchStateAtom = atom<Promise<APIInterface> | null>(null);
  const resourceAtom = atom(
    async (get) => {
      if (!get(fetchStateAtom)) {
        return {};
        // throw new Error("Resource not initialized");
      }
      await get(fetchStateAtom);
      const entities = get(entityStoreAtom)[entityKey];
      return Object.fromEntries(
        Object.entries(entities || {}).map(([id, entity]) => {
          return [id, EntityClass.fromJS(entity)];
        })
      );
    },
    async (get, set) => {
      const resourcePromise = fetchResource(get);
      set(fetchStateAtom, resourcePromise);
      const resources = [await resourcePromise].flat();
      set(entityStoreAtom, EntityClass, resources);
    }
  );
  if (shouldFetchOnMount) {
    resourceAtom.onMount = (setAtom) => {
      setAtom();
    };
  }
  // note how we can configure the state API by returning a different atom
  return resourceAtom;
}
