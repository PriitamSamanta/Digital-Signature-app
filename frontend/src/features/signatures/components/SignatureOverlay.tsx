"use client";

import { useRef } from "react";
import Draggable from "react-draggable";

interface Props {
  text: string;
  x: number;
  y: number;
  draggable?: boolean;
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
  onDragStop,
}: Props) {
  const nodeRef =
    useRef<HTMLDivElement>(null);

  const signature = (
    <div
      ref={nodeRef}
      className="
        rounded-md
        border-2
        border-blue-400
        bg-white
        px-3
        py-2
        text-xl
        font-bold
        italic
        shadow
        select-none
      "
    >
      {text}
    </div>
  );

  if (!draggable) {
    return (
      <div
        className="absolute"
        style={{
          left: x,
          top: y,
        }}
      >
        {signature}
      </div>
    );
  }

  return (
    <Draggable
      nodeRef={nodeRef}
      bounds="parent"
      defaultPosition={{
        x,
        y,
      }}
      onDrag={(_, data) => {
        onDragStop?.(
          data.x,
          data.y
        );
      }}
    >
      <div
        ref={nodeRef}
        className="
        absolute
        cursor-move
        rounded-md
        border-2
        border-blue-400
        bg-white
        px-3
        py-2
        text-xl
        font-bold
        italic
        shadow
        select-none
      "
      >
        {text}
      </div>
    </Draggable>
  );
}