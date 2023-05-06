function declareFuncs() {
    document.getElementById('sac-accept-button').onclick = function() {
        let enterCode = document.getElementById('sac-input').value;

        fetch('https://fnlookup-api.vercel.app/api?endpoint=creator&code=' + enterCode).then(r => r.json()).then(r => {
            if (typeof(r.code) !== 'string') {
                document.getElementById('sac-player').classList.remove('hidden');
                document.getElementById('code-label').innerHTML = 'SAC Code ' + r.code.slug;
                document.getElementById('sac-user').innerHTML = r.code.displayName;
    
                if (r.code.verified) {
                    document.getElementById('sac-user').innerHTML += '<img src="assets/icons/verified.png" alt="verified" width="25" height="25" />';
                }
                document.getElementById('player-id').innerHTML = r.code.id;
            } else {
                document.getElementById('sac-player').classList.remove('hidden');
                document.getElementById('code-label').innerHTML = r.message;
                document.getElementById('sac-user').innerHTML = '';
            }
        }).catch(e => {
            console.error(e);
        })
    }
}