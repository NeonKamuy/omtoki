import React, { useLayoutEffect, useState } from "react";
import { ParticlesView } from "./particles";
import { Helmet } from "react-helmet";

const App = () => {
  const [innerHeight, setInnerHeight] = useState(window.innerHeight + "px");

  alert(innerHeight);
  useLayoutEffect(() => {
    const updateSize = () => setInnerHeight(window.innerHeight + "px");
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    /* Overriding default vh for proper responsibility */
    <div style={{ "--windowInnerHeight": innerHeight } as any}>
      <Helmet>
        <title>Omtoki</title>
      </Helmet>

      <ParticlesView />
    </div>
  );
};

export default App;
