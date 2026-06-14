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

  onIncreaseSize?: () => void;

  onDecreaseSize?: () => void;
  fontSize?: number;

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
  onIncreaseSize,
  onDecreaseSize,
  fontSize = 48,
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
          <div
            className="
              absolute
              -top-8
              right-0
              flex
              gap-1
            "
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                onIncreaseSize?.();
              }}
              className="
                h-6
                w-6
                rounded
                bg-green-500
                text-white
              "
            >
              +
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onDecreaseSize?.();
              }}
              className="
                h-6
                w-6
                rounded
                bg-yellow-500
                text-white
              "
            >
              -
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete?.();
              }}
              className="
                h-6
                w-6
                rounded
                bg-red-500
                text-white
              "
            >
              ×
            </button>
          </div>
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
            fontSize: `${fontSize}px`,
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