import { writable } from "svelte/store";

export { default as Form } from "./Form.svelte";

export const FormContextKey = Symbol("FormContext");

export type FormField = {
      value: unknown;
      valid: boolean;
      error?: string;
};

export type FormContext = {
      clear: () => unknown;
      set: (key: string, field: FormField) => unknown;
};

export const createFormStore = () => {
      const { subscribe, set, update } = writable<Record<string, FormField>>({});
      return {
            subscribe,
            clear: () => set({}),
            set: (key: string, field: FormField) => update((fields) => ({ ...fields, [key]: field })),
      };
};

