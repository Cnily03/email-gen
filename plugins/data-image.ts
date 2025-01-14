import type { AstroIntegration } from "astro";

export default function createPlugin(): AstroIntegration {
  return {
    name: "DataImage",
    hooks: {
      "astro:config:setup": ({ updateConfig }) => {
        updateConfig({
          image: {
            service: {
              entrypoint: "./plugins/data-image-service",
            }
          }
        });
      },
    }
  };
}