export class Mystical {
    private static bgColor: string = "#333"
    private static fgColor: string = "#fff"
    private static position: string = "top"
    private static positiveText: string = "Yes"
    private static negativeText: string = "No"

    /**
     * Creates a simple notification
     * @param opts [MysticalOptions] - The mystical notifications options.
     */
    public static alert(opts: AlertOptions) {
        const defaults = this.createDefaultOpts(opts)

        // create the main note div
        const note = document.createElement("div") as HTMLDivElement
        note.id = this.generateRandomId()
        note.tabIndex = -1
        note.style.cssText = `background-color: ${defaults.bg}; border: none; user-select: none; -webkit-tap-highlight-color: rgba(255, 255, 255, 0); outline: none; cursor: pointer; color: ${defaults.fg}; position: fixed; left: 0; padding: 10px; width: 100%; transition: all 0.5s ease; margin: 0 auto; overflow-x: hidden;`

        // add click event
        note.onclick = () => {
            this.removeNoteFromDom(note.id, defaults.pos)
        }
        // close on enter and escape key press
        note.onkeydown = (ev: KeyboardEvent) => {
            if (ev.keyCode === 13 || ev.keyCode === 27) {
                this.removeNoteFromDom(note.id, defaults.pos)
            }
        }

        note.innerHTML = `
                <div style="position: relative">
                    ${opts.template}
                </div>
        `
        const iStyles = this.setInitStyles(defaults, note)

        // add the note div to the DOM
        document.body.appendChild(note)
        note.focus()

        // after the note div is on the DOM - to trigger the CSS transition
        this.startTransition(defaults, note, iStyles.top, iStyles.bottom)

    }

    /**
     * Create a yes/no confirmation note
     * @param opts [ConfirmOptions]
     */
    public static confirm(opts: ConfirmOptions): Promise<boolean> {
        return new Promise((resolve, reject) => {

            const defaults = this.createDefaultOpts(opts)

            // create the main note div
            const note = document.createElement("div") as HTMLDivElement
            note.id = this.generateRandomId()
            note.tabIndex = -1
            note.style.cssText = `background-color: ${defaults.bg}; border: none; user-select: none; -webkit-tap-highlight-color: rgba(255, 255, 255, 0); outline: none; color: ${defaults.fg}; position: fixed; left: 0; padding: 10px; width: 100%; transition: all 0.5s ease; margin: 0 auto; overflow-x: hidden;`

            // close on enter and escape key press
            note.onkeydown = (ev: KeyboardEvent) => {
                if (ev.keyCode === 13 || ev.keyCode === 27) {
                    this.removeNoteFromDom(note.id, defaults.pos)
                    resolve(false)
                }
            }

            const positiveBtnId = this.generateRandomId()
            const negativeBtnId = this.generateRandomId()
            const buttonStyle = `color: ${defaults.fg}; background-color: ${defaults.bg}; cursor: pointer; border: none; background: transparent; outline: none; margin-right: 10px; font-size: 1.1em`

            note.innerHTML = `
                <div style="position: relative">
                    ${opts.template}
                    <div style="display:inline-block; text-align: center; margin: auto; width: 100%">
                        <button id="${positiveBtnId}" style="${buttonStyle}">${defaults.posText}</button>
                        <button id="${negativeBtnId}"  style="${buttonStyle}">${defaults.negText}</button>
                    </div>
                </div>
        `

            const iStyles = this.setInitStyles(defaults, note)

            // add the note div to the DOM
            document.body.appendChild(note)
            note.focus()

            // positive btn event
            const positiveBtn = document.getElementById(positiveBtnId)
            positiveBtn.onclick = () => {
                resolve(true)
                this.removeNoteFromDom(note.id, defaults.pos)
            }

            // negative btn event
            const negativeBtn = document.getElementById(negativeBtnId)
            negativeBtn.onclick = () => {
                resolve(false)
                this.removeNoteFromDom(note.id, defaults.pos)
            }

            // after the note div is on the DOM - to trigger the CSS transition
            this.startTransition(defaults, note, iStyles.top, iStyles.bottom)

        })

    }


    private static startTransition(defaults, note, top, bottom) {
        // set the top/bottom which will start the transition
        if (defaults.pos === "top") {
            this.tick().then(() => {
                note.style.top = top
                note.style.opacity = "1"
            })
        } else {
            this.tick().then(() => {
                note.style.bottom = bottom
                note.style.opacity = "1"
            })
        }
    }

    private static setInitStyles(defaults, note) {
        let top: any
        let bottom: any
        // set initial top/bottom position
        if (defaults.pos === "top") {
            top = "0px"
            bottom = ""
            note.style.top = "-200px"
        } else {
            top = ""
            bottom = "0%"
            note.style.bottom = "-200px"
        }

        return { top: top, bottom: bottom }
    }

    /**
     * Starts the CSS transition and then removes from DOM
     * @param id - note to remove
     * @param position - note position
     */
    private static removeNoteFromDom(id, position) {
        let note = document.getElementById(id)
        if (position === "top") {
            note.style.top = "-150px"
        } else {
            note.style.bottom = "-150px"
        }

        this.wait(500).then(() => {
            if (note)
                document.body.removeChild(note)
        })
    }

    /**
     * Helper for setTimeout with 0
     */
    private static tick(): Promise<any> {
        return new Promise((resolve) => {
            setTimeout(resolve, 0)
        })
    }

    /**
     * Helper for setTimeout with passed duration
     * @param time [number] - milliseconds to wait
     */
    private static wait(time: number): Promise<any> {
        return new Promise((resolve) => {
            setTimeout(resolve, time)
        })
    }

    /**
     * Returns an object with the options object settings - since several args are optional
     * @param opts 
     */
    private static createDefaultOpts(opts) {
        const bg = opts.backgroundColor ? opts.backgroundColor : this.bgColor
        const fg = opts.color ? opts.color : this.fgColor
        const pos = opts.position ? opts.position : this.position
        const posText = opts.positiveText ? opts.positiveText : this.positiveText
        const negText = opts.negativeText ? opts.negativeText : this.negativeText
        return { bg, fg, pos, posText, negText }
    }

    /**
     * Generate random ID
     */
    private static generateRandomId() {
        const x = Math.floor(Math.random() * 90000) + 10000
        return `mystical-${x}`
    }

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