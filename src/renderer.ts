/**
 * This file will automatically be loaded by webpack and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/tutorial/application-architecture#main-and-renderer-processes
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 *
 * To enable Node.js integration in this file, open up `main.js` and enable the `nodeIntegration`
 * flag:
 *
 * ```
 *  // Create the browser window.
 *  mainWindow = new BrowserWindow({
 *    width: 800,
 *    height: 600,
 *    webPreferences: {
 *      nodeIntegration: true
 *    }
 *  });
 * ```
 */



import './index.css';
import mathjs = require('mathjs')


console.log('👋 This message is being logged by "renderer.js", included via webpack');

let calcInput = document.getElementById("calc-input") as HTMLInputElement;
let outLet = document.getElementById("outlet");
outLet.style.display = "block";


calcInput.style.display = "block";


const { create, all } = mathjs;
const bigmath = create(all, {
    number: 'BigNumber', // Choose 'number' (default), 'BigNumber', or 'Fraction'
    precision: 128        // 64 by default, only applicable for BigNumbers
})


calcInput.addEventListener('keypress', (e) => {
    console.log(e.code);
    if (e.code == "Enter") {
        outLet.innerHTML += "<p class=\"pending-calc\">" + calcInput.value + "</p>";

        outLet.innerHTML += "<p class=\"result\">   " + bigmath.evaluate(calcInput.value) + "</p>";
        calcInput.value = "";
        outLet.scrollTop = outLet.scrollHeight;
    }
})
