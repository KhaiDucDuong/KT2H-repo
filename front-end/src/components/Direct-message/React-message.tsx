import React, { useState, useContext } from 'react';
import { SocketContext } from "@/types/context";

interface EmojiPickerProps {
    messageId: string;
    senderId: string;
    fromUser: boolean;
    messageText: string;
    setSelectedEmoji: React.Dispatch<React.SetStateAction<string | null>>;
}

const EmojiPicker = ({ messageId, senderId, setSelectedEmoji, fromUser, messageText }: EmojiPickerProps) => {
  const [showEmojis, setShowEmojis] = useState(false);
  const emojis = ['👍', '❤️', '😂', '😢', '😡'];
  const context = useContext(SocketContext);

  // Toggle the emoji picker
  const toggleEmojiPicker = () => {
    setShowEmojis(!showEmojis);
  };

  const handleEmojiSelect = (emoji: string, messageId: string, senderId: string) => {
    setSelectedEmoji(emoji); // Hiển thị emoji đã chọn cục bộ

    if (!context || !context?.stompClient) {
      console.log("Missing socket context or stomp client. Cannot send message.");
      return;
    }

    let emojiString = String(emoji);

    // Tạo đối tượng phản ứng emoji
    let reactEmojiDTO = {
      message_id: messageId,
      user_id: senderId, // Lấy account ID của người dùng
      emoji: getEmojiSymbol(emojiString),
    };

    // Gửi thông điệp qua WebSocket
    context.stompClient.publish({
      destination: "/app/react-message",
      body: JSON.stringify(reactEmojiDTO),
    });
  };

  function getEmojiSymbol(emojiKey : string) {
    switch (emojiKey) {
      case "👍":
        return "LIKE";
      case "❤️":
        return "LOVE";
      case "😂":
        return "HAHA";
      case "😲":
        return "WOW";
      case "😢":
        return "SAD";
      case "😡":
        return "ANGRY";
      default:
        return "";
    }
  }

  

  const emojiPickerPosition = messageText.length < 50
    ? fromUser ? "right-1" : "left-60"
    : fromUser ? "left-1" : "right-60";

  return (
    <div className="relative">
      {/* Button to trigger the emoji picker */}
      <button
        className={`absolute ${fromUser ? "right-1" : "left-60"} bottom-2 right-2 w-8 h-8 bg-gray-200 border-2 border-gray-400 text-sm cursor-pointer rounded-full flex justify-center items-center transition-colors duration-300 hover:bg-blue-200`}
        onClick={toggleEmojiPicker}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-4 h-4 text-gray-600">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      </button>

      {/* Emoji Picker */}
      {showEmojis && (
        <div className={`absolute ${emojiPickerPosition} bottom-10 right-2 w-max p-0 bg-gray-200 border border-gray-300 shadow-lg z-10 flex rounded-3xl flex-wrap mt-2 space-x-0`}>
          {emojis.map((emoji, index) => (
            <button
              key={index}
              className="emoji-btn text-xs p-0 m-0 border-none bg-transparent cursor-pointer transform transition-all hover:scale-125 hover:text-blue-500"
              onClick={() => handleEmojiSelect(emoji, messageId, senderId)} // Truyền giá trị messageId và senderId thực tế
            >
              {emoji}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default EmojiPicker;
