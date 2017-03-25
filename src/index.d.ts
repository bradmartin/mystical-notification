export declare class Mystical {
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
