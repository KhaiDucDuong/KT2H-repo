import { useState } from "react";
import Image from "next/image";
import {
  XIcon,
  DownloadIcon,
  ZoomInIcon,
  ZoomOutIcon,
  RotateCwIcon,
} from "lucide-react";

interface ImageModalProps {
  imageUrl: string;
  senderName?: string;
  dateTime: string;
  senderImage: string | null;
  onClose: () => void;
}

const ImageModal = ({ imageUrl, senderName, senderImage, dateTime, onClose }: ImageModalProps) => {
  const [rotation, setRotation] = useState(0); // Góc xoay
  const [scale, setScale] = useState(1); // Tỷ lệ phóng to/thu nhỏ

  const handleDownloadImage = () => {
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = "downloaded-image.jpg";
    link.click();
  };

  const handleRotateImage = () => {
    setRotation((prevRotation) => prevRotation + 90);
  };

  const handleZoomIn = () => {
    setScale((prevScale) => prevScale + 0.1);
  };

  const handleZoomOut = () => {
    setScale((prevScale) => Math.max(0.1, prevScale - 0.1));
  };

  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    if (event.deltaY > 0) {
      // Scroll xuống -> thu nhỏ
      handleZoomOut();
    } else {
      // Scroll lên -> phóng to
      handleZoomIn();
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex justify-center items-center z-50">
      {/* Thanh trên cùng */}
      <div className="absolute top-0 left-0 w-full flex justify-between items-center p-2 bg-gray-800 text-white">
        <div className="flex-grow text-center text-lg font-bold">{senderName}</div>
        <button
          onClick={onClose}
          className="p-2 rounded-full bg-red-500 hover:bg-red-600"
        >
          <XIcon size={20} />
        </button>
      </div>

      {/* Hình ảnh */}
      <div
        className="relative p-4"
        style={{
          transform: `rotate(${rotation}deg) scale(${scale})`,
          transition: "transform 0.3s",
          maxHeight: '90vh', 
          maxWidth: '90vw',
          overflow: 'hidden',
        }}
        onWheel={handleWheel}
      >
        <Image
          src={imageUrl}
          alt="Enlarged Image"
          width={500}
          height={500}
          className="rounded-lg"
        />
      </div>

      {/* Thanh dưới cùng */}
      <div className="absolute bottom-0 left-0 w-full flex justify-between items-center p-3 bg-gray-800 text-white">
      <div className="flex mb-1">
          {senderImage && (
            <div className="w-9 h-9 mr-2">
              <Image
                src={senderImage}
                alt={`${senderName}'s profile picture`}
                width={40}
                height={40}
                className="rounded-full"
              />
            </div>
          )}
          <span className="font-bold">{senderName}</span>
          <span className="text-xs text-gray-400 mt-6">{dateTime}</span>
        </div>
        
        
        <div className="flex gap-4 mt-2">
          {/* Nút tải xuống */}
          <button
            onClick={handleDownloadImage}
            className="p-2 rounded-full bg-gray-600 hover:bg-blue-800"
          >
            <DownloadIcon size={20} />
          </button>

          {/* Nút phóng to */}
          <button
            onClick={handleZoomIn}
            className="p-2 rounded-full bg-gray-600 hover:bg-gray-800"
          >
            <ZoomInIcon size={20} />
          </button>

          {/* Nút thu nhỏ */}
          <button
            onClick={handleZoomOut}
            className="p-2 rounded-full bg-gray-600 hover:bg-gray-800"
          >
            <ZoomOutIcon size={20} />
          </button>

          {/* Nút xoay ảnh */}
          <button
            onClick={handleRotateImage}
            className="p-2 rounded-full bg-gray-600 hover:bg-gray-800"
          >
            <RotateCwIcon size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
