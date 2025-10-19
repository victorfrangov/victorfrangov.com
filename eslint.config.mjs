import next from "eslint-config-next"

export default [
  ...next, // includes core-web-vitals and TS/React settings
  {
    ignores: [".next/**", "node_modules/**"],
  },
]