import type { Snippet } from "svelte";
import { writable, type Readable } from "svelte/store";

export { default as Table } from "./Table.svelte";
export { default as Row } from "./Row.svelte";
export { default as Column } from "./Column.svelte";

export const TableContextKey = Symbol("TableContext");

export type TableProperties<TModel> = {
      key?: keyof TModel;
      // lists
      items: TModel[];
      selected?: TModel[];
      // events
      onAdd?: () => PromiseLike<TModel>;
      onEdit?: (item: TModel) => PromiseLike<TModel>;
      onDelete?: (item: TModel) => PromiseLike<unknown>;
      onChange?: (items: TModel) => PromiseLike<unknown>;
      onSelect?: (items: TModel[]) => PromiseLike<unknown>;
};

export type ColumnProperties<T> = {
      key?: string;
      title: string;
      width?: number;
      children: Snippet<[RowContext<T>]>;
};

type TableStoreMethods<T> = {
      register: (column: ColumnProperties<T>) => void;
      destroy: (key: string) => void;
};

type TableStoreData<T> = {
      columns: ColumnProperties<T>[];
};

export type TableContext<T> = TableStoreMethods<T> & Readable<TableStoreData<T>>;

export const createTableStore = function <T>() {
      const { subscribe, update } = writable<TableStoreData<T>>({
            columns: [],
      });
      return {
            subscribe,
            register: (column: ColumnProperties<T>) => update(table => ({ columns: [...table.columns, column] })),
            destroy: (key: ColumnProperties<T>["key"]) => update(table => ({ columns: table.columns.filter(column => column.key !== key) })),
      } satisfies TableContext<T>;
};

export enum RowState {
      Unmodified,
      Modified,
      Added,
      Deleted,
      Imported
}

type RowStoreMethods<T> = {
      update: (store: RowStoreData<T>) => void;
      updateProperty: (key: keyof T, value: T[keyof T]) => void;
      toggleDelete: () => void;
      setState: (state: RowState) => void;
};

type RequiredRowStoreData<T> = {
      state: RowState;
      data: T;
};

type OptionalRowStoreData = {
      initialState: RowState;
      disabled: boolean;
};

export type InitRowStoreData<T> = RequiredRowStoreData<T> & Partial<OptionalRowStoreData>;

export type RowStoreData<T> = RequiredRowStoreData<T> & OptionalRowStoreData;

export type RowContext<T> = RowStoreMethods<T> & Readable<RowStoreData<T>>;

export const createRowStore = function <T>(data: InitRowStoreData<T>) {
      const { subscribe, update } = writable<RowStoreData<T>>({
            state: data.state ?? RowState.Unmodified,
            initialState: data.initialState ?? data.state ?? RowState.Unmodified,
            disabled: data.disabled ?? false,
            data: data.data,
      });
      return {
            subscribe,
            update: store => update(() => store),
            updateProperty: (key, value) => update(store => ({ ...store, data: { ...store.data, [key]: value } })),
            toggleDelete: () => update(store => ({ ...store, state: store.state === RowState.Deleted ? store.initialState : RowState.Deleted })),
            setState: state => update(store => ({ ...store, state })),
      } satisfies RowContext<T>;
};



