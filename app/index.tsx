import { Text, View, TextInput, TouchableOpacity, ScrollView, Image } from "react-native";
import { KeyboardAvoidingView } from "react-native-keyboard-controller";
import { Ionicons } from '@expo/vector-icons';
import { useChatStore } from "./state/use-chat-store";
import React from "react";

export default function Index() {
  const { isGenerating, generateResponse, messages } = useChatStore()
  const [prompt, setPrompt] = React.useState("")

  return (
    <View className="flex-1 bg-stone-50 dark:bg-neutral-950">
      <View className="pt-14 pb-4 px-6 bg-white dark:bg-neutral-900 border-b border-stone-100 dark:border-neutral-800 flex-row items-center justify-between">
        <View className="flex-row items-center gap-3">
          <Image className="w-10 h-10 rounded-2xl bg-yellow-400 items-center justify-center" source={require('../assets/images/chow.jpg')} />
          <View>
            <Text className="text-base font-bold text-neutral-900 dark:text-white tracking-tight">Chow</Text>
          </View>
        </View>
      </View>

      <ScrollView className="flex-1 p-4">
        {messages.map((msg, index) =>
          <View key={index} className="py-2">
            {msg.role === "chow"
              ? <View className="flex-row items-start mb-4">
                <Image className="w-7 h-7 rounded-xl bg-yellow-400 items-center justify-center mr-2 mt-0.5" source={require('../assets/images/chow.jpg')} />
                <View className="bg-white dark:bg-neutral-900 border border-stone-100 dark:border-neutral-800 border-l-2 border-l-yellow-400 self-start p-4 rounded-2xl rounded-tl-sm max-w-[80%]">
                  <Text className="text-neutral-900 dark:text-neutral-100 font-medium leading-relaxed">
                    {msg.content}
                  </Text>
                </View>
              </View>

              : <View className="bg-neutral-900 dark:bg-neutral-800 self-end p-4 rounded-2xl rounded-tr-sm mb-4 max-w-[80%]">
                <Text className="text-white">{msg.content}</Text>
              </View>
            }
          </View>
        )}
      </ScrollView>

      <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={0}>
        <View className="p-4 bg-white dark:bg-neutral-900 border-t border-stone-100 dark:border-neutral-800 flex-row items-center gap-3">
          <TextInput
            placeholder="Aa"
            placeholderTextColor="#a8a29e"
            className="flex-1 bg-stone-100 dark:bg-neutral-800 text-neutral-900 dark:text-white px-4 py-3 rounded-full border border-stone-200 dark:border-neutral-700"
            value={prompt}
            onChangeText={setPrompt}
          />
          <TouchableOpacity className="bg-yellow-400 h-11 w-11 rounded-2xl items-center justify-center" onPress={() => generateResponse(prompt)}>
            <Ionicons name="send" className="" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}