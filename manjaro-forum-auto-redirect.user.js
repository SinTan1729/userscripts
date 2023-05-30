// ==UserScript==
// @name        Manjaro Forum auto-redirect to old site for missing pages
// @namespace   Manjaro Linux Forum
// @match       https://forum.manjaro.org/t/*
// @grant       none
// @version     1.1
// @author      SinTan
// @description 9/4/2020, 1:36:13 PM
// ==/UserScript==
not_found = document.getElementsByClassName("page-not-found")
if (not_found) {
    error_msg = not_found[0].getElementsByClassName("title")[0].innerHTML
    if (error_msg == "Oops! That page doesn’t exist or is private.") {
        redir_notif = document.createElement("h3")
        redir_notif.innerHTML = "(Redirecting to old forum...)"
        not_found[0].appendChild(redir_notif)
        window.location.href = window.location.href.replace("://forum.", "://archived.forum.")
    }
}