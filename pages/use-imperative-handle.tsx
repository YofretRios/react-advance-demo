import type { NextPage } from "next";
import React, {
  useState,
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
  ForwardedRef,
} from "react";

type MessageSectionHandle = {
  scrollToTop: () => void;
  scrollToBottom: () => void;
};

type MessageSectionProps = {
  messages: Array<Message>;
};

type Message = {
  id: number;
  user: string;
  message: string;
};

const allMessages: Array<Message> = [
  {
    id: 1,
    user: "Interviewer",
    message:
      "[Baseline test room at LAPD HQ] Officer K-D-six-dash-three-dot-seven, let's begin. Ready?",
  },
  {
    id: 2,
    user: "K",
    message: "Yes, sir.",
  },
  {
    id: 3,
    user: "Interviewer",
    message: "Recite your baseline",
  },
  {
    id: 4,
    user: "K",
    message:
      "And blood-black nothingness began to spin... A system of cells interlinked within cells interlinked within cells interlinked within one stem... And dreadfully distinct against the dark, a tall white fountain played.",
  },
  {
    id: 5,
    user: "Interviewer",
    message: "Cells",
  },
  {
    id: 6,
    user: "K",
    message: "Cells",
  },
  {
    id: 7,
    user: "Interviewer",
    message: "Have you ever been in an institution? Cells.",
  },
  {
    id: 8,
    user: "K",
    message: "Cells",
  },
  {
    id: 9,
    user: "Interviewer",
    message: "Do they keep you in a cell? Cells.",
  },
  {
    id: 10,
    user: "K",
    message: "Cells",
  },
  {
    id: 11,
    user: "Interviewer",
    message:
      "When you're not performing your duties do they keep you in a little box? Cells.",
  },
  {
    id: 12,
    user: "K",
    message: "Cells",
  },
  {
    id: 13,
    user: "Interviewer",
    message: "Interlinked",
  },
  {
    id: 14,
    user: "K",
    message: "Interlinked",
  },
  {
    id: 15,
    user: "Interviewer",
    message:
      "What's it like to hold the hand of someone you love? Interlinked.",
  },
  {
    id: 16,
    user: "K",
    message: "Interlinked.",
  },
  {
    id: 17,
    user: "Interviewer",
    message: " Did they teach you how to feel finger to finger? Interlinked..",
  },
  {
    id: 18,
    user: "K",
    message: "Interlinked",
  },
  {
    id: 19,
    user: "Interviewer",
    message: "Do you long for having your heart interlinked? Interlinked.",
  },
  {
    id: 20,
    user: "K",
    message: "Interlinked",
  },
  {
    id: 21,
    user: "Interviewer",
    message: "Do you dream about being interlinked?",
  },
  {
    id: 22,
    user: "K",
    message: "Interlinked",
  },
  {
    id: 23,
    user: "Interviewer",
    message: "What's it like to hold your child in your arms? Interlinked.",
  },
  {
    id: 24,
    user: "K",
    message: "Interlinked",
  },
  {
    id: 25,
    user: "Interviewer",
    message:
      "Do you feel that there's a part of you that's missing? Interlinked.",
  },
  {
    id: 26,
    user: "K",
    message: "Interlinked",
  },
  {
    id: 27,
    user: "Interviewer",
    message: "Within cells interlinked.",
  },
  {
    id: 28,
    user: "K",
    message: "Within cells interlinked.",
  },
  {
    id: 29,
    user: "Interviewer",
    message: "Why don't you say that three times: Within cells interlinked.",
  },
  {
    id: 30,
    user: "K",
    message:
      "Within cells interlinked. Within cells interlinked. Within cells interlinked.",
  },
  {
    id: 31,
    user: "Interviewer",
    message: "We're done... Constant K, you can pick up your bonus.",
  },
  {
    id: 32,
    user: "K",
    message: "Thank you, sir.",
  },
];

const MessageSection = (
  { messages }: MessageSectionProps,
  ref: ForwardedRef<MessageSectionHandle>
) => {
  const containerRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  useEffect(() => {
    scrollToBottom();
  });

  // TODO expose scrollToTop and scrollToBottom through refs
  useImperativeHandle(ref, () => ({
    scrollToTop,
    scrollToBottom,
  }));

  function scrollToTop() {
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  }
  function scrollToBottom() {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }

  return (
    <div
      ref={containerRef}
      className="text-left w-1/2 border-2 h-80 overflow-auto p-4"
    >
      {messages.map((message, index, array) => (
        <div key={message.id}>
          <strong>{message.user}</strong>: <span>{message.message}</span>
          {array.length - 1 === index ? null : <hr />}
        </div>
      ))}
    </div>
  );
};

// TODO wrap component in forwardRef
const MessageDisplay = forwardRef<MessageSectionHandle, MessageSectionProps>(MessageSection);

const ChatDemo: NextPage = () => {
  // TODO create a ref for the message section component
  const messageDisplayRef = useRef<MessageSectionHandle>(null);
  const [messages, setMessages] = useState(allMessages.slice(0, 8));

  const addMessage = () =>
    messages.length < allMessages.length
      ? setMessages(allMessages.slice(0, messages.length + 1))
      : null;
  const removeMessage = () =>
    messages.length > 0
      ? setMessages(allMessages.slice(0, messages.length - 1))
      : null;

  // TODO create methods using exposed refs
  const scrollTop = () => messageDisplayRef.current?.scrollToTop();
  const scrollBottom = () => messageDisplayRef.current?.scrollToBottom();

  return (
    <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
      <h1 className="text-2xl">Blade Runner 2077</h1>

      <div className="my-4">
        <button
          onClick={addMessage}
          className="px-4 py-2 font-semibold text-sm bg-cyan-500 text-white rounded-full shadow-sm"
        >
          add message
        </button>
        <button
          onClick={removeMessage}
          className="px-4 py-2 font-semibold text-sm bg-cyan-500 text-white rounded-full shadow-sm"
        >
          remove message
        </button>
      </div>
      <MessageDisplay ref={messageDisplayRef} messages={messages} />

      <div className="my-4">
        <button
          onClick={scrollTop}
          className="px-4 py-2 font-semibold text-sm bg-cyan-500 text-white rounded-full shadow-sm"
        >
          Scroll to top
        </button>
        <button
          onClick={scrollBottom}
          className="px-4 py-2 font-semibold text-sm bg-cyan-500 text-white rounded-full shadow-sm"
        >
          Scroll to bottom
        </button>
      </div>
    </main>
  );
};

export default ChatDemo;
