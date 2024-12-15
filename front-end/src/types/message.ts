import { z } from "zod";
import { ConversationMessageResponse, ReactionResponse } from "./response";

// Enum for message types
export enum MessageType {
    TEXT = "TEXT",
    RECORDING = "RECORDING",
    IMAGE = "IMAGE",
    IMAGE_AND_TEXT = "IMAGE_AND_TEXT" // Added IMAGE type
}

export interface Reaction {
    id: string;
    emoji: string;
    user_id: string;
    message_id: string;
}

// Interface representing a single message
export interface Message {
    id: string;
    message: string;
    sender_id: string;
    message_type: MessageType;
    is_reacted: boolean;
    sent_at: number;
    image_urls: string[] | null;
    react_emojis: Reaction[]; // Optional image URL field
    has_bad_words: boolean;
}

// Interface representing a group of messages from the same sender
export interface MessageGroup {
    sender_id: string;
    messages: Message[];
    sentDateTime: Date;
}
export const reactionSchema = z.object({
    id: z.string().uuid(),
    emoji: z.string(), // Biểu tượng cảm xúc
    user_id: z.string().uuid(),
    message_id: z.string().uuid(),
});

export const reactionSchemas = z.object({
    id: z.string().uuid(),
    emoji: z.string(), // Biểu tượng cảm xúc
    user_id: z.string().uuid(),
    message_id: z.string().uuid(),
});

// Zod schema for validating messages
export const messageSchema: z.ZodType<Message> = z.object({
    id: z.string().uuid(),
    sender_id: z.string().uuid(),
    message_type: z.nativeEnum(MessageType),
    is_reacted: z.boolean(),
    sent_at: z.number(),
    message: z.string().min(0), // Ensures message has at least 1 character
    image_urls: z.string().array().nullable(),
    react_emojis: reactionSchema.array(), // Optional image URL validation
    has_bad_words: z.boolean(),
}).refine((data) => {
    if (data.message_type === MessageType.TEXT) {
        return data.message.length >= 1; // Text messages must have content
    } else if (data.message_type === MessageType.IMAGE) {
        return data.image_urls !== null; // Ensure image URL exists for image messages
    } else if (data.message_type === MessageType.IMAGE_AND_TEXT) {
        return data.message.length >= 1 && data.image_urls !== null; // Must have both text and image URL for IMAGE_AND_TEXT
    } 
    return true; // Other message types are valid by default
}, {
    message: "Message must contain content for TEXT type or provide an image URL for IMAGE type",
    path: ["message"],
});

// Function to transform response data into an array of messages
export function getMessagesFromResponse(
    response: ConversationMessageResponse
): Message[] | null {
    const messageList: Message[] = [];
    for (const messageResponse of response.data.result) {
        const message: Message = {
            id: messageResponse.id,
            message: messageResponse.message ,
            sender_id: messageResponse.sender_id,
            message_type: messageResponse.message_type,
            is_reacted: messageResponse.is_reacted,
            sent_at: messageResponse.sent_at,
            image_urls: messageResponse.image_urls,
            has_bad_words: messageResponse.has_bad_words,
            react_emojis: messageResponse.react_emojis.map((emoji: any) => ({
                id: emoji.id,
                emoji: emoji.emoji,
                user_id: emoji.user_id,
                message_id: emoji.message_id,
            })), // Ensure to include the image URL if present
        };

        try {
            messageSchema.parse(message); // Validate message
            messageList.push(message);
        } catch (e) {
            console.log("Validation failed:", e);
            return null; // Return null if validation fails
        }
    }
    return messageList;
}
export function getReactionFromResponse(
    response: ReactionResponse
): Reaction[] | null {
    const reactionList: Reaction[] = [];
    for (const reactionResponse of response.result) {
        const reaction: Reaction = {
            id: reactionResponse.id,
            emoji: reactionResponse.emoji ,
            user_id: reactionResponse.user_id,
            message_id: reactionResponse.message_id, // Ensure to include the image URL if present
        };

        try {
            reactionSchemas.parse(reaction); // Validate message
            reactionList.push(reaction);
        } catch (e) {
            console.log("Validation failed:", e);
            return null; // Return null if validation fails
        }
    }
    return reactionList;
}

// Function to group messages from the same sender
export function groupMessagesFromSameSender(messages: Message[]): MessageGroup[] {
    const groupedMessages: MessageGroup[] = [];
    for (const message of messages.reverse()) { // Replace toReversed with reverse
        if (
            groupedMessages.length === 0 ||
            groupedMessages[groupedMessages.length - 1].sender_id !== message.sender_id ||
            groupedMessages[groupedMessages.length - 1].sentDateTime.getTime() + 1000 * 60 * 5 < message.sent_at * 1000
        ) {
            groupedMessages.push({
                sender_id: message.sender_id,
                messages: [message],
                sentDateTime: new Date(message.sent_at * 1000),
            });
        } else {
            groupedMessages[groupedMessages.length - 1].messages.push(message);
        }
    }
    return groupedMessages;
}
