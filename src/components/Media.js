import "../css/components/Media.css"
import React from "react"

function Media({url}) {
    const isYouTubeVideo = (url) => {
        const youtubePatterns = [
          /youtube\.com\/watch\?v=([\w-]+)/,
          /youtu\.be\/([\w-]+)/
        ];
        return youtubePatterns.some((pattern) => pattern.test(url));
    }

    const extractYouTubeVideoId = (url) => {
        const match =
          url.match(/youtube\.com\/watch\?v=([\w-]+)/) ||
          url.match(/youtu\.be\/([\w-]+)/);
        return match ? match[1] : null;
    }

    //Is a youtube video
    if (isYouTubeVideo(url)) {
        const videoId = extractYouTubeVideoId(url);
        const videoUrl = `https://www.youtube.com/embed/${videoId}`

        return (
            <div className="video-container">
                <iframe
                    src={videoUrl}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            </div>
        )
    //Is an image
    } else {
        return (
            <img className="media-image" src={url}></img> 
        )
    }

    
}

export default Media