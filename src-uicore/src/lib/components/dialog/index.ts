export { default as ConfirmationDialog } from "./ConfirmationDialog.svelte";
export { default as FeedbackDialog } from "./FeedbackDialog.svelte";

export type FeedbackModel = {
      message: string;
      rating: number;
      email: string;
};
