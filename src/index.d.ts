export declare class Mystical {
    private static bgColor;
    private static fgColor;
    private static position;
    private static ANIMS;
    private static SLIDE_IN_UP;
    private static SLIDE_IN_DOWN;
    private static SLIDE_OUT_UP;
    private static SLIDE_OUT_DOWN;
    /**
     * Creates a simple notification
     * @param opts [MysticalOptions] - The mystical notifications options.
     */
    static alert(opts: MysticalOptions): void;
    private static removeNoteFromDom(id, position);
    private static createDefaultOpts(opts);
    private static addAnimations();
    /**
     * Checks whether the Document has the default item class
     */
    private static hasMysticalAnimations();
    private static generateRandomId;
}
export interface MysticalOptions {
    template: string;
    backgroundColor?: string;
    color?: string;
    position?: string;
}
