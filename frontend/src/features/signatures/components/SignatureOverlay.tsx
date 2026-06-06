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
        top-[200px]
        left-[200px]
        text-xl
        font-bold
      "
      style={{
        left: x,
        top: y,
      }}
    >
      {text}
    </div>
  );
}