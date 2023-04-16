import { Suspense } from "react";
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
    <div className={tw`flex flex-col justify-center`}>
      <nav className={tw`bg-coolGray-200 text-black w-full mb-3 p-2`}>
        <ul className={tw`flex gap-2`}>
          {LINKS.map(({ title, link }) => (
            <li key={title}>
              <button className={tw`p-2`} onClick={() => setPage(link)}>
                {title}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <main
        className={tw`flex-1 max-w-[1000px] flex flex-col justify-center w-full mx-auto`}
      >
        <Suspense fallback={<Loader />}>
          <PageComponent />
        </Suspense>
      </main>
    </div>
  );
}
