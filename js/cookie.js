if (!localStorage.privacyAccepted) {
        document.body.innerHTML += '<div class="cookie-container" id="cookie-container"><div class="cookie-dialog"><h3>ACCEPT PRIVACY</h3><div class="cookie-dialog-text"><p>You accept that Fortnite APIs may collect your country of residence for analytics.</p><button class="fn-ui-btn" onclick="acceptCookies()">I ACCEPT</button><a href="about.html"class="gray cookie-accept">What is this?</a></div></div></div>'
}

function acceptCookies() {
    localStorage.privacyAccepted = true;
    document.getElementById('cookie-container').remove();
}