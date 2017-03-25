export class Mystical {

    /**
     * Creates a simple notification
     * @param opts [MysticalOptions] - The mystical notifications options.
     */
    public static alert(opts: AlertOptions) {
        const defaults = initDefaults(opts)
        // create the main note div
        const note = createNote(defaults)
        // create the backdrop if backdrop === true
        let backdrop
        if (defaults.backdrop === true) {
            backdrop = createBackdrop()
            document.body.appendChild(backdrop)
            backdrop.onclick = (ev: MouseEvent) => {
                ev.preventDefault()
                removeNoteFromDom(note, backdrop, defaults.pos)
            }
        }

        // add click event
        note.onclick = () => {
            removeNoteFromDom(note, backdrop, defaults.pos)
        }
        // close on enter and escape key press
        note.onkeydown = (ev: KeyboardEvent) => {
            if (ev.keyCode === 13 || ev.keyCode === 27) {
                removeNoteFromDom(note, backdrop, defaults.pos)
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

            const defaults = initDefaults(opts)
            // create the main note div
            const note = createNote(defaults)
            // create the backdrop if backdrop === true
            let backdrop
            if (defaults.backdrop === true) {
                backdrop = createBackdrop()
                document.body.appendChild(backdrop)
                backdrop.onclick = (ev: MouseEvent) => {
                    ev.preventDefault()
                    resolve(false)
                    removeNoteFromDom(note, backdrop, defaults.pos)
                }
            }

            // close on enter and escape key press
            note.onkeydown = (ev: KeyboardEvent) => {
                if (ev.keyCode === 13 || ev.keyCode === 27) {
                    ev.preventDefault()
                    removeNoteFromDom(note, backdrop, defaults.pos)
                    resolve(false)
                }
            }



            const positiveBtnId = randoID()
            const negativeBtnId = randoID()
            const buttonStyle = `color: ${defaults.fg}; background-color: ${defaults.bg}; cursor: pointer; border: none; background: transparent; padding:4px; font-size: 1em;`

            note.innerHTML = `
                <div style="position: relative">
                    ${opts.template}
                    <div style="display:inline-block; text-align: center; margin: auto; width: 100%">
                        <button id="${negativeBtnId}"  style="${buttonStyle}">${defaults.negText}</button>
                        <button id="${positiveBtnId}" style="${buttonStyle}">${defaults.posText}</button>
                    </div>
                </div>
        `

            const iStyles = setInitStyles(defaults, note)

            // add the note div to the DOM
            document.body.appendChild(note)

            // positive btn event
            const positiveBtn = document.getElementById(positiveBtnId)
            positiveBtn.onclick = (ev: MouseEvent) => {
                removeNoteFromDom(note, backdrop, defaults.pos)
                resolve(true)
            }

            // negative btn event
            const negativeBtn = document.getElementById(negativeBtnId)
            negativeBtn.onclick = (ev: MouseEvent) => {
                resolve(false)
                removeNoteFromDom(note, backdrop, defaults.pos)
            }

            negativeBtn.focus()

            // after the note div is on the DOM - to trigger the CSS transition
            startTransition(defaults, note, iStyles.top, iStyles.bottom)

        })

    }

}

/**
 * Sets the top/bottom style props to trigger the css transition
 * @param defaults
 * @param note 
 * @param top 
 * @param bottom 
 */
function startTransition(defaults, note, top, bottom) {
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


function createBackdrop() {
    const backdrop = document.createElement("div") as HTMLDivElement
    backdrop.style.cssText = `position: fixed; height: 100%; width: 100%; top: 0; left: 0; overflow: hidden; background-color: rgba(33,33,33,1.0); opacity: 0.48;`
    return backdrop
}

function createNote(defaults) {
    const note = document.createElement("div") as HTMLDivElement
    note.tabIndex = -1
    note.style.cssText = `background-color: ${defaults.bg}; z-index: 99999999; border: none; user-select: none; -webkit-tap-highlight-color: rgba(255, 255, 255, 0); outline: none; cursor: pointer; color: ${defaults.fg}; position: fixed; left: 0; padding: 10px; width: 100%; transition: all 0.5s ease; margin: 0 auto; overflow-x: hidden;`
    return note
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
function removeNoteFromDom(note, backdrop, position) {
    if (position === "top") {
        note.style.top = "-150px"
    } else {
        note.style.bottom = "-150px"
    }

    tick().then(() => {
        if (backdrop !== undefined)
            document.body.removeChild(backdrop)
    })

    wait(500).then(() => {
        if (note !== undefined)
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
function initDefaults(opts) {
    const bg = opts.backgroundColor ? opts.backgroundColor : "#333"
    const fg = opts.color ? opts.color : "#fff"
    const pos = opts.position ? opts.position : "top"
    const backdrop = opts.backdrop ? opts.backdrop : true
    const posText = opts.positiveText ? opts.positiveText : "Yes"
    const negText = opts.negativeText ? opts.negativeText : "No"
    return { bg, fg, pos, backdrop, posText, negText }
}

/**
 * Generate random ID
 */
function randoID(): string {
    const x = Math.floor(Math.random() * 90000) + 10000
    return `mystical-${x}`
}

export interface AlertOptions {
    template: string
    backgroundColor?: string
    color?: string
    position?: string
    backdrop?: boolean
}
export interface ConfirmOptions {
    template: string
    backgroundColor?: string
    color?: string
    position?: string
    backdrop?: boolean
    positiveText?: string
    negativeText?: string
}