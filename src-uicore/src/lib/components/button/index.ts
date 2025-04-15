export { default as Button } from "./Button.svelte";

export interface ButtonProperties {
      icon?: string;
      label: string;
      hideLabel?: boolean;
      variant?: 'primary' | 'secondary' | 'soft' | 'integrated' | 'danger' | 'warning' | 'link';
      size?: 'sm' | 'md' | 'lg';
      active?: boolean;
}