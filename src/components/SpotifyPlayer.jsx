import { memo } from "react";

const SpotifyPlayer = memo(() => {
  return (
    <div className="mx-auto w-full max-w-md my-8 shadow-2xl border border-[var(--gold)]/20 rounded-xl overflow-hidden">
      <iframe
        style={{ borderRadius: "12px" }}
        src="https://open.spotify.com/embed/playlist/0XTTaP9EWyL68k7EiOJf3n?utm_source=generator"
        width="100%"
        height="152"
        frameBorder="0"
        allowFullScreen=""
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        title="Nossa Playlist"
      ></iframe>
    </div>
  );
});

export default SpotifyPlayer;
