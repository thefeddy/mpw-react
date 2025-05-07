import "react-router";

declare module "react-router" {
  interface Register {
    params: Params;
  }
}

type Params = {
  "/": {};
  "/search/:type/:query/:page": {
    "type": string;
    "query": string;
    "page": string;
  };
};