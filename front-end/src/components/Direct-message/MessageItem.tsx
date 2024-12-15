import React from "react";

interface MessageItemProps {
  messageId: string;
  fromUser: boolean;
  onActionSelect: (option: string, messageId: string) => void;
}

const MessageActionsDropdown: React.FC<MessageItemProps> = ({
  messageId,
  fromUser,
  onActionSelect,
}) => {
  return (
    <div className="relative group">
      <button className="text-gray-500 hover:text-gray-700">&#8230;</button>
      <div
        className={`hidden group-hover:block absolute z-10 bg-white border border-gray-300 rounded-md shadow-lg ${
          fromUser ? "left-[-100%]" : "right-[-100%]"
        }`}
      >
        <ul className="py-2">
          <li
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            onClick={() => onActionSelect("Trả lời", messageId)}
          >
            Trả lời
          </li>
          <li
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            onClick={() => onActionSelect("Thu hồi", messageId)}
          >
            Thu hồi
          </li>
          <li
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            onClick={() => onActionSelect("Xóa", messageId)}
          >
            Xóa
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MessageActionsDropdown;
