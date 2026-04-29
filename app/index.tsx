import { Text, View, TextInput, TouchableOpacity, ScrollView, Image, ActivityIndicator } from "react-native";
import { KeyboardAvoidingView } from "react-native-keyboard-controller";
import { Ionicons } from '@expo/vector-icons';
import React, { use, useEffect } from "react";
import { useChatStore } from "@/state/use-chat-store";
import { cn } from "@/lib/utils";

export default function Index() {
  const { isGenerating, generateResponse, messages } = useChatStore()
  const [prompt, setPrompt] = React.useState("")
  const scrollIntoView = React.useRef<ScrollView>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      scrollIntoView.current?.scrollToEnd({ animated: true });
    }, 100);
    return () => clearTimeout(timer);
  }, [messages, isGenerating])

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

      <ScrollView className="flex-1 p-4 mt-scroll-20" ref={scrollIntoView} onContentSizeChange={() => {
        scrollIntoView.current?.scrollToEnd({ animated: true });
      }}>
        <View className="bg-white dark:bg-neutral-900 border border-stone-100 dark:border-neutral-800 border-l-2 border-l-yellow-400 self-start p-4 rounded-2xl rounded-tl-sm max-w-[80%]">
          <Text className="text-neutral-900 dark:text-neutral-100 font-medium leading-relaxed">
            Hi! I’m Chow, your personal AI assistant. What would you like me to help you with?
          </Text>
        </View>


        {messages.map((msg, index) =>
          <View key={index} className="py-2">
            {msg.role === "chow"
              ? <View className="flex-row items-start mb-4">
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
        <View className="pb-8">
          {isGenerating &&
            <View className="bg-white dark:bg-neutral-900 border border-stone-100 dark:border-neutral-800 border-l-2 self-start p-4 rounded-2xl rounded-tl-sm max-w-[80%] flex flex-row gap-2">
              <View className="w-1 h-1 animate-bounce delay-75 bg-black rounded-full"></View>
              <View className="w-1 h-1 animate-bounce delay-100 bg-black rounded-full"></View>
              <View className="w-1 h-1 animate-bounce delay-150 bg-black rounded-full"></View>
            </View>
          }
        </View>
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
          <TouchableOpacity
            className="h-11 w-11 rounded-2xl items-center justify-center"
            style={{ backgroundColor: '#facc15', opacity: (isGenerating || !prompt.trim()) ? 0.45 : 1 }}
            onPress={() => {
              generateResponse(prompt);
              setPrompt("");
            }}
            disabled={isGenerating || !prompt.trim()}
          >
            {isGenerating
              ? <ActivityIndicator size="small" color="#713f12" />
              : <Ionicons name="send" size={16} color="#1c1917" />
            }
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}