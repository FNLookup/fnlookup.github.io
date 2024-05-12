function loadAccounts() {
    let modal = document.getElementById('account-modal')
    if (localStorage.accountId === undefined) {
        modal.innerHTML = '<p>You haven\'t linked an account yet.</p><a class="no-link float-right fortnite-button fortnite-button-border" href="change">LINK ACCOUNT</a>'
    } else {
        modal.innerHTML = '<h2 class="header-text-bold header-text-italic">' + localStorage.accountName + '<a class="no-link float-right fortnite-button fortnite-button-border" href="change">SWITCH ACCOUNT</a></h2>'
    }
}