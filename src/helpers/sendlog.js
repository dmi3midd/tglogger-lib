function sendlog(token, chatId, text) {
    fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            chat_id: chatId,
            text: text
        })
    })
        .then(res => res.json())
        .then(data => {
            if (!data.ok) throw new Error(`Error with code ${data.error_code} - ${data.description}`);
        })
        .catch(err => {
            throw new Error(err.message);
        });
}

module.exports = {
    sendlog,
}