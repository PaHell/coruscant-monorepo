import type { OmitStartingWith } from "$lib/utils/types.js";
import type { Snippet } from "svelte";
import type { DOMAttributes, HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';

export { default as Button } from "./Button.svelte";

export type HtmlAnchorAttributesBase = OmitStartingWith<Omit<HTMLAnchorAttributes, "type" | "contextmenu">, "on">;
export type HtmlButtonAttributesBase = OmitStartingWith<Omit<HTMLButtonAttributes, "contextmenu">, "on">;
export type HtmlEventsBase = DOMAttributes<HTMLElement>;

export interface ButtonProperties extends HtmlButtonAttributesBase, HtmlAnchorAttributesBase {
      icon?: string;
      label: string;
      hideLabel?: boolean;
      variant?: 'primary' | 'secondary' | 'soft' | 'integrated' | 'danger' | 'warning' | 'link';
      size?: 'sm' | 'md' | 'lg';
      active?: boolean;
      children?: Snippet<[]>;
}
