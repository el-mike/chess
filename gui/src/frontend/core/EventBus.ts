export type CallbackArgs<T extends Record<string, unknown> = Record<string, unknown>> = T;
export type SubscriptionCallback = (args?: CallbackArgs) => void;


export type Registry = {
  [key: string]: SubscriptionCallback[];
};

export class EventBus {
  private static _instance: EventBus;

  private _registry: Registry = {};

  private constructor() {}

  public static getInstance() {
    if (!EventBus._instance) {
      EventBus._instance = new EventBus();
    }

    return EventBus._instance;
  }

  public dispatch<T extends CallbackArgs = CallbackArgs>(event: string, args?: T) {
    this._registry?.[event]?.forEach(cb => cb(args));
  }

  public register(event: string, callback: SubscriptionCallback) {
    if (!this._registry[event]) {
      this._registry[event] = [];
    }

    this._registry[event].push(callback);

    return () => {
      this._registry[event] = this._registry[event].filter(cb => cb !== callback);
    };
  }
}
