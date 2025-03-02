import type { Snippet } from "svelte";
import type { Subscriber, Unsubscriber } from "svelte/store";

export { default as Wizard } from "./Wizard.svelte";
export { default as WizardStep } from "./WizardStep.svelte";

export type WizardStepProperties = {
      icon: string;
      label: string;
      valid: boolean;
      children: Snippet<[]>;
};

export type WizardSteps = Record<string | number, WizardStepProperties>;

export type WizardStepsStore = {
      subscribe: (this: void, run: Subscriber<WizardSteps>, invalidate?: () => void) => Unsubscriber;
      set: (key: string | number, value: WizardStepProperties) => void;
};
