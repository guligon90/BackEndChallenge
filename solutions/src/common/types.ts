// Generic way to type an object
export type TObjectIndex = string | number | symbol;
export type TObject<TIndex extends TObjectIndex, TData = unknown> = Record<TIndex, TData>;

// Just a generic way to type a function
// e.g. const someFunction: Callable<[string, number], string> = (x: string, y: number): string => { ... };
export type TCallable<A = unknown[], B = unknown> = (...args: A extends unknown[] ? A : [A]) => B;
