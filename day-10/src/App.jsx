import React, { Suspense, useEffect, useState } from "react";

const Click = React.lazy(() => import("./pages/Click"));
const Hover = React.lazy(() => import("./pages/Hover"));
const Form = React.lazy(() => import("./pages/Form"));
const Image = React.lazy(() => import("./pages/Image"));

function App() {


  return (
    <>
      <h1>hi</h1>

      <Suspense fallback={ <div>Loading...</div> }>
        <Form />
      </Suspense>

      <Suspense fallback={ <div>Loading...</div>}>
        <Click />
      </Suspense>

      <Suspense fallback={<div>Loading...</div> }>
        <Hover />
      </Suspense>

      <Suspense fallback={<div>Loading...</div>}>
        <Image />
      </Suspense>
    </>
  );
}

export default App;



