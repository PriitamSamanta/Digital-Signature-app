"use client";

import { useRef } from "react";
import Draggable from "react-draggable";
import { useEffect } from "react";

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

  if (!draggable) {
    return (
      <div
        className="
          absolute
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
        style={{
          left: x,
          top: y,
        }}
      >
        {text}
      </div>
    );
  }

  useEffect(() => {
    console.log(
      "SignatureOverlay Mounted"
    );

    return () => {
      console.log(
        "SignatureOverlay Unmounted"
      );
    };
  }, []);

  return (
    <Draggable
      nodeRef={nodeRef}
      bounds="parent"
      position={{
        x,
        y,
      }}
      onStart={() => {
        console.log("DRAG START");
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