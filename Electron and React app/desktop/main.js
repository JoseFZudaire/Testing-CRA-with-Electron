import { app, BrowserWindow } from 'electron';
// const { app, BrowserWindow } = require('electron');
import path, { dirname } from "path";
// const path = require("path");
import isDev from "electron-is-dev";
// const isDev = require("electron-is-dev");
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const createWindow = () => {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        // webPreferences: {
        //     preload: path.join(__dirname, 'preload.js')
        // }  
    })

    // mainWindow.loadFile('index.html')

    if(isDev) {
        mainWindow.loadURL("http://localhost:3000")
    } else {
        mainWindow.loadFile(path.join(__dirname, "builder/index.html"))
    }
    
}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if(BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('windows-all-closed', () => {
    if(process.platform !== 'darwin') app.quit()
})

