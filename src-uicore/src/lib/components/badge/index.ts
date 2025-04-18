export { default as Badge } from "./Badge.svelte";

export type BaseBadgeProperties = {
      label: string;
      color?: 'gray' | 'red' | 'yellow' | 'green' | 'blue' | 'indigo' | 'purple' | 'pink';
      variant?: 'dot' | 'flat' | 'border';
      pill?: boolean;
      onRemove?: (event: MouseEvent) => void;
};