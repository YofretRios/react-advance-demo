import { FC, useState, useContext, createContext, Children, cloneElement, ReactElement } from "react";
import type { NextPage } from "next";
import Switch from "../components/Switch";

interface IToggleContext {
  on: boolean;
  onToggle: () => void;
}

type AuxElement = {
  children: ReactElement | ReactElement[];
};

type TogglerProps = {
  on?: boolean;
  children?: string;
  onToggle?: () => {};
};

const Toggle: FC<AuxElement> = ({ children }) => {
  const [on, setOn] = useState(false);
  const onToggle = () => setOn((on) => !on);

  return (
    <>
      {Children.map(children, (child) =>
        typeof child.type !== "string"
          ? cloneElement(child, { on, onToggle })
          : child
      )}
    </>
  );
};

const ToggleOn = ({ on, children }: TogglerProps) => {
  return <>{on ? children : null}</>;
};

const ToggleOff = ({ on, children }: TogglerProps) => {
  return <>{!on ? children : null}</>;
};

const ToggleStatus = ({ on }: TogglerProps) => {
  return <>{!on ? "Switch is off" : "Switch is on"}</>;
};

const ToggleButton = ({ on, onToggle }: TogglerProps) => {
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
