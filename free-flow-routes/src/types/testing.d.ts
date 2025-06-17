declare namespace jest {
  interface Matchers<R> {
    toBeInTheDocument(): R;
    toHaveAttribute(attr: string, value?: string): R;
    toHaveTextContent(text: string | RegExp): R;
    toBeVisible(): R;
    toBeDisabled(): R;
    toBeEnabled(): R;
    toHaveClass(className: string): R;
    toHaveStyle(css: Record<string, any>): R;
  }
  
  type Mock<T extends (...args: any[]) => any> = {
    (...args: Parameters<T>): ReturnType<T>;
    mockClear(): void;
    mockReset(): void;
    mockImplementation(fn: T): Mock<T>;
    mockReturnValue(value: ReturnType<T>): Mock<T>;
    mockReturnValueOnce(value: ReturnType<T>): Mock<T>;
    mockResolvedValue(value: Awaited<ReturnType<T>>): Mock<T>;
    mockResolvedValueOnce(value: Awaited<ReturnType<T>>): Mock<T>;
    mockRejectedValue(value: any): Mock<T>;
    mockRejectedValueOnce(value: any): Mock<T>;
  };
  
  type MockedFunction<T extends (...args: any[]) => any> = Mock<T>;
}

// Add React module declaration if missing
declare module 'react' {
  // Re-export all existing React types
  export * from 'react/index';
  
  // Add any missing types
  export type ReactNode = 
    | React.ReactElement
    | string
    | number
    | boolean
    | null
    | undefined
    | React.ReactNodeArray;

  export type ReactElement<P = any, T extends string | JSXElementConstructor<any> = string | JSXElementConstructor<any>> = {
    type: T;
    props: P;
    key: string | null;
  };
  
  export interface ReactNodeArray extends Array<ReactNode> {}
  
  export type JSXElementConstructor<P> = 
    | ((props: P) => ReactElement<any, any> | null)
    | (new (props: P) => Component<any, any>);
  
  export class Component<P = {}, S = {}> {
    constructor(props: P);
    state: S;
    props: P & { children?: ReactNode };
    setState(state: S | ((prevState: S, props: P) => S), callback?: () => void): void;
    forceUpdate(callback?: () => void): void;
    render(): ReactNode;
  }
} 