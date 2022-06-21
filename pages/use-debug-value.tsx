import type { NextPage } from "next";
import { useState, useDebugValue, useEffect } from "react";

type FormatDebug = {
  query: string;
  state: boolean;
};

// TODO create a formatted debug function helper
function formattedDebugValue({ query, state }: FormatDebug) {
  return `\`${query}\` => ${state ? "Has been applied" : "not applied"}`;
}

function useMedia(query: string, initialState = false) {
  const [state, setState] = useState(initialState);

  // TODO call useDebugValue
  useDebugValue({ query, state }, formattedDebugValue);

  useEffect(() => {
    let mounted = true;
    const mql = window.matchMedia(query);
    function onChange() {
      if (!mounted) {
        return;
      }
      setState(Boolean(mql.matches));
    }

    mql.addEventListener("change", onChange);
    setState(mql.matches);

    return () => {
      mounted = false;
      mql.removeEventListener("change", onChange);
    };
  }, [query]);

  return state;
}

const UseDebugValueDemo: NextPage = () => {
  const [count, setCount] = useState(0);
  const isBig = useMedia("(min-width: 1000px)");
  const isMedium = useMedia("(max-width: 999px) and (min-width: 700px)");
  const isSmall = useMedia("(max-width: 699px)");

  const color = isBig
    ? "green"
    : isMedium
    ? "yellow"
    : isSmall
    ? "red"
    : undefined;

  return <div style={{ width: 200, height: 200, backgroundColor: color }} />;
};

export default UseDebugValueDemo;
