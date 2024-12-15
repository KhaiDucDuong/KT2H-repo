import { useContext, useEffect, useState } from "react";
import { ScrollArea } from "../ui/scroll-area";
import ConversationMessage from "../Direct-message/ConversationMessage";
import MessageBox from "./MessageBox";
import { UserStatus } from "@/types/user";
import { Contact } from "@/types/contact";
import { ConversationMessageResponse } from "@/types/response";
import EmojiContainer from "../Direct-message/EmojiContainer";
import {
  getMessagesFromResponse,
  groupMessagesFromSameSender,
  Message,
  Reaction,
  MessageGroup,
} from "@/types/message";
import { UserSessionContext } from "@/types/context";
import { MessagesSquare } from "lucide-react";
import ConversationLoader from "./ConversationLoader";

interface ConversationProps {
  contact: Contact;
  newConversationMessage: Message | null;
  updateConversationMessage: Reaction | null;
  setNewConversationMessage: (message: Message | null) => void;
  setUpdatedMessage: (message: Reaction | null) => void;
}

const Conversation = (props: ConversationProps) => {
  const { contact } = props;
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageGroups, setMessageGroups] = useState<MessageGroup[]>([]);
  const [messagePage, setMessagePage] = useState<number>(1);
  const [hasMoreMessages, setHasMoreMessages] = useState<boolean>(true);
  const [newEmoji, setNewEmoji] = useState<string>();
  const [message_id, setMessageID] = useState<string>();
  const userSessionContext = useContext(UserSessionContext);
  const [isFetching, setIsFetching] = useState(false);
  const currentUser = userSessionContext?.currentUser;

  useEffect(() => {
    let ignore = false;
    fetchMessages(ignore, 1, contact.id);

    return () => {
      ignore = true;
      setMessages([]);
      setMessageGroups([]);
      setMessagePage(1);
      setHasMoreMessages(true);
    };
  }, [contact.id]);

  useEffect(() => {
    if (props.newConversationMessage !== null) {
      // Xử lý khi có tin nhắn mới
      setMessages((prev) => [...prev, props.newConversationMessage!]);
      if (messageGroups.length === 0) {
        setMessageGroups(groupMessagesFromSameSender([props.newConversationMessage!]));
      } else {
        const currentMessageGroup = [...messageGroups]; // Copy mảng để tránh tham chiếu
        const lastMessageGroup = currentMessageGroup.at(-1);
        if (
          lastMessageGroup?.sender_id === props.newConversationMessage.sender_id &&
          lastMessageGroup?.sentDateTime.getTime() + 1000 * 60 * 5 >
            props.newConversationMessage.sent_at
        ) {
          lastMessageGroup.messages.push(props.newConversationMessage!);
          currentMessageGroup[currentMessageGroup.length - 1] = lastMessageGroup;
          setMessageGroups(currentMessageGroup);
        } else {
          setMessageGroups((prev) => [
            ...prev,
            ...groupMessagesFromSameSender([props.newConversationMessage!]),
          ]);
        }
      }
      props.setNewConversationMessage(null);
    } if (props.updateConversationMessage != null) {
      const { id, emoji, message_id, user_id } = props.updateConversationMessage;
    
      // Cập nhật emoji mới
      if (emoji) {
        setNewEmoji(emoji);
        setMessageID(message_id);
         // Chỉ lưu emoji mới
      }
    
      // Cập nhật tin nhắn trong danh sách
      setMessageGroups((prevGroups) =>
        prevGroups.map((group) => {
          if (group.messages.some((msg) => msg.id === message_id)) {
            return {
              ...group,
              messages: group.messages.map((msg) =>
                msg.id === message_id
                  ? {
                      ...msg,
                      react_emojis: [
                        ...(msg.react_emojis || []), // Đảm bảo `react_emojis` luôn là một mảng
                        { id, emoji, message_id, user_id }, // Thêm emoji mới
                      ],
                    }
                  : msg
              ),
            };
          }
          return group;
        })
      );
        
      // Cập nhật tin nhắn trong các nhóm
    
      // Đặt lại giá trị cập nhật tin nhắn
      props.setUpdatedMessage(null);
    }
  }, [props.updateConversationMessage, props.newConversationMessage]);
  
  if (!currentUser) return <div>User session data is undefined</div>;

  async function fetchMessages(
    ignore: boolean,
    messagePage: number,
    contactId: string
  ) {
    setIsFetching(true)
    const res = await fetch(
      `/dashboard/api/message?conversationId=${contactId}&page=${messagePage}`,
      {
        method: "GET",
      }
    );
    const body = (await res.json()) as ConversationMessageResponse;
    if (!res.ok) {
      console.log("Failed to fetch messages");
    } else {
      if (ignore) return;
      console.log("Messages data: ", body);
      const fetchedMessages = getMessagesFromResponse(body);
      if (fetchedMessages === null) return;
      setMessages(fetchedMessages);
      setMessageGroups(groupMessagesFromSameSender(fetchedMessages));
      setMessagePage(body.data.meta.page + 1);
      setHasMoreMessages(body.data.meta.page < body.data.meta.pages);
      setIsFetching(false)
    }
  }

  const extractReactions = (messages: Message[], messageId: string): Reaction[] => {
    const emojis: Reaction[] = [];
    // Lọc các tin nhắn có id khớp với messageId
    const message = messages.find((msg) => msg.id === messageId);
    
    // Nếu tìm thấy tin nhắn, lấy các react_emojis từ tin nhắn đó
    if (message && message.react_emojis) {
      message.react_emojis.forEach((reaction) => {
        emojis.push({
          id: reaction.id || '',
          user_id: reaction.user_id || '',
          message_id: reaction.message_id || '',
          emoji: reaction.emoji,
        });
      });
    }
    return emojis;
  };

  return (
    <section className="size-full flex flex-col relative">
      {/* {contact.id}
      {" Message length: " + messages.length} */}
      <ScrollArea className="size-full p-[12px]">
        {messageGroups.map((messageGroup, i, { length }) => {
          //last element
          if (i === length - 1) {
            return (
              <div key={messageGroup.messages.at(0)?.id}>
                <ConversationMessage
                  sentDateTime={new Date(messageGroup.sentDateTime)}
                  fromUser={messageGroup.sender_id === contact.requester_id}
                  messages={messageGroup.messages}
                  senderName={
                    messageGroup.sender_id === currentUser.user_id
                      ? contact.requester_nickname
                        ? contact.requester_nickname
                        : `${currentUser.last_name} ${currentUser.first_name}`
                      : contact.to_user_nickname
                      ? contact.to_user_nickname
                      : `${contact.to_user_last_name} ${contact.to_user_first_name}`
                  }
                  senderImage={
                    messageGroup.sender_id === currentUser.user_id
                      ? currentUser.image
                      : contact.to_user_image
                  }
                  isLastMessage={true}
                />
              </div>
            );
          } else {
            return (
              <div key={messageGroup.messages.at(0)?.id}>
                <ConversationMessage
                  sentDateTime={messageGroup.sentDateTime}
                  fromUser={messageGroup.sender_id === currentUser.user_id}
                  messages={messageGroup.messages}
                  senderName={
                    messageGroup.sender_id === currentUser.user_id
                      ? contact.requester_nickname
                        ? contact.requester_nickname
                        : `${currentUser.last_name} ${currentUser.first_name}`
                      : contact.to_user_nickname
                      ? contact.to_user_nickname
                      : `${contact.to_user_last_name} ${contact.to_user_first_name}`
                  }
                  senderImage={
                    messageGroup.sender_id === currentUser.user_id
                      ? currentUser.image
                      : contact.to_user_image
                  }
                  isLastMessage={false}

                />
              </div>
            );
          }
        })}
        {(isFetching && messagePage > 1) && <div className="size-full m-auto my-[20px]"><ConversationLoader /></div>}
      </ScrollArea>
      {(isFetching && messagePage === 1) && <div className="w-full absolute top-[37%]"><ConversationLoader /></div>}
      <MessageBox currentUser={currentUser} contactId={contact.id} />
    </section>
  );
};

export default Conversation;
