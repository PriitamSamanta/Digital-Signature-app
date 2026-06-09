"use client";

import { useRef } from "react";
import SignatureCanvas from "react-signature-canvas";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (signatureData: string) => void;
}

export default function DrawSignatureModal({
  isOpen,
  onClose,
  onSave,
}: Props) {
  const sigCanvas =
    useRef<SignatureCanvas>(null);

  if (!isOpen) return null;

  const handleSave = () => {
    const signature =
      sigCanvas.current
        ?.toDataURL("image/png");

    if (!signature) return;

    onSave(signature);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-2xl rounded-xl bg-white p-6 shadow-xl">
        <h2 className="mb-4 text-xl font-semibold">
          Draw Signature
        </h2>

        <div className="overflow-hidden rounded-lg border">
          <SignatureCanvas
            ref={sigCanvas}
            canvasProps={{
              width: 700,
              height: 250,
              className: "w-full",
            }}
          />
        </div>

        <div className="mt-4 flex justify-between">
          <button
            onClick={() =>
              sigCanvas.current?.clear()
            }
            className="rounded-lg border px-4 py-2"
          >
            Clear
          </button>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="rounded-lg border px-4 py-2"
            >
              Cancel
            </button>

            <button
              onClick={handleSave}
              className="rounded-lg bg-blue-600 px-4 py-2 text-white"
            >
              Use Signature
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}