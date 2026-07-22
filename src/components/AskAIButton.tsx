"use client";

import { User } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Fragment, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Textarea } from "./ui/textarea";
import { ArrowUpIcon, Bot, Sparkles, User as UserIcon, Copy, Check, Lightbulb } from "lucide-react";
import { askAIAboutNotesAction } from "@/actions/notes";
import { toast } from "sonner";

type Props = {
  user: User | null;
};

const SUGGESTED_PROMPTS = [
  "Summarize all my notes into key bullet points",
  "List all action items & TODOs mentioned in my notes",
  "Find common themes across my notes",
  "Generate 3 quiz questions to test my memory of these notes",
];

function AskAIButton({ user }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [open, setOpen] = useState(false);
  const [questionText, setQuestionText] = useState("");
  const [questions, setQuestions] = useState<string[]>([]);
  const [responses, setResponses] = useState<string[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleOnOpenChange = (isOpen: boolean) => {
    if (!user) {
      router.push("/login");
    } else {
      if (isOpen) {
        setQuestionText("");
        setQuestions([]);
        setResponses([]);
      }
      setOpen(isOpen);
    }
  };

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleInput = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    textarea.style.height = "auto";
    textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
  };

  const handleClickInput = () => {
    textareaRef.current?.focus();
  };

  const sendQuery = (textToSend: string) => {
    if (!textToSend.trim()) return;

    const newQuestions = [...questions, textToSend];
    setQuestions(newQuestions);
    setQuestionText("");
    setTimeout(scrollToBottom, 100);

    startTransition(async () => {
      const response = await askAIAboutNotesAction(newQuestions, responses);
      setResponses((prev) => [...prev, response]);
      setTimeout(scrollToBottom, 100);
    });
  };

  const handleSubmit = () => {
    sendQuery(questionText);
  };

  const scrollToBottom = () => {
    contentRef.current?.scrollTo({
      top: contentRef.current.scrollHeight,
      behavior: "smooth",
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleCopyResponse = (text: string, index: number) => {
    // Strip HTML tags for clean text copying
    const cleanText = text.replace(/<[^>]*>?/gm, "");
    navigator.clipboard.writeText(cleanText);
    setCopiedIndex(index);
    toast.success("AI response copied to clipboard!");
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <Dialog open={open} onOpenChange={handleOnOpenChange}>
      <DialogTrigger asChild>
        <Button className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white font-medium shadow-lg shadow-indigo-500/25 transition-all duration-300 hover:scale-105 gap-2 rounded-xl">
          <Sparkles className="size-4 animate-pulse" />
          <span>Ask AI</span>
        </Button>
      </DialogTrigger>
      <DialogContent
        className="glass-card flex h-[85vh] max-w-3xl flex-col overflow-hidden p-0 rounded-2xl border-border/60 shadow-2xl"
      >
        {/* Header */}
        <DialogHeader className="border-b border-border/40 p-4 px-6 bg-card/60 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-tr from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-500/20">
              <Bot className="size-4" />
            </div>
            <div>
              <DialogTitle className="text-base font-bold flex items-center gap-2">
                Ask AI Assistant
                <span className="rounded-full bg-purple-500/10 border border-purple-500/20 px-2 py-0.5 text-[10px] font-semibold text-purple-600 dark:text-purple-400">
                  Gemini Powered
                </span>
              </DialogTitle>
              <DialogDescription className="text-xs text-muted-foreground">
                Ask questions, summarize, or analyze across all your saved notes.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {/* Chat History Body */}
        <div className="custom-scrollbar flex-1 overflow-y-auto p-6 space-y-6" ref={contentRef}>
          {questions.length === 0 && (
            <div className="flex flex-col items-center justify-center py-8 text-center space-y-4">
              <div className="size-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-500 shadow-inner">
                <Lightbulb className="size-6" />
              </div>
              <div className="space-y-1 max-w-sm">
                <p className="text-sm font-semibold">What would you like to know?</p>
                <p className="text-xs text-muted-foreground">
                  Click a suggested prompt below or type your question about any note.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full pt-2">
                {SUGGESTED_PROMPTS.map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => sendQuery(prompt)}
                    className="flex items-start text-left p-3 text-xs rounded-xl bg-muted/50 hover:bg-indigo-500/10 hover:border-indigo-500/30 border border-border/50 transition-all duration-200 text-foreground/90 font-medium group"
                  >
                    <Sparkles className="size-3.5 text-indigo-500 mr-2 mt-0.5 shrink-0 group-hover:scale-110 transition-transform" />
                    <span>{prompt}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {questions.map((question, index) => (
            <Fragment key={index}>
              {/* User Message */}
              <div className="flex items-start justify-end gap-2.5">
                <div className="max-w-[80%] rounded-2xl rounded-tr-none bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-2.5 text-xs text-white shadow-md shadow-indigo-500/10">
                  <p className="whitespace-pre-wrap font-medium">{question}</p>
                </div>
                <div className="flex size-7 items-center justify-center rounded-full bg-muted text-muted-foreground shrink-0 text-xs">
                  <UserIcon className="size-3.5" />
                </div>
              </div>

              {/* Bot Response */}
              {responses[index] ? (
                <div className="flex items-start gap-2.5">
                  <div className="flex size-7 items-center justify-center rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 text-white shrink-0 text-xs shadow-md shadow-indigo-500/20">
                    <Bot className="size-3.5" />
                  </div>
                  <div className="relative group max-w-[85%] rounded-2xl rounded-tl-none bg-card border border-border/60 p-4 text-xs shadow-sm space-y-2">
                    <div
                      className="bot-response text-foreground leading-relaxed space-y-2"
                      dangerouslySetInnerHTML={{ __html: responses[index] }}
                    />
                    <div className="flex justify-end pt-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleCopyResponse(responses[index], index)}
                        className="size-6 text-muted-foreground hover:text-foreground"
                        title="Copy answer"
                      >
                        {copiedIndex === index ? <Check className="size-3 text-emerald-500" /> : <Copy className="size-3" />}
                      </Button>
                    </div>
                  </div>
                </div>
              ) : null}
            </Fragment>
          ))}

          {isPending && (
            <div className="flex items-center gap-2.5">
              <div className="flex size-7 items-center justify-center rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 text-white shrink-0 text-xs shadow-md">
                <Bot className="size-3.5" />
              </div>
              <div className="rounded-2xl rounded-tl-none bg-card border border-border/60 px-4 py-3 text-xs text-muted-foreground shadow-sm flex items-center gap-2">
                <Sparkles className="size-3.5 text-indigo-500 animate-spin" />
                <span className="font-medium animate-pulse">Analyzing notes and drafting answer...</span>
              </div>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="border-t border-border/40 p-4 bg-card/70 backdrop-blur-md">
          <div
            className="flex items-center gap-2 rounded-xl border border-border/60 bg-muted/40 px-3 py-2 focus-within:border-indigo-500/50 focus-within:ring-2 focus-within:ring-indigo-500/20 transition-all cursor-text"
            onClick={handleClickInput}
          >
            <Textarea
              ref={textareaRef}
              placeholder="Ask anything about your notes... (Press Enter ↵ to send)"
              className="custom-scrollbar min-h-6 max-h-28 w-full resize-none border-none bg-transparent p-0 text-xs font-normal text-foreground placeholder:text-muted-foreground/70 focus-visible:ring-0 focus-visible:ring-offset-0"
              rows={1}
              onInput={handleInput}
              onKeyDown={handleKeyDown}
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
            />
            <Button
              onClick={handleSubmit}
              disabled={!questionText.trim() || isPending}
              size="icon"
              className="size-8 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white shrink-0 shadow-sm"
            >
              <ArrowUpIcon className="size-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default AskAIButton;