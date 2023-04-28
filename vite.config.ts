import { defineConfig } from "vitest/config";
import reactPlugin from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactPlugin()],
  test: {
    environment: "jsdom",
  },
});
