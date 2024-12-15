import { useEffect, useState, useContext } from "react";
import { Message } from "@/types/message";
import { SocketContext, UserSessionContext } from "@/types/context"; 
import Image from "next/image";
import MessageActionsDropdown from "./MessageItem"; 
import { User } from "@/types/user";
import ImageModal from "./ImageModal";
import EmojiPicker from "./React-message"; 
import EmojiContainer from "./EmojiContainer";
import { XIcon } from "lucide-react";

interface ConversationMessageProps {
  sentDateTime: Date;
  fromUser: boolean;
  senderName?: string;
  senderImage: string | null;
  messages: Message[];
  isLastMessage: boolean;
  newEmoji?: string;
  message_id?: string;
}

const ConversationMessage = (props: ConversationMessageProps) => {
  const [activeMessageId, setActiveMessageId] = useState<string | null>(null);
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null); 
  const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null); 
  const [selectedImage, setSelectedImage] = useState<string | null>(null); // State cho hình ảnh đã chọn

  const context = useContext(SocketContext);
  const userSessionContext = useContext(UserSessionContext);

  const userSetting = userSessionContext?.userSetting;

  useEffect(() => {
    if (props.messages.length > 0 && props.isLastMessage) {
      const element = document.getElementById(props.messages.at(-1)!.id.toString());
      if (element !== null) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [props.messages.length, props.isLastMessage]);

  const handleMouseEnter = (messageId: string) => {
    if (hoverTimeout) clearTimeout(hoverTimeout); 
    setActiveMessageId(messageId); 
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setActiveMessageId(null); 
    }, 4000); 
    setHoverTimeout(timeout);
  };

  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl); // Lưu trữ hình ảnh đã chọn
  };

  return (
    <section
      className={`flex flex-row mb-[6px] ${props.fromUser ? "justify-end" : "justify-start"}`}
    >
      {!props.fromUser && (
        <div className="w-[40px] mr-[10px]">
          <Image
            src={props.senderImage === null ? "/assets/images/profile-pic.jpg" : props.senderImage}
            alt={`${props.senderName}'s profile picture`}
            width={50}
            height={50}
            className="w-[40px] h-[40px] rounded-full cursor-pointer"
          />
        </div>
      )}

      <div className="w-fit max-w-[70%] flex flex-col">
        <div className={`flex flex-row mb-[5px] ${props.fromUser ? "justify-end" : "justify-start"}`}>
          <p className="text-gray-5 text-[13px]">
            {props.senderName && !props.fromUser && (
              <span className="text-gray-4 text-[16px] mr-[0.5em] cursor-pointer">
                {props.senderName}
              </span>
            )}
            {props.sentDateTime.toLocaleString("vi-VN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
        {props.messages.map((message) => (
          <div
            key={message.id}
            id={message.id}
            className={`relative group mb-[4px] flex flex-col ${message.react_emojis.length > 0 ? "!mb-[21px]" : "mb-[4px]"}`}
            onMouseOver={() => handleMouseEnter(message.id)}
            onMouseOut={handleMouseLeave}
          >
            <div className="absolute bottom-[-10px] left-0">
              {activeMessageId === message.id && (
                <EmojiPicker
                  fromUser={props.fromUser}
                  messageId={message.id}
                  senderId={message.sender_id}
                  setSelectedEmoji={setSelectedEmoji}
                  messageText={message.message}
                />
              )}
            </div>

            <div
              className={`rounded-[8px] bg-gray-5 px-[12px] py-[8px] w-fit ${props.fromUser ? "self-end" : "self-start"} message-container`}
            >
              {message.image_urls && message.image_urls.map((image) => (
                <div key={image} className="relative">
                  <Image
                    src={image}
                    width={150}
                    height={150}
                    alt={`Image from ${props.senderName}`}
                    className="rounded-lg mb-[4px] cursor-pointer"
                    onClick={() => handleImageClick(image)} // Khi nhấp vào hình ảnh
                  />
                </div>
              ))}
              <p className="wrap text-dark-9">{!userSetting?.privacy_setting.use_bad_word_filter && message.message}</p>
              <p className="wrap text-dark-9">{(userSetting?.privacy_setting.use_bad_word_filter && !message.has_bad_words) && message.message}</p>
              <p className="wrap text-dark-9 italic">{(userSetting?.privacy_setting.use_bad_word_filter && message.has_bad_words) && "This message has been censored"}</p>
              {message.react_emojis.length > 0 && (
                <EmojiContainer reactEmojis={message.react_emojis} isSender={props.fromUser}/>
              )}
            </div>
          </div>
        ))}
      </div>

      {selectedImage && (
        <ImageModal
          dateTime={props.sentDateTime.toLocaleString("vi-VN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
          senderImage={props.senderImage}
          imageUrl={selectedImage}
          senderName={props.senderName}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </section>
  );
};

export default ConversationMessage;
