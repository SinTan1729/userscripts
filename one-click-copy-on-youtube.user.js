// ==UserScript==
// @name         One Click Copy on YouTube
// @version      1.0
// @description  Replaces the YouTube share button with a copy button that copies the shortlinks using a single click
// @author       SinTan
// @license      GPL-3.0-only
// @namespace    YouTube
// @icon         https://upload.wikimedia.org/wikipedia/commons/f/fd/YouTube_full-color_icon_%282024%29.svg
// @match        *://*.youtube.com/*
// @grant        GM.setClipboard
// ==/UserScript==

onUrlChange();

// Run the code on each navigation event
if (self.navigation) {
  navigation.addEventListener('navigatesuccess', onUrlChange);
} else {
  let u = location.href;
  new MutationObserver(() => u !== (u = location.href) && onUrlChange())
    .observe(document, {subtree: true, childList: true});
}

function onUrlChange() {
  if (!location.pathname.startsWith('/watch')) {
    // deactivate();
    return;
  }
  console.log('processing', location.href);
  // activate();
  var intv = setInterval(function() {
    // Wait for the svg element to appear
    const svgs = document.querySelectorAll('#actions button-view-model button[title="Share"] svg');
    if (svgs.length < 1) {
      return false;
    }
    // This is important during navigation, makes sure we wait for the new content
    const btn = document.querySelector('#actions button-view-model button[title="Share"]');
    if (btn.getElementsByClassName("yt-spec-button-shape-next__button-text-content")[0].innerHTML === 'Copy URL') {
      return false;
    }
    // Change the text
    clearInterval(intv);
    console.log('Replacing the share button with a copy button.');
    btn.getElementsByClassName("yt-spec-button-shape-next__button-text-content")[0].innerHTML = 'Copy URL';
    // Change the icon
    const svg = svgs[0];
    svg.innerHTML = '<path fill-rule="evenodd" d="M21 8a3 3 0 0 0-3-3h-8a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V8Zm-2 0a1 1 0 0 0-1-1h-8a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V8Z" clip-rule="evenodd"/>';
    svg.innerHTML += '<path d="M6 3h10a1 1 0 1 0 0-2H6a3 3 0 0 0-3 3v14a1 1 0 1 0 2 0V4a1 1 0 0 1 1-1Z"/>';
    // Change the click function
    const urlParams = new URLSearchParams(window.location.search);
    const videoID = urlParams.get('v');
    const url = 'https://youtu.be/' + videoID;
    btn.onclick = function() {
      GM.setClipboard(url, 'text/plain');
      console.log('Copied video url to clipboard!');
    };
  }, 100);
}

