export const PREFILL_EVENT = "prefill-question";

export function askAboutShift(name: string, dates: string) {
  window.dispatchEvent(
    new CustomEvent(PREFILL_EVENT, {
      detail: `Hello! I have a question about the "${name}" departure (${dates}).`,
    }),
  );
}
