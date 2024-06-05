import { Context } from "./Context";
import { useEffect, useState } from "react";
function Provider({ children }) {
  const [backgroundblack, setbackgroundblack] = useState(false);

  return (
    <Context.Provider
      value={{
        backgroundblack,
        setbackgroundblack,
      }}
    >
      {children}
    </Context.Provider>
  );
}
export default Provider;
