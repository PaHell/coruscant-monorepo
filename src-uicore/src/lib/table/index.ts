import type { Snippet } from "svelte";
import { writable, type Readable } from "svelte/store";

export { default as Table } from "./Table.svelte";
export { default as Column } from "./Column.svelte";

export const TableContextKey = Symbol("TableContext");

export type TableProperties<TModel> = {
      // model
      key?: keyof TModel;
      // lists
      items: TModel[];
      selected?: TModel[];
      // options
      searchValue?: string;
      enableDnD?: boolean;
      hideState?: boolean;
      hideCheckbox?: boolean;
      allowDelete?: boolean;
      // events
      onAdd?: () => PromiseLike<TModel>;
      onChange?: (items: TModel[]) => unknown;
      onMove?: (items: TModel[]) => unknown;
      onSearch?: (value: string, item: TModel) => number;
};

export type ColumnProperties<T> = {
      key?: keyof T | number;
      title: string;
      definition?: string;
      width?: number;
      initiallyHidden?: boolean;
      hideable?: boolean;
      children: Snippet<[RowContext<T>]>;
};

export type ColumnPropertiesWithKey<T> = ColumnProperties<T> & {
      key: keyof T | number;
};

type TableStoreMethods<T> = {
      register: (column: ColumnPropertiesWithKey<T>) => void;
      destroy: (key: ColumnPropertiesWithKey<T>["key"]) => void;
};

type TableStoreData<T> = {
      columns: ColumnPropertiesWithKey<T>[];
};

export type TableContext<T> = TableStoreMethods<T> & Readable<TableStoreData<T>>;

export const createTableStore = function <T>() {
      const { subscribe, update } = writable<TableStoreData<T>>({
            columns: [],
      });
      return {
            subscribe,
            register: (column: ColumnPropertiesWithKey<T>) => update(table => ({ columns: [...table.columns, column] })),
            destroy: (key: ColumnPropertiesWithKey<T>["key"]) => update(table => ({ columns: table.columns.filter(column => column.key !== key) })),
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
      toggleSelected: () => void;
};

type RequiredRowStoreData<T> = {
      state: RowState;
      data: T;
};

type OptionalRowStoreData = {
      initialState: RowState;
      disabled: boolean;
      selected: boolean;
};

export type InitRowStoreData<T> = RequiredRowStoreData<T> & Partial<OptionalRowStoreData>;

export type RowStoreData<T> = RequiredRowStoreData<T> & OptionalRowStoreData;

export type RowContext<T> = RowStoreMethods<T> & Readable<RowStoreData<T>>;

export const createRowStore = function <T>(data: InitRowStoreData<T>) {
      const { subscribe, update } = writable<RowStoreData<T>>({
            state: data.state ?? RowState.Unmodified,
            initialState: data.initialState ?? data.state ?? RowState.Unmodified,
            disabled: data.disabled ?? false,
            selected: data.selected ?? false,
            data: data.data,
      });
      return {
            subscribe,
            update: store => update(() => store),
            updateProperty: (key, value) => update(store => ({ ...store, data: { ...store.data, [key]: value } })),
            toggleDelete: () => update(store => ({ ...store, state: store.state === RowState.Deleted ? store.initialState : RowState.Deleted })),
            setState: state => update(store => ({ ...store, state })),
            toggleSelected: () => update(store => ({ ...store, selected: !store.selected })),
      } satisfies RowContext<T>;
};



