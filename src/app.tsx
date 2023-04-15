import { Suspense } from "preact/compat";
import { useAtom } from "jotai";
import { tw } from "twind";

import routerAtom, { ROUTES } from "./router";
import Loader from "./components/Loader";

export function App() {
  const [PageComponent, setPage] = useAtom(routerAtom);
  const LINKS = Array.from(ROUTES).map(([key, { title }]) => ({
    title,
    link: `${key}`,
  }));
  return (
    <div class={tw`flex flex-col justify-center`}>
      <nav class={tw`bg-coolGray-200 text-green-800 w-full mb-3 p-2`}>
        <ul class={tw`flex gap-2`}>
          {LINKS.map(({ title, link }) => (
            <li key={title}>
              <button class={tw`p-2`} onClick={() => setPage(link)}>
                {title}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <main
        class={tw`flex-1 max-w-[1000px] flex flex-col justify-center w-full mx-auto`}
      >
        <Suspense fallback={Loader}>
          <PageComponent />
        </Suspense>
      </main>
    </div>
  );
}
