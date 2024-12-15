package hcmute.hhkt.messengerapp.util;

import java.util.regex.Pattern;

public class RegrexUtil {
    public final static String emailRegrexRFC5322 = "^[a-zA-Z0-9_!#$%&'*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$";
    public final static String passwordRegrex = "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[ !\"#$%&'()*+,-./:;<=>?@[\\\\]^_`{|}~]).*$";;
    public static boolean isEmail(String email){
        return Pattern.compile(emailRegrexRFC5322)
                .matcher(email)
                .matches();
    }
}
