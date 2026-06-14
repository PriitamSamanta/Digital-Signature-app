"use client";

import { useRef } from "react";
import Draggable from "react-draggable";
import { useEffect } from "react";

interface Props {
  text: string;
  x: number;
  y: number;

  draggable?: boolean;

  selected?: boolean;

  onSelect?: () => void;
  onDelete?: () => void;

  onDragStop?: (
    x: number,
    y: number
  ) => void;
}

export default function SignatureOverlay({
  text,
  x,
  y,
  draggable = false,
  selected = false,
  onSelect,
  onDelete,
  onDragStop,
}: Props) {

  const nodeRef =
    useRef<HTMLDivElement>(null);

  if (!draggable) {
    return (
      <div
        onClick={onSelect}
        className="absolute"
        style={{
          left: x,
          top: y,
        }}
      >
        {selected && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete?.();
            }}
            className="
            absolute
            -right-3
            -top-3
            flex
            h-6
            w-6
            items-center
            justify-center
            rounded-full
            bg-red-500
            text-white
            shadow
          "
          >
            ×
          </button>
        )}

        <div
          className={`
          cursor-pointer
          select-none
          text-3xl
          italic
          text-black
          ${selected
              ? "border-2 border-blue-500 rounded-md p-2"
              : ""
            }
        `}
          style={{
            fontFamily: "cursive",
          }}
        >
          {text}
        </div>
      </div>
    );
  }



  return (
    <Draggable
      nodeRef={nodeRef}
      bounds="parent"
      position={{
        x,
        y,
      }}

      onStop={(_, data) => {
        onDragStop?.(
          data.x,
          data.y
        );
      }}
    >
      <div
        id="draft-signature"
        ref={nodeRef}
        className="
          absolute
          cursor-move
          select-none
          text-3xl
          italic
          text-black
        "
        style={{
          fontFamily: "cursive",
        }}
      >
        {text}
      </div>
    </Draggable>
  );
}