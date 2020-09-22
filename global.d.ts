/* eslint-disable @typescript-eslint/no-explicit-any */
declare module '*.scss' {
  const content: { [className: string]: string };
  export default content;
}

declare module '*.svg' {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content;
}

declare module '*.png' {
  const value: any;
  export = value;
}

interface Window {
  __appConfig: Record<string, string>;
  __Cypress__: boolean;
  safari?: object;
  chrome?: object;
}

interface NodeModule {
  hot: {
    accept(): void;
  };
}
