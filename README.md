# Salat Time

Location based daily salat schedule

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so the `tsc` CLI is replaced with `vue-tsc` for type checking.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm start
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## Data Source

1. Reverse geolocation from [https://nominatim.openstreetmap.org/](https://nominatim.openstreetmap.org/)
2. Geoip from [https://geoiplookup.io/api](https://geoiplookup.io/api)
3. Salat time from [https://api.aladhan.com](https://api.aladhan.com)
