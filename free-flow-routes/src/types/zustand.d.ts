declare module 'zustand' {
  import { ComponentType } from 'react';

  export interface StateCreator<
    T extends object,
    A extends object = T,
    M extends object = {},
    U extends object = T
  > {
    (set: StateCreatorSet<T>, get: StateCreatorGet<T>, api: M): U;
  }

  export interface StateCreatorSet<T extends object> {
    (partial: Partial<T> | ((state: T) => Partial<T>), replace?: boolean): void;
  }

  export interface StateCreatorGet<T extends object> {
    (): T;
  }

  export interface CreateStore<T extends object> {
    (): T;
  }

  export function create<T>(initializer: StateCreator<T>): (selector?: any, equals?: any) => T;
}

declare module 'zustand/middleware' {
  import { StateCreator } from 'zustand';

  export interface PersistOptions<T, P> {
    name: string;
    getStorage?: () => Storage;
    partialize?: (state: T) => P;
    onRehydrateStorage?: (state: T | undefined) => ((state: T | undefined) => void) | void;
    version?: number;
    migrate?: (persistedState: any, version: number) => P | Promise<P>;
    merge?: (persistedState: P, currentState: T) => T;
    skipHydration?: boolean;
  }

  export function persist<T>(
    config: StateCreator<T>,
    options: PersistOptions<T, any>
  ): StateCreator<T>;
} 