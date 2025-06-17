declare module 'react' {
  // Re-export common React types
  export * from 'react/index';

  // Add explicit declarations for hooks and other React exports
  export function useState<T>(initialState: T | (() => T)): [T, (newState: T | ((prevState: T) => T)) => void];
  export function useEffect(effect: () => void | (() => void), deps?: ReadonlyArray<any>): void;
  export function useContext<T>(context: React.Context<T>): T;
  export function useReducer<R extends React.Reducer<any, any>, I>(
    reducer: R,
    initialArg: I,
    init?: (arg: I) => React.ReducerState<R>,
  ): [React.ReducerState<R>, React.Dispatch<React.ReducerAction<R>>];
  export function useCallback<T extends (...args: any[]) => any>(callback: T, deps: ReadonlyArray<any>): T;
  export function useMemo<T>(factory: () => T, deps: ReadonlyArray<any> | undefined): T;
  export function useRef<T = undefined>(initialValue: T): React.MutableRefObject<T>;
  export function useLayoutEffect(effect: React.EffectCallback, deps?: React.DependencyList): void;
  export function useImperativeHandle<T, R extends T>(
    ref: React.Ref<T> | undefined,
    init: () => R,
    deps?: React.DependencyList,
  ): void;

  // Fix for Fragment
  export const Fragment: React.ReactFragment;

  // Common event types
  export interface ChangeEvent<T = Element> extends React.SyntheticEvent<T> {
    target: EventTarget & T;
  }

  export interface FormEvent<T = Element> extends React.SyntheticEvent<T> {}
  
  export type FormEventHandler<T = Element> = React.EventHandler<FormEvent<T>>;
  export type ChangeEventHandler<T = Element> = React.EventHandler<ChangeEvent<T>>;
  
  // Error handling types
  export interface ErrorInfo {
    componentStack: string;
  }
} 