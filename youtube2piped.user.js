// ==UserScript==
// @name         YouTube2Piped
// @namespace    YouTube
// @version      1.2.1
// @description  Redirect YouTube to chosen Piped instance
// @author       SinTan
// @match        *://*.youtube.com/*
// @match        *://youtu.be/*
// @icon         https://raw.githubusercontent.com/TeamPiped/Piped/32e7ddaaff22f4a6c0d7f6359400323da7fefd69/public/img/icons/logo.svg
// @grant        none
// @run-at       document-start
// @license      GPL-3.0-only
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
    } else {

        let pattern = /https:\/\/www\.youtube\.com\/((?:(?:channel\/)|\@)[A-Za-z0-9\_\-]+).*/;
        let channelId = pattern.exec(url)[1];

        if (channelId) {
            let url_new = instance + '/' + channelId;
            window.location.replace(url_new);
        }
    }
}
)();