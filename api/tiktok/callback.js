export default async function handler(req, res) {
    const { code, error, error_description } = req.query;

    if (error) {
        return res.status(400).send(
            `TikTok authorization failed: ${error_description || error}`
        );
    }

    if (!code) {
        return res.status(400).send("Missing TikTok authorization code.");
    }

    const clientKey = process.env.TIKTOK_CLIENT_KEY;
    const clientSecret = process.env.TIKTOK_CLIENT_SECRET;

    const redirectUri =
        "https://i-felt-it-mth7.vercel.app/api/tiktok/callback";

    if (!clientKey || !clientSecret) {
        return res.status(500).send("TikTok credentials are not configured.");
    }

    try {
        const response = await fetch(
            "https://open.tiktokapis.com/v2/oauth/token/",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Cache-Control": "no-cache"
                },
                body: new URLSearchParams({
                    client_key: clientKey,
                    client_secret: clientSecret,
                    code: code,
                    grant_type: "authorization_code",
                    redirect_uri: redirectUri
                })
            }
        );

        const data = await response.json();

        if (!response.ok) {
            return res.status(response.status).json(data);
        }

        return res.status(200).json({
            message: "TikTok authorization successful.",
            data
        });

    } catch (error) {
        return res.status(500).send(
            "Server error: " + error.message
        );
    }
}
