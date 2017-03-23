export class Mystical {
    private static bgColor: string = "#333"
    private static fgColor: string = "#fff"
    private static position: string = "top"

    /**
     * Creates a simple notification
     * @param opts [MysticalOptions] - The mystical notifications options.
     */
    public static alert(opts: MysticalOptions) {
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

        // add the note div to the DOM
        document.body.appendChild(note)
        note.focus()

        // after the note div is on the DOM - to trigger the CSS transition
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

    /**
     * Starts the CSS transition and then removes from DOM
     * @param id - note to remove
     * @param position - note position
     */
    private static removeNoteFromDom(id, position) {
        const note = document.getElementById(id)
        if (position === "top") {
            note.style.top = "-150px"
        } else {
            note.style.bottom = "-150px"
        }
        this.wait(500).then(() => {
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
        return { bg, fg, pos }
    }

    /**
     * Generate random ID
     */
    private static generateRandomId() {
        const x = Math.floor(Math.random() * 90000) + 10000
        return `mystical-${x}`
    }

}


export interface MysticalOptions {
    template: string;
    backgroundColor?: string;
    color?: string;
    position?: string;
}

   // note.innerHTML = `
        //             <div style="position: relative">
        //                     <button type="button" id="${note.id}-button" style="position: fixed; background: transparent; outline: none; border: none; top: 5px; margin: 0; right: 0.5%;">
        //                         <svg fill="${defaults.fg}" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
        //                             <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
        //                             <path d="M0 0h24v24H0z" fill="none"/>
        //                         </svg>
        //                     </button>
        //                 ${opts.template}
        //             </div>
        //     `