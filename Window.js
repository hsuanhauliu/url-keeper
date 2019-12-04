const { BrowserWindow } = require('electron')

const defaultProps = {
    width: 400,
    minWidth: 400,
    maxWidth: 400,
    height: 600,
    minHeight: 400,
    webPreferences: {
        nodeIntegration: true
    }
}

class Window extends BrowserWindow {
    constructor ({ file, ...windowSettings }) {
        super({ ...defaultProps, ...windowSettings })

        // and load the index.html of the app.
        this.loadFile(file)
        //this.webContents.openDevTools()

        this.once('ready-to-show', () => {
            this.show()
        })
    }
}

module.exports = Window