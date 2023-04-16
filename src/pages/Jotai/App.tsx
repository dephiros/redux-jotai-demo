import { useAtom } from "jotai";
import { currentUserAtom } from "./atoms/currentUser";

export default function App() {
  const [user] = useAtom(currentUserAtom);

  return (
    user && (
      <>
        <h1>Current User</h1>
        <pre>{JSON.stringify(user, null, 2)}</pre>
      </>
    )
  );
}
