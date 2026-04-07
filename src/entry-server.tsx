import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import AppSSR from "./AppSSR.tsx";

export function render(url: string) {
  return renderToString(
    <StaticRouter location={url}>
      <AppSSR />
    </StaticRouter>
  );
}
