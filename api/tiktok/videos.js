export default async function handler(req, res) {
    const accessToken = process.env.TIKTOK_ACCESS_TOKEN;

    if (!accessToken) {
        return res.status(500).json({
            error: "TikTok access token is not configured."
        });
    }

    try {
        const response = await fetch(
            "https://open.tiktokapis.com/v2/video/list/?fields=id,title,video_description,duration,cover_image_url,embed_link,like_count,comment_count,share_count,view_count,create_time",
            {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${accessToken}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    max_count: 20
                })
            }
        );

        const data = await response.json();

        if (!response.ok) {
            return res.status(response.status).json(data);
        }

        return res.status(200).json(data);

    } catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
}
