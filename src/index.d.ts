export declare class Mystical {
    private static bgColor;
    private static fgColor;
    private static position;
    private static positiveText;
    private static negativeText;
    /**
     * Creates a simple notification
     * @param opts [MysticalOptions] - The mystical notifications options.
     */
    static alert(opts: AlertOptions): void;
    /**
     * Create a yes/no confirmation note
     * @param opts [ConfirmOptions]
     */
    static confirm(opts: ConfirmOptions): Promise<boolean>;
    private static startTransition(defaults, note, top, bottom);
    private static setInitStyles(defaults, note);
    /**
     * Starts the CSS transition and then removes from DOM
     * @param id - note to remove
     * @param position - note position
     */
    private static removeNoteFromDom(id, position);
    /**
     * Helper for setTimeout with 0
     */
    private static tick();
    /**
     * Helper for setTimeout with passed duration
     * @param time [number] - milliseconds to wait
     */
    private static wait(time);
    /**
     * Returns an object with the options object settings - since several args are optional
     * @param opts
     */
    private static createDefaultOpts(opts);
    /**
     * Generate random ID
     */
    private static generateRandomId();
}
export interface AlertOptions {
    template: string;
    backgroundColor?: string;
    color?: string;
    position?: string;
}
export interface ConfirmOptions {
    template: string;
    backgroundColor?: string;
    color?: string;
    position?: string;
    positiveText?: string;
    negativeText?: string;
}
