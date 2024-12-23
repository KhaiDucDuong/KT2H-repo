package hcmute.hhkt.messengerapp.constant;

public class ExceptionMessage {
    public static final String EMAIL_IS_TAKEN = "Email has been taken";
    public static final String USERNAME_IS_TAKEN = "Username has been taken";
    public static final String LOGIN_FAILED = "Username or password is incorrect";
    public static final String INVALID_TOKEN = "Token is invalid (token has expired or in the wrong format)";
    public static final String MISSING_TOKEN = "Token is missing.";
    public static final String EXPIRED_TOKEN = "Token is expired.";
    public static final String USER_NOT_EXIST = "User does not exist";
    public static final String REFRESH_TOKEN_NOT_EXIST = "Refresh token does not exist";
    public static final String USERNAME_IS_EMAIL = "Username cannot be email";
    public static final String FRIENDSHIP_NOT_EXIST = "Friendship does not exist";
    public static final String FRIEND_REQUEST_NOT_FOUND = "Friend request does not exist";
    public static final String FRIENDSHIP_EXIST = "Friendship has existed";
    public static final String FRIEND_REQUEST_EXIST = "Friend request has existed";
    public static final String FRIEND_REQUEST_IDENTICAL_SENDER_RECEIVER = "Friend request cannot have the same sender and receiver";
    public static final String FRIEND_REQUEST_INVALID_NEW_STATUS = "Friend request new status is not allowed";
    public static final String ILLEGAL_FRIEND_REQUEST_UPDATE_STATUS_CALLER = "This user cannot make changes to the friend request";
    public static final String MISSING_PARAMETERS = "Missing parameters in request";
    public static final String ILLEGAL_FRIEND_REQUEST_DELETE_CALLER = "This user cannot delete the friend request";
    public static final String ACCOUNT_NOT_FOUND_BY_ACTIVATION_KEY = "No user was found for this activation key";
    public static final String UNACTIVATED_ACCOUNT = "Account is unactivated";
    public static final String ACCOUNT_IS_NOT_UNACTIVATED = "Account is not unactivated";
    public static final String CONVERSATION_NOT_FOUND = "Conversation does not exist";
    public static final String INVALID_MESSAGE_TYPE = "Invalid message type";
    public static final String MESSAGE_IS_BLANK = "Message content cannot be blank";
    public static final String ILLEGAL_MESSAGE_ORIGIN = "Message origin is illegal";
    public static final String INVALID_MESSAGE_SENDER = "Message cannot be sent by this user";
    public static final String CONVERSATION_IDENTICAL_CREATOR_TARGET = "Conversation cannot have the same creator and target";
    public static final String USER_CANNOT_ACCESS_THIS_CONVERSATION = "User cannot access this conversation";
    public static final String NOTIFICATION_EXIST = "Notification for this content has existed";
    public static final String ACCOUNT_EXISTS = "Account for this user has existed";
    public static final String INVALID_INVITATION_NOTIFICATION_TYPE = "Invitation notification's type is invalid";
    public static final String INVITATION_NOTIFICATION_NOT_EXIST = "Invitation notification does not exist";
    public static final String FIREBASE_FILE_PATH_INVALID = "Firebase file path is invalid";
    public static final String FILE_NAME_BLANK = "File name is blank";
    public static final String IMAGE_INVALID = "Error processing image file";
    public static final String RESIZE_IMAGE_ERROR = "Error trying to resize image file";

    public static final String INVALID_USER = "User does not exist";
    public static final String PRIVACY_SETTING_DOES_NOT_EXIST = "Privacy setting does not exist";
}
