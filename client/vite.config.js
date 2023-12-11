import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
const fileNames = ["src", "components", "scenes"];
const filePaths = fileNames.reduce(
  (acc, cur) => ({
    ...acc,
    [cur]: `/${cur === "src" ? cur : "src/" + cur}`,
  }),
  ""
);
export default defineConfig({
  plugins: [
    react({
      include: "**/*.jsx",
    }),
  ],
  resolve: {
    alias: {
      ...filePaths,
    },
  },
});
