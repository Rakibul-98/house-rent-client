export default function Promotion() {
  return (
    <div className="h-[300px] lg:h-[500px] flex items-center overflow-clip mt-16">
      <div className="w-full h-[300px] lg:h-[900px]">
        <iframe
          className="w-full h-full"
          src="https://www.youtube.com/embed/jPkBJY1KI_Q?autoplay=1&mute=1&loop=1&controls=0&playlist=jPkBJY1KI_Q"
          title="YouTube video player"
          allow="autoplay; encrypted-media"
        ></iframe>
      </div>
    </div>
  );
}
