type PubEvent = string;
type Publisher = Map<PubEvent, PubAction[]>;
interface PubAction {
  (arg0: Record<string, unknown>): unknown;
}

export function publish(
  publisher: Publisher,
  event: PubEvent,
  data = {}
): void {
  const callbacks: PubAction[] = publisher.get(event) ?? [];
  if (callbacks.length) {
    callbacks.forEach((cb) => cb(data));
  }
}

export function subscribe(
  publisher: Publisher,
  event: PubEvent,
  callback: PubAction
): Publisher {
  if (!publisher.has(event)) {
    publisher.set(event, []);
  }
  (publisher.get(event) as PubAction[]).push(callback);
  return publisher;
}

// * contrived export to see if I can get IDE to not scream.
export const clog: PubAction = function clog(arg0) {
  console.table(arg0);
  const args: unknown[] = [];
  for (const key in arg0) {
    if (Object.prototype.hasOwnProperty.call(arg0, key)) {
      args.push(arg0[key]);
    }
  }
  return args;
};
