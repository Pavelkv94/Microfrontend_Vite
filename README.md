# Microfrontend for React + TS + Vite

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
    port: 5000,
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
"preview": "vite preview --port 5000"
```

**---App.jsx---**
Импортируем нужный модуль(компонент)

```
import { lazy } from "react";
const Wrapper = lazy(() => import("remote/Wrapper"));

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
**Создать файл tsremote_.d.ts с декларированием модулей:
`declare module "remote/Wrapper";`

## Remote APP

**---vite.config.js---**

```
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
        "./Wrapper": "./src/Wrapper",
      },
      shared: ["react"],
    }),
  ],
  server: {
    port: 5001
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
"preview": "vite preview --port 5001"
```

**App.jsx** для наглядности используем **Wrapper.jsx**.

## Запуск

Для remote приложений:
`yarn build`
`yarn preview`

Для host приложений:
`yarn dev`
