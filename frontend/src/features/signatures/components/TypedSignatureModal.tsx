"use client";

import { useState } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (signature: string) => void;
}

export default function TypedSignatureModal({
  isOpen,
  onClose,
  onSave,
}: Props) {
  const [signature, setSignature] =
    useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
        <h2 className="mb-2 text-xl font-semibold text-black">
          Add Signature
        </h2>

        <p className="mb-4 text-sm text-slate-500">
          Type your signature below.
        </p>

        <input
          value={signature}
          onChange={(e) =>
            setSignature(
              e.target.value
            )
          }
          placeholder="Type your signature"
          className="w-full rounded-lg border border-slate-300 p-3 text-black outline-none focus:border-blue-500"
        />

        {/* Preview */}
        {signature && (
          <div className="mt-4 rounded-lg border bg-slate-50 p-4">
            <p className="mb-2 text-xs text-slate-500">
              Signature Preview
            </p>

            <p
              className="text-2xl italic text-black"
              style={{
                fontFamily: "cursive",
              }}
            >
              {signature}
            </p>
          </div>
        )}

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-lg border px-4 py-2 text-black"
          >
            Cancel
          </button>

          <button
            onClick={() => {
              if (!signature.trim())
                return;

              onSave(signature);

              setSignature("");
            }}
            className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Use Signature
          </button>
        </div>
      </div>
    </div>
  );
}