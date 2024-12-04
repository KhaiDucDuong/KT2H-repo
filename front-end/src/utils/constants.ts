// do not store sensitive here such as api paths or keys, put those in .env files
export const contacts = [
  {
    id: 1,
    image: "/assets/images/tien.jpg",
    username: "Tiến Gié",
    noMissedMessages: 0,
    isLastMessageFromUser: false,
    lastMessage: "Hé lô my friend",
    lastSent: new Date(2024, 7 - 1, 20, 13, 50),
  },
  {
    id: 2,
    image: "/assets/images/hoang.jpg",
    username: "Hoàng",
    noMissedMessages: 4,
    isLastMessageFromUser: false,
    lastMessage: "Loorem isum bla bla bla bla bla bla",
    lastSent: new Date(2024, 7 - 1, 15, 19, 34),
  },
  {
    id: 3,
    image: "/assets/images/huy.jpg",
    username: "Huy Ngô",
    noMissedMessages: 0,
    isLastMessageFromUser: true,
    lastMessage: "Where",
    lastSent: new Date(2024, 7 - 1, 18, 9, 22),
  },
  {
    id: 4,
    image: "/assets/images/profile-pic.jpg",
    username: "Stranger 3",
    noMissedMessages: 11,
    lastMessage: "Lorem lorem lorem loreem lorem lorem",
    lastSent: new Date(),
  },
  {
    id: 5,
    image: "/assets/images/profile-pic.jpg",
    noMissedMessages: 0,
    username: "Stranger 4",
  },
  {
    id: 6,
    image: "/assets/images/profile-pic.jpg",
    username: "Stranger 5",
    noMissedMessages: 104,
    isLastMessageFromUser: false,
    lastMessage: "Lorem lorem lorem loreem lorem lorem",
    lastSent: new Date(2024, 7 - 1, new Date().getDate() - 1),
  },
  {
    id: 7,
    image: "/assets/images/profile-pic.jpg",
    username: "Stranger 6",
    noMissedMessages: 69,
    isLastMessageFromUser: false,
    lastMessage: "Lorem lorem lorem loreem lorem lorem",
    lastSent: new Date(),
  },
  {
    id: 8,
    image: "/assets/images/profile-pic.jpg",
    username: "Stranger 8",
    noMissedMessages: 104,
    isLastMessageFromUser: false,
    lastMessage: "Lorem lorem lorem loreem lorem lorem",
    lastSent: new Date(2023, 7 - 1, new Date().getDate() - 1),
  },
  {
    id: 9,
    image: "/assets/images/profile-pic.jpg",
    username: "Stranger 8",
    noMissedMessages: 104,
    isLastMessageFromUser: false,
    lastMessage: "Lorem lorem lorem loreem lorem lorem",
    lastSent: new Date(2024, 6 - 1, new Date().getDate() - 1),
  },
  {
    id: 10,
    image: "/assets/images/profile-pic.jpg",
    username: "Stranger 8",
    noMissedMessages: 104,
    isLastMessageFromUser: false,
    lastMessage: "Lorem lorem lorem loreem lorem lorem",
    lastSent: new Date(2024, 6 - 1, new Date().getDate() - 1),
  },
  {
    id: 11,
    image: "/assets/images/profile-pic.jpg",
    username: "Stranger 8",
    noMissedMessages: 104,
    isLastMessageFromUser: false,
    lastMessage: "Lorem lorem lorem loreem lorem lorem",
    lastSent: new Date(2024, 6 - 1, new Date().getDate() - 1),
  },
  {
    id: 12,
    image: "/assets/images/profile-pic.jpg",
    username: "Stranger 8",
    noMissedMessages: 104,
    isLastMessageFromUser: false,
    lastMessage: "Lorem lorem lorem loreem lorem lorem",
    lastSent: new Date(2024, 6 - 1, new Date().getDate() - 1),
  },
  {
    id: 13,
    image: "/assets/images/profile-pic.jpg",
    username: "Stranger 8",
    noMissedMessages: 104,
    isLastMessageFromUser: false,
    lastMessage: "Lorem lorem lorem loreem lorem lorem",
    lastSent: new Date(2024, 6 - 1, new Date().getDate() - 1),
  },
  {
    id: 14,
    image: "/assets/images/profile-pic.jpg",
    username: "Stranger 8",
    noMissedMessages: 104,
    isLastMessageFromUser: false,
    lastMessage: "Lorem lorem lorem loreem lorem lorem",
    lastSent: new Date(2024, 6 - 1, new Date().getDate() - 1),
  },
  {
    id: 15,
    image: "/assets/images/profile-pic.jpg",
    username: "Stranger 8",
    noMissedMessages: 104,
    isLastMessageFromUser: false,
    lastMessage: "Lorem lorem lorem loreem lorem lorem",
    lastSent: new Date(2024, 6 - 1, new Date().getDate() - 1),
  },
  {
    id: 16,
    image: "/assets/images/profile-pic.jpg",
    username: "Stranger 8",
    noMissedMessages: 104,
    isLastMessageFromUser: false,
    lastMessage: "Lorem lorem lorem loreem lorem lorem",
    lastSent: new Date(2024, 6 - 1, new Date().getDate() - 1),
  },
];

export const conversationMessages = {
  toUserId: 1,
  toUserName: "Tiến Gié",
  toUserImage: "/assets/images/profile-pic.jpg",
  messageHistory: [
    {
      id: 1,
      sentDateTime: new Date(2024, 7 - 1, 20, 12, 50),
      messages: [
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do",
        "Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do",
        "Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet",
      ],
      isSelfMessage: false,
    },
    {
      id: 2,
      sentDateTime: new Date(2024, 7 - 1, 20, 13, 55),
      messages: [
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do",
        "Lorem ipsum dolor sit amet",
        "Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet",
      ],
      isSelfMessage: true,
    },
    {
      id: 3,
      sentDateTime: new Date(2024, 7 - 1, 21, 6, 33),
      messages: [
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do",
      ],
      isSelfMessage: true,
    },
    {
      id: 4,
      sentDateTime: new Date(2024, 7 - 1, 21, 13, 55),
      messages: [
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do",
        "Lorem ipsum dolor sit amet",
        "Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet",
      ],
      isSelfMessage: false,
    },
    {
      id: 5,
      sentDateTime: new Date(2024, 7 - 1, 21, 15, 55),
      messages: [
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do",
        "Lorem ipsum dolor sit amet",
        "Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet",
      ],
      isSelfMessage: false,
    },
    {
      id: 6,
      sentDateTime: new Date(2024, 7 - 1, 21, 16, 55),
      messages: [
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do",
        "Lorem ipsum dolor sit amet",
        "Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet",
      ],
      isSelfMessage: false,
    },
  ],
};

export const accessTokenCookieName = "access_token";
export const oauth2AuthResultCookieName = "oauth2_auth_result";
export const refreshTokenCookieName = "refresh_token";
export const userSessionCookieName = "user_session";