import type { Snippet } from "svelte";
import _Button from "./Button.svelte";

export const Button = _Button;

export interface ButtonProperties {
      icon?: string;
      label: string;
      hideLabel?: boolean;
      variant?: 'default' | 'primary' | 'outline' | 'subtle' | 'transparent' | 'warning' | 'danger';
      size?: 'default' | 'large';
      active?: boolean;
      class?: string;
      children?: Snippet<[]>;
}