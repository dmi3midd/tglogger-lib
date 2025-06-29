function getme(token) {
    fetch(`https://api.telegram.org/bot${token}/getMe`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    })
        .then(res => res.json())
        .then(data => {
            if (!data.ok) throw new Error(`Error with code ${data.error_code} - ${data.description}`)
        })
        .catch(err => {
            throw new Error(err.message);
        });
}

module.exports = {
    getme,
}