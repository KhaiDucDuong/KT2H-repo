import React, { useEffect, useState } from "react";
import {
  getMessagesFromResponse,
  groupMessagesFromSameSender,
  Message,
  Reaction,
  MessageGroup,
} from "@/types/message";
interface Emoji {
  emoji: string;
}

interface UniqueEmoji {
  emoji: string;
  count: number;
  symbol: string;
}

interface EmojiContainerProps{
  reactEmojis: Array<Emoji>;
  newEmoji?: string;
  isSender: boolean;

}
  const emojiMap: Record<string, string> = {
    LIKE: "👍",
    LOVE: "❤️",
    HAHA: "😂",
    WOW: "😲",
    SAD: "😢",
    ANGRY: "😡",
  };
  
  function getEmojiSymbol(emojiKey: string) {
    return emojiMap[emojiKey] || "";
  }
  
  function groupEmojis(emojis: Emoji[]): UniqueEmoji[] {
    const emojiCount: Record<string, number> = {};
    emojis.forEach(({ emoji }) => {
      emojiCount[emoji] = (emojiCount[emoji] || 0) + 1;
    });
    return Object.keys(emojiCount)
      .map((emojiKey) => ({
        emoji: emojiKey,
        count: emojiCount[emojiKey],
        symbol: getEmojiSymbol(emojiKey),
      }))
      .sort((a, b) => b.count - a.count); // Sắp xếp giảm dần theo số lượng
  }
  
  const EmojiContainer: React.FC<EmojiContainerProps> = ({ reactEmojis = [], newEmoji = "", isSender}) => {
    const [uniqueEmojis, setUniqueEmojis] = useState<UniqueEmoji[]>([]);
    const [topEmojis, setTopEmojis] = useState<UniqueEmoji[]>([]);
    const [latestEmoji, setLatestEmoji] = useState<UniqueEmoji | null>(null);
  
    useEffect(() => {
      const emojisToProcess = newEmoji
        ? [...reactEmojis, { emoji: newEmoji }]
        : reactEmojis;
  
      const groupedEmojis = groupEmojis(emojisToProcess);
      setUniqueEmojis(groupedEmojis);
  
      // Lấy 3 reaction nhiều nhất
      setTopEmojis(groupedEmojis.slice(0, 3));
  
      // Lấy reaction mới nhất
      if (newEmoji) {
        const latest = groupedEmojis.find((e) => e.emoji === newEmoji);
        if (latest) setLatestEmoji(latest);
      } else {
        setLatestEmoji(null);
      }
    }, [reactEmojis, newEmoji]);
  
    return (
      <div className={`absolute ${isSender ? "right-1" : "left-1"} w-max h-[26px] flex space-x-4 bg-gray-300 p-[4px] rounded-3xl border border-gray-500 z-10`}>
        {/* Ô đầu tiên: Các emoji phổ biến với tổng số lượng */}
        <div className="flex items-center space-x-1">
          {topEmojis.slice(0, 3).map((emoji, index) => (  // Chọn 3 loại reaction phổ biến nhất
            <div key={index} className="flex items-center text-[20px] space-x-1">
              <span className="text-xs">{emoji.symbol}</span>
            </div>
          ))}
          <span className="text-[12px] text-gray-500 ml-2">
            {uniqueEmojis.reduce((total, e) => total + e.count, 0)}
          </span>
        </div>

        {/* Ô thứ hai: Reaction mới vừa được chọn */}
        <div className="flex items-center space-x-1">
          <span className="text-[12px]">{newEmoji && getEmojiSymbol(newEmoji)}</span>
        </div>
      </div>

    );
  };


export default EmojiContainer;
