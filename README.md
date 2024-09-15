# Microfrontend for React + JS + Vite

1.  Создаем 2 проекта - host и remote.
    `yarn create vite host --template react`
    `yarn create vite remote --template react`
2.  В оба проекта устанавливаем:
    `yarn add @originjs/vite-plugin-federation --dev`

## HOST

**---vite.config.js---**

```
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "host-app",
      remotes: {
        remote: "http://localhost:5001/assets/remoteEntry.js",
      },
      shared: ["react"],
    }),
  ],
  server: {
    port: 5000
  },
  build: {
    modulePreload: false,
    target: "esnext",

    minify: false,
    cssCodeSplit: false,
  },
});

```

**---package.json---**
Устанавливаем порт для нашего приложения

```
"dev": "vite --port 5000",
"build": "vite build",
"lint": "eslint .",
"preview": "vite preview --port 5000"
```

**---App.jsx---**
Импортируем нужный модуль(компонент)

```
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

```

## Remote APP

**---vite.config.js---**

```
// vite.config.js in todo-components
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "remote",
      filename: "remoteEntry.js",
      exposes: {
        "./Wrapper": "./src/Wrapper.jsx",
      },
      shared: ["react"],
    }),
  ],
  server: {
    port: 5001,
  },
  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
});

```

**---package.json---**
Устанавливаем порт для нашего удаленного приложения

```
"dev": "vite --port 5001",
"build": "vite build",
"lint": "eslint .",
"preview": "vite preview --port 5001"
```

**App.jsx** для наглядности переименован в **Wrapper.jsx**.

## Запуск

Для обоих приложений:
`yarn build`
`yarn preview`
