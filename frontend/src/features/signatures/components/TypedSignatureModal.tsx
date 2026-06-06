"use client";

import { useState } from "react";

interface Props {
  onSave: (
    signature: string
  ) => void;
}

export default function TypedSignatureModal({
  onSave,
}: Props) {
  const [signature, setSignature] =
    useState("");

  return (
    <div>
      <input
        value={signature}
        onChange={(e) =>
          setSignature(
            e.target.value
          )
        }
        placeholder="Type Signature"
      />

      <button
        onClick={() =>
          onSave(signature)
        }
      >
        Save
      </button>
    </div>
  );
}