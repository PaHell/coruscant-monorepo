import type { Snippet } from "svelte";
export { default as Button } from "./Button.svelte";

export interface ButtonProperties {
      icon?: string;
      label: string;
      hideLabel?: boolean;
      variant?: 'primary' | 'secondary' | 'tertiary' | 'integrated' | 'form' | 'danger' | 'warning' | 'link';
      size?: 'default' | 'large';
      active?: boolean;
      class?: string;
      children?: Snippet<[]>;
}