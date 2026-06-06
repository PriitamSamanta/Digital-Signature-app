interface SignatureToolbarProps {
  onAddSignature: () => void;
}

export default function SignatureToolbar({
  onAddSignature,
}: SignatureToolbarProps) {
  return (
    <div className="mb-4">
      <button
        onClick={onAddSignature}
      >
        Add Signature
      </button>
    </div>
  );
}