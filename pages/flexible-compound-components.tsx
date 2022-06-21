import {
  FC,
  useState,
  useContext,
  createContext,
  Children,
  cloneElement,
  ReactElement,
} from "react";
import type { NextPage } from "next";
import Switch from "../components/Switch";

interface IToggleContext {
  on?: boolean;
  onToggle?: () => void;
}

type AuxElement = {
  children: ReactElement | ReactElement[];
};

type TogglerProps = {
  on?: boolean;
  children?: string;
  onToggle?: () => {};
};

// TODO Create ToggleContext Here with createContext
const ToggleContext = createContext<IToggleContext | null>(null);
ToggleContext.displayName = "ToggleContext";

const Toggle: FC<AuxElement> = ({ children }) => {
  const [on, setOn] = useState(false);
  const onToggle = () => setOn((on) => !on);

  // TODO instead of iterating over children using Children.map and returning de value, return <ToggleContext.Provider> passing down
  // as value {on, onToggle}
  // return (
  //   <>
  //     {Children.map(children, (child) =>
  //       typeof child.type !== "string"
  //         ? cloneElement(child, { on, onToggle })
  //         : child
  //     )}
  //   </>
  // );

  return (
    <ToggleContext.Provider value={{ on, onToggle }}>
      {children}
    </ToggleContext.Provider>
  );
};

// TODO: Create a custom hook to use the ToggleContext
function useToggleContext(): IToggleContext {
  const context = useContext(ToggleContext);

  if (context === null) {
    throw new Error("useToggleContext must be used within a Toggle component");
  }

  return context;
}

// TODO: Switch from props to context
const ToggleOn = ({ children }: TogglerProps) => {
  const { on } = useToggleContext();

  return <>{on ? children : null}</>;
};

// TODO: Switch from props to context
const ToggleOff = ({ children }: TogglerProps) => {
  const { on } = useToggleContext();
  
  return <>{!on ? children : null}</>;
};

// TODO: Switch from props to context
const ToggleStatus = () => {
  const { on } = useToggleContext();

  return <>{!on ? "Switch is off" : "Switch is on"}</>;
};

// TODO: Switch from props to context
const ToggleButton = () => {
  const { on, onToggle } = useToggleContext();

  return <Switch aria-label="toggle" on={on} onClick={onToggle} />;
};

const FlexibleCompoundComponents: NextPage = () => {
  return (
    <div>
      <Toggle>
        <ToggleOn>Toggle is On!</ToggleOn>
        <ToggleOff>Toggle is Off!</ToggleOff>
        <hr className="my-4" />
        <ToggleButton />
        <hr className="my-4" />
        <div>
          <ToggleStatus />
        </div>
      </Toggle>
    </div>
  );
};

export default FlexibleCompoundComponents;
