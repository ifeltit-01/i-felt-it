export default function handler(req, res) {
    const clientKey = process.env.TIKTOK_CLIENT_KEY;

    if (!clientKey) {
        return res.status(500).send("TikTok Client Key is not configured.");
    }

    const redirectUri =
        "https://i-felt-it-mth7.vercel.app/api/tiktok/callback";

    const authUrl =
        "https://www.tiktok.com/v2/auth/authorize/" +
        "?client_key=" + encodeURIComponent(clientKey) +
        "&scope=" + encodeURIComponent("user.info.basic,video.list") +
        "&response_type=code" +
        "&redirect_uri=" + encodeURIComponent(redirectUri) +
        "&state=ifeltit_test";

    return res.redirect(authUrl);
}
