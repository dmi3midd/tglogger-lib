async function sendlog(token, chatId, text) {
    const url = `https://api.telegram.org/bot${token}/sendMessage`;
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                chat_id: chatId,
                text: text
            })
        });
        if (!response.ok) {
            throw new Error(`${response.status} - ${response.statusText} on ${response.url}`);
        }

        const json = await response.json();
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = {
    sendlog,
}