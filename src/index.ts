export class Mystical {

    /**
     * Creates a simple notification
     * @param opts [MysticalOptions] - The mystical notifications options.
     */
    public static alert(opts: AlertOptions) {
        const defaults = createDefaultOpts(opts)

        // create the main note div
        const note = document.createElement("div") as HTMLDivElement
        note.id = generateRandomId()
        note.tabIndex = -1
        note.style.cssText = `background-color: ${defaults.bg}; z-index: 99999999; border: none; user-select: none; -webkit-tap-highlight-color: rgba(255, 255, 255, 0); outline: none; cursor: pointer; color: ${defaults.fg}; position: fixed; left: 0; padding: 10px; width: 100%; transition: all 0.5s ease; margin: 0 auto; overflow-x: hidden;`

        // add click event
        note.onclick = () => {
            removeNoteFromDom(note.id, defaults.pos)
        }
        // close on enter and escape key press
        note.onkeydown = (ev: KeyboardEvent) => {
            if (ev.keyCode === 13 || ev.keyCode === 27) {
                removeNoteFromDom(note.id, defaults.pos)
            }
        }

        note.innerHTML = `
                <div style="position: relative">
                    ${opts.template}
                </div>
        `
        const iStyles = setInitStyles(defaults, note)

        // add the note div to the DOM
        document.body.appendChild(note)
        note.focus()

        // after the note div is on the DOM - to trigger the CSS transition
        startTransition(defaults, note, iStyles.top, iStyles.bottom)

    }

    /**
     * Create a yes/no confirmation note
     * @param opts [ConfirmOptions]
     */
    public static confirm(opts: ConfirmOptions): Promise<boolean> {
        return new Promise((resolve, reject) => {

            const defaults = createDefaultOpts(opts)

            // create the main note div
            const note = document.createElement("div") as HTMLDivElement
            note.id = generateRandomId()
            note.tabIndex = -1
            note.style.cssText = `background-color: ${defaults.bg}; z-index: 99999999; border: none; user-select: none; -webkit-tap-highlight-color: rgba(255, 255, 255, 0); outline: none; color: ${defaults.fg}; position: fixed; left: 0; padding: 10px; width: 100%; transition: all 0.5s ease; margin: 0 auto; overflow-x: hidden;`

            // close on enter and escape key press
            note.onkeydown = (ev: KeyboardEvent) => {
                if (ev.keyCode === 13 || ev.keyCode === 27) {
                    removeNoteFromDom(note.id, defaults.pos)
                    resolve(false)
                }
            }

            const positiveBtnId = generateRandomId()
            const negativeBtnId = generateRandomId()
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

            const iStyles = setInitStyles(defaults, note)

            // add the note div to the DOM
            document.body.appendChild(note)
            note.focus()

            // positive btn event
            const positiveBtn = document.getElementById(positiveBtnId)
            positiveBtn.onclick = () => {
                resolve(true)
                removeNoteFromDom(note.id, defaults.pos)
            }

            // negative btn event
            const negativeBtn = document.getElementById(negativeBtnId)
            negativeBtn.onclick = () => {
                resolve(false)
                removeNoteFromDom(note.id, defaults.pos)
            }

            // after the note div is on the DOM - to trigger the CSS transition
            startTransition(defaults, note, iStyles.top, iStyles.bottom)

        })

    }



}

function startTransition(defaults, note, top, bottom) {
    // set the top/bottom which will start the transition
    if (defaults.pos === "top") {
        tick().then(() => {
            note.style.top = top
            note.style.opacity = "1"
        })
    } else {
        tick().then(() => {
            note.style.bottom = bottom
            note.style.opacity = "1"
        })
    }
}

function setInitStyles(defaults, note) {
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
function removeNoteFromDom(id, position) {
    let note = document.getElementById(id)
    if (position === "top") {
        note.style.top = "-150px"
    } else {
        note.style.bottom = "-150px"
    }

    wait(500).then(() => {
        if (note)
            document.body.removeChild(note)
    })
}

/**
 * Helper for setTimeout with 0
 */
function tick(): Promise<any> {
    return new Promise((resolve) => {
        setTimeout(resolve, 0)
    })
}

/**
 * Helper for setTimeout with passed duration
 * @param time [number] - milliseconds to wait
 */
function wait(time: number): Promise<any> {
    return new Promise((resolve) => {
        setTimeout(resolve, time)
    })
}

/**
 * Returns an object with the options object settings - since several args are optional
 * @param opts 
 */
function createDefaultOpts(opts) {
    const bg = opts.backgroundColor ? opts.backgroundColor : "#333"
    const fg = opts.color ? opts.color : "#fff"
    const pos = opts.position ? opts.position : "top"
    const posText = opts.positiveText ? opts.positiveText : "Yes"
    const negText = opts.negativeText ? opts.negativeText : "No"
    return { bg, fg, pos, posText, negText }
}

/**
 * Generate random ID
 */
function generateRandomId() {
    const x = Math.floor(Math.random() * 90000) + 10000
    return `mystical-${x}`
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