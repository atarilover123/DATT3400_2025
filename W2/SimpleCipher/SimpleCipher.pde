//we create a jumbled alphabet 
//we use a encrypt function to switch the letters - e.g an A becomes a P - or whatever corresponds in the shuffled alphabet
//we can use the reverse process to decrypt the message

String alphabet =          "abcdefghijklmnopqrstuvwxyz";
//String shiftedAlphabet = "defghijklmnopqrstuvwxyzabc";
String shiftedAlphabet =   "phqgiumeaylnofdxjkrcvstzwb";

String encrypt(String message) {
  message = message.toLowerCase();
  String encryptedMessage = "";
  for (int i = 0; i < message.length(); i++) {
    char currentChar = message.charAt(i);
    int charIndex = alphabet.indexOf(currentChar);
    if (charIndex != -1) {
      encryptedMessage += shiftedAlphabet.charAt(charIndex);
    } else {
      encryptedMessage += currentChar;
    }
  }
  return encryptedMessage;
}

String decrypt(String encryptedMessage) {
  encryptedMessage = encryptedMessage.toLowerCase();
  String decryptedMessage = "";
  for (int i = 0; i < encryptedMessage.length(); i++) {
    char currentChar = encryptedMessage.charAt(i);
    int charIndex = shiftedAlphabet.indexOf(currentChar);
    if (charIndex != -1) {
      decryptedMessage += alphabet.charAt(charIndex);
    } else {
      decryptedMessage += currentChar;
    }
  }
  return decryptedMessage;
}

void setup() {
  size(400, 400);
  background(255);
  
  String message = "Apples are delicious";
  
  String encryptedMessage = encrypt(message);
  String decryptedMessage = decrypt(encryptedMessage);
  textSize(32);
  fill(0);
  text(message, 50, 50);
  text(encryptedMessage, 50, 100);
  text(decryptedMessage, 50, 150);
}
