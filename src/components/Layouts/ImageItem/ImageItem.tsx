import React from "react";
import { useRef, useState } from "react";
import "./ImageItem.scss";

export interface ImageItemProps {
  animated?: boolean;
  rowHeight?: string | number;
  children?: React.ReactNode;
}

export const ImageItem: React.FunctionComponent<ImageItemProps> = ({
  animated,
  rowHeight,
  children,
}) => {
  const [rotate, setRotate] = useState<{ rotateX: number; rotateY: number }>({
    rotateX: 0,
    rotateY: 0,
  });
  const [scale, setScale] = useState(1);
  const [exiting, setExiting] = useState(false);
  const itemRef = useRef<HTMLDivElement>();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (exiting) return;
    const cardWidth = itemRef.current.offsetWidth;
    const cardHeight = itemRef.current.offsetHeight;
    const rect = itemRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left - cardWidth / 2;
    const mouseY = e.clientY - rect.top - cardHeight / 2;
    const rotateX = parseFloat(((25 * mouseY) / (cardHeight / 2)).toFixed(2));
    const rotateY = parseFloat((-(25 * mouseX) / (cardWidth / 2)).toFixed(2));
    setRotate({ rotateX, rotateY });
    setScale(0.92);
  };

  const handleMouseLeave = () => {
    setExiting(true);
    setRotate({ rotateX: 0, rotateY: 0 });
    setScale(1);
    const timer = setTimeout(() => {
      setExiting(false);
      clearTimeout(timer);
    }, 300);
  };

  return (
    <div
      className="maze-imageitem"
      style={{
        height: rowHeight,
        transform: `perspective(1000px) rotateX(${rotate.rotateX}deg) rotateY(${rotate.rotateY}deg) scale(${scale})`,
      }}
      onMouseMove={animated ? handleMouseMove : null}
      onMouseLeave={animated ? handleMouseLeave : null}
      ref={itemRef}
    >
      {children}
    </div>
  );
};
