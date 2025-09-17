import "expo-router/entry";
import "react-native-url-polyfill/auto";
import "react-native-get-random-values";
import * as WebBrowser from "expo-web-browser";
WebBrowser.maybeCompleteAuthSession(); // required for OAuth to close tabs
export { default } from "expo-router/entry";
