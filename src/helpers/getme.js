async function getme(token) {
    const url = `https://api.telegram.org/bot${token}/getMe`;
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        });
        if (!response.ok) {;
            throw new Error(`${response.status} - ${response.statusText} on ${response.url}`);
        }
        const json = await response.json();
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = {
    getme,
}