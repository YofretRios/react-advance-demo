/**
 * Real World Projects that use this pattern:
 * [`@reach/tabs`](https://reacttraining.com/reach-ui/tabs)
 */

import {
  FC,
  useState,
  Children,
  cloneElement,
  ReactElement,
} from "react";
import type { NextPage } from "next";
import Switch from "../components/Switch";

type AuxElement = {
  children: ReactElement | ReactElement[];
};

type TogglerProps = {
  on?: boolean;
  children?: string;
  onToggle?: () => {};
};

// TODO: Implement Toggle Wrapper component that implicitly shares props
// TODO: Validate that the children are either a string or a single element
const Toggle: FC<AuxElement> = ({ children }) => {
  const [on, setOn] = useState(false);
  const onToggle = () => setOn((on) => !on);

  return (
    <>
      {Children.map(children, (child) => typeof child.type !== 'string' ? cloneElement(child, { on, onToggle }) : child)}
    </>
  );
};

// TODO: Create a Collection of components that receives the shared props
const ToggleOn = ({ on, children }: TogglerProps) => {
  return <>{on ? children : null}</>;
};

const ToggleOff = ({ on, children }: TogglerProps) => {
  return <>{!on ? children : null}</>
}

const ToggleStatus = ({ on }: TogglerProps) => {
  return <>{!on ? "Switch is off" : "Switch is on"}</>
}

const ToggleButton = ({ on, onToggle }: TogglerProps) => {
  return <Switch aria-label="toggle" on={on} onClick={onToggle} />;
};

// TODO: Use Toggle component to wrap the children components that will receive shared props
const CompoundComponentDemo: NextPage = () => {
  return (
    <div>
      <Toggle>
        <ToggleOn>Toggle is On!</ToggleOn>
        <ToggleOff>Toggle is Off!</ToggleOff>
        <hr className="my-4" />
        <ToggleButton />
        <hr className="my-4" />
        <ToggleStatus />
      </Toggle>
    </div>
  );
};

export default CompoundComponentDemo;
