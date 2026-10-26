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
        detail: `[Demonstration Site / Демонстрационный сайт]\nDirect ${channelName} contact is disabled because this is a demonstration showcase. All retreats, dates, and contacts shown are fictional.\n\n(Это демонстрационный сайт: прямая связь через ${channelName} не подключена, все контакты вымышленные. Вы можете проверить отправку сообщения через эту форму.)`,
      }),
    );
  }
}
