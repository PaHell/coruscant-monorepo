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

export type MergeWithUnionAll<T extends object[]> =
      T extends [infer First, ...infer Rest]
      ? First extends object
      ? Rest extends object[]
      ? MergeWithUnion<First, MergeWithUnionAll<Rest>>
      : First
      : never
      : object;

export type OmitStartingWith<T, Prefix extends string> = {
      [K in keyof T as K extends `${Prefix}${string}` ? never : K]: T[K];
};

export type ExtractExactMatching<T1, T2> = {
      [K in keyof T1 & keyof T2 as T1[K] extends T2[K]
      ? T2[K] extends T1[K]
      ? K
      : never
      : never]: T1[K];
};

type SvelteEventProps<E extends Record<string, Event>> = {
      [K in keyof E as `on${K & string}`]?: (event: E[K]) => void;
};

export type HtmlEventsBase = SvelteEventProps<Omit<Partial<HTMLElementEventMap>, "contextmenu">>;