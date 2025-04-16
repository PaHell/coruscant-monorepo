import type { Snippet } from "svelte";

export { default as Button } from "./Button.svelte";
export { default as Link } from "./Link.svelte";

export interface ButtonProperties {
      icon?: string;
      hideValue?: boolean;
      variant?: 'primary' | 'secondary' | 'soft' | 'integrated' | 'danger' | 'warning' | 'link';
      size?: 'sm' | 'md' | 'lg';
      active?: boolean;
      children?: Snippet<[]>;
}
