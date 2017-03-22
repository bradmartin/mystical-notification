export class Mystical {
    private static bgColor: string = "#333"
    private static fgColor: string = "#fff"
    private static position: string = "top"
    private static ANIMS: string = "MYSTICAL-ANIMATIONS"
    private static SLIDE_IN_UP: string = "mystical-slideInUp"
    private static SLIDE_IN_DOWN: string = "mystical-slideInDown"
    private static SLIDE_OUT_UP: string = "mystical-slideOutUp"
    private static SLIDE_OUT_DOWN: string = "mystical-slideOutDown"

    /**
     * Creates a simple notification
     * @param opts [MysticalOptions] - The mystical notifications options.
     */
    public static alert(opts: MysticalOptions) {

        const defaults = this.createDefaultOpts(opts)

        // create the main note div
        const note = document.createElement("div") as HTMLDivElement
        note.id = this.generateRandomId()

        let top: any
        let bottom: any

        // need to determine position so the notification is set on top of window, bottom, left, right
        if (defaults.pos === "top") {
            // note.classList.add(this.slideInDown)
            note.classList.add(this.SLIDE_IN_DOWN)
            top = "0px"
            bottom = ""
        } else {
            // top = "90%"
            note.classList.add(this.SLIDE_IN_UP)
            top = ""
            bottom = "0%"
        }

        note.setAttribute("style", `background-color: ${defaults.bg}; color: ${defaults.fg}; position: fixed; top: ${top}; bottom: ${bottom}; left: 0; padding: 10px; width: 100%; height: auto; max-height: 150px; margin: 0 auto; overflow-x: hidden; animation-duration: 0.5s; animation-fill-mode: both`)

        note.innerHTML = `
                    <div style="position: relative">
                        <button type="button" id="${note.id}-button" style="position: fixed; background: transparent; outline: none; border: none; top: 5px; right: 1%;">
                            <svg fill="${defaults.fg}" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z" />
                                <path d="M0 0h24v24H0z" fill="none" />
                            </svg>
                        </button>
                        ${opts.template}
                    </div>
            `

        // Add animations to dom to attach to note
        this.addAnimations()

        document.body.appendChild(note)

        document.getElementById(`${note.id}-button`).addEventListener("click", (ev: KeyboardEvent) => {
            this.removeNoteFromDom(`${note.id}`, defaults.pos)
        })
    }

    private static removeNoteFromDom(id, position) {
        const note = document.getElementById(id)
        console.log(note);
        console.log(position);
        if (position === "top") {
            note.classList.remove(this.SLIDE_IN_DOWN)
            note.classList.add(this.SLIDE_OUT_UP)
        } else {
            note.classList.remove(this.SLIDE_IN_UP)
            note.classList.add(this.SLIDE_OUT_DOWN)
        }

        setTimeout(() => {
            document.body.removeChild(note)
        }, 1000);

    }

    private static createDefaultOpts(opts) {
        const bg = opts.backgroundColor ? opts.backgroundColor : this.bgColor;
        const fg = opts.color ? opts.color : this.fgColor;
        const pos = opts.position ? opts.position : this.position;
        return { bg, fg, pos }
    }

    private static addAnimations() {
        if (!this.hasMysticalAnimations()) {
            let iClass = document.createElement("style") as HTMLStyleElement
            iClass.id = `${this.ANIMS}`
            iClass.type = "text/css"
            iClass.innerHTML = `
            @keyframes mystical-slideInUp { from { transform: translate3d(0, 100%, 0); visibility: visible; } to { transform: translate3d(0, 0, 0); } } .mystical-slideInUp { animation-name: mystical-slideInUp; }
            @keyframes mystical-slideInDown { from { transform: translate3d(0, -100%, 0); visibility: visible; } to { transform: translate3d(0, 0, 0); } } .mystical-slideInDown { animation-name: mystical-slideInDown; }
            @keyframes mystical-slideOutDown { from { transform: translate3d(0, 0, 0); } to { visibility: hidden; transform: translate3d(0, 100%, 0); } } .mystical-slideOutDown { animation-name: mystical-slideOutDown; }
            @keyframes mystical-slideOutUp { from { transform: translate3d(0, 0, 0); } to { visibility: hidden; transform: translate3d(0, -100%, 0); } } .mystical-slideOutUp { animation-name: mystical-slideOutUp; }
            `
            document.head.appendChild(iClass)
        }
    }

    /**
     * Checks whether the Document has the default item class
     */
    private static hasMysticalAnimations() {
        return document.getElementById(`${this.ANIMS}`) ? true : false;
    }

    private static generateRandomId = () => {
        // RFC4122 version 4 compliant UUID
        const id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
            const r = Math.random() * 16 | 0
            const v = c === 'x' ? r : (r & 0x3 | 0x8)
            return v.toString(16)
        })
        return `mystical-${id}`
    }

}


export interface MysticalOptions {
    template: string;
    backgroundColor?: string;
    color?: string;
    position?: string;
}