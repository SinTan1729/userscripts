// ==UserScript==
// @name        Squabbles Hide Username
// @namespace   Squabbles
// @license     GNU GPLv3
// @match       https://squabbles.io/*
// @grant       none
// @version     1.0
// @author      SinTan
// @description 18/6/2023, 11:50:07 pm
// ==/UserScript==

// Change this to whatever you want
const new_username = 'username'

const checkElement = async selector => {
    while (document.querySelector(selector) === null) {
        await new Promise(resolve => requestAnimationFrame(resolve))
    }
    return document.querySelector(selector);
};

checkElement('div.ms-2').then((div) => {
    const img = div.getElementsByTagName('img')[0];
    const username = div.getElementsByTagName('span')[0];

    img.src = 'https://i.imgur.com/b08hxPY.png';
    img.alt = new_username;
    username.innerHTML = new_username;
});

