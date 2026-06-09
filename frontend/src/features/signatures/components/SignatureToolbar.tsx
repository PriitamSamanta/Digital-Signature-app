interface SignatureToolbarProps {
  onAddSignature: () => void;
}

export default function SignatureToolbar({
  onAddSignature,
}: SignatureToolbarProps) {
  return (
    <div className="flex items-center gap-3">
      <button
        onClick={onAddSignature}
        className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700"
      >
        Add Signature
      </button>

      <span className="text-sm text-slate-500">
        Create and place a signature on the document
      </span>
    </div>
  );
}