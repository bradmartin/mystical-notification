export declare class Mystical {
    private static BLUE;
    private static GREEN;
    private static RED;
    private static WHITE;
    /**
     * Shows an alert with a blue backgroundColor and white text. No backdrop and duration of 3000.
     * @param opts [AlertOptions]
     */
    static info(template: string): void;
    /**
     * Shows an alert with a green backgroundColor and white text. No backdrop and duration of 3000.
     * @param opts [AlertOptions]
     */
    static success(template: string): void;
    /**
     * Shows an alert with a red backgroundColor and white text. No backdrop and duration of 3000.
     * @param template [string]
     */
    static warning(template: string): void;
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
}
export interface AlertOptions {
    template: string;
    backgroundColor?: string;
    color?: string;
    position?: string;
    backdrop?: boolean;
    duration?: number;
}
export interface ConfirmOptions {
    template: string;
    backgroundColor?: string;
    color?: string;
    position?: string;
    backdrop?: boolean;
    positiveText?: string;
    negativeText?: string;
}
