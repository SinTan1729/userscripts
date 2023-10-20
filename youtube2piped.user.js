// ==UserScript==
// @name         YouTube2Piped
// @namespace    YouTube
// @version      1.1
// @description  Redirect YouTube to chosen Piped instance
// @author       SinTan
// @match        *://*.youtube.com/*
// @match        *://youtu.be/*
// @icon         https://raw.githubusercontent.com/TeamPiped/Piped/32e7ddaaff22f4a6c0d7f6359400323da7fefd69/public/img/icons/logo.svg
// @grant        none
// @run-at       document-start
// @license      GPL-3.0
// ==/UserScript==

(function () {
    "use strict";
    // Edit instance url here to go to any instance of choice
    const instance = "https://piped.video"

    const url = new URL(window.location.href.replace('/shorts/', '/watch?v='));

    let id = url.searchParams.get('v');
    let ts = url.searchParams.get('t');
    if (id) {
        let url_new = instance + '/watch?v=' + id;
        if (ts) {
            url_new = url_new + '&t=' + ts;
        }
        window.location.replace(url_new);
    }
}
)();