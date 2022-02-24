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



//import './index.css';


console.log('👋 This message is being logged by "renderer.js", included via webpack');

var calcInput = document.getElementById("calc-input");
var outLet = document.getElementById("outlet");



var bigmath = math.create(math.all, {
    number: 'BigNumber', // Choose 'number' (default), 'BigNumber', or 'Fraction'
    precision: 128        // 64 by default, only applicable for BigNumbers
})


calcInput.addEventListener('keypress', (e) => {
    console.log(e.code);
    if (e.code == "Enter") {
        let calcResult = bigmath.evaluate(calcInput.value);
        outLet.innerHTML = "<p class=\"pending-calc\">" + calcInput.value + "</p>" +
                           "<p class=\"result\">   " + calcResult + "</p>"  + outLet.innerHTML;
        calcInput.value = calcResult;
       // outLet.scrollTop = outLet.scrollHeight;
    }
})


window.addEventListener('resize', () => {
    outLet.style.height = (window.outerHeight - 100)+"px";

});
function clearInput() {
    document.getElementById("calc-input").value = "";
}