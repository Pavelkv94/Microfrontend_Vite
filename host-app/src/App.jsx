import { lazy } from 'react';

const Wrapper = lazy(() => import('remote/Wrapper'))

function App() {
  return (
    <>
      <h1>HOST APP</h1>
      <Wrapper />
    </>
  );
}

export default App;
