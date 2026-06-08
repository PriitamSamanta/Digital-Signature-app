interface Props {
  text: string;
  x: number;
  y: number;
}

export default function SignatureOverlay({
  text,
  x,
  y,
}: Props) {
  
  return (
    <div
      className="
        absolute
        text-xl
        font-bold
        text-black
      "
      style={{
        left: `${x}px`,
        top: `${y}px`,
      }}
    >
      {text}
    </div>
  );
}