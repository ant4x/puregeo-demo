export const PREFILL_EVENT = "prefill-question";

export function askAboutShift(name: string, dates: string) {
  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent(PREFILL_EVENT, {
        detail: `Hello! I have a question about the "${name}" departure (${dates}).`,
      }),
    );
  }
}

export function askDemoContact(channelName: string) {
  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent(PREFILL_EVENT, {
        detail: `This is a demo site. Direct ${channelName} contact is not available. All retreats, dates, and contacts shown are fictional.`,
      }),
    );
  }
}

