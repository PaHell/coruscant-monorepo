export type MergeWithUnion<T, U> = {
      [K in keyof T | keyof U]:
      K extends keyof T
      ? K extends keyof U
      ? T[K] | U[K]
      : T[K]
      : K extends keyof U
      ? U[K]
      : never;
};