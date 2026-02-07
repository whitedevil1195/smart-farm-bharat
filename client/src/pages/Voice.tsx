import { useState, useEffect } from "react";
import { useVoiceQuery } from "@/hooks/use-predictions";
import { Button } from "@/components/ui/button";
import { Mic, MicOff, Volume2, User, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function Voice() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [response, setResponse] = useState<string | null>(null);
  const { mutate, isPending } = useVoiceQuery();

  // Simple browser speech recognition setup
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      // @ts-ignore
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recog = new SpeechRecognition();
      recog.continuous = false;
      recog.lang = 'en-US';
      recog.interimResults = false;

      recog.onresult = (event: SpeechRecognitionEvent) => {
        const text = event.results[0][0].transcript;
        setTranscript(text);
        setIsListening(false);
        
        // Auto-submit after recognition
        mutate(text, {
          onSuccess: (data) => setResponse(data.response),
        });
      };

      recog.onerror = () => setIsListening(false);
      recog.onend = () => setIsListening(false);

      setRecognition(recog);
    }
  }, [mutate]);

  const toggleListening = () => {
    if (!recognition) {
      alert("Speech recognition not supported in this browser.");
      return;
    }

    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      setTranscript("");
      setResponse(null);
      recognition.start();
      setIsListening(true);
    }
  };

  const speakResponse = () => {
    if (response) {
      const utterance = new SpeechSynthesisUtterance(response);
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="max-w-3xl mx-auto flex flex-col h-[80vh]">
      <div className="text-center mb-8 space-y-2">
        <h1 className="text-3xl font-display font-bold">AI Voice Assistant</h1>
        <p className="text-muted-foreground">Ask questions about farming, weather, or crop prices.</p>
      </div>

      <div className="flex-1 bg-white dark:bg-card border border-border rounded-3xl shadow-xl overflow-hidden flex flex-col relative">
        {/* Chat Area */}
        <div className="flex-1 p-6 overflow-y-auto space-y-6 bg-secondary/5">
          {transcript && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-end"
            >
              <div className="bg-primary text-primary-foreground px-6 py-4 rounded-2xl rounded-tr-sm max-w-[80%] shadow-md">
                <div className="flex items-center gap-2 mb-1 text-primary-foreground/70 text-xs uppercase font-bold tracking-wider">
                  <User className="w-3 h-3" /> You
                </div>
                <p className="text-lg">{transcript}</p>
              </div>
            </motion.div>
          )}

          {isPending && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="bg-white border border-border px-6 py-4 rounded-2xl rounded-tl-sm shadow-sm flex items-center gap-3">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
                <span className="text-muted-foreground text-sm font-medium">AI is thinking...</span>
              </div>
            </motion.div>
          )}

          {response && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start"
            >
              <div className="bg-white dark:bg-muted border border-border px-6 py-4 rounded-2xl rounded-tl-sm max-w-[80%] shadow-lg">
                <div className="flex items-center gap-2 mb-2 text-primary text-xs uppercase font-bold tracking-wider">
                  <Sparkles className="w-3 h-3" /> AgriSmart AI
                </div>
                <p className="text-lg leading-relaxed text-foreground/90">{response}</p>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="mt-3 -ml-2 text-muted-foreground hover:text-primary"
                  onClick={speakResponse}
                >
                  <Volume2 className="w-4 h-4 mr-2" /> Listen
                </Button>
              </div>
            </motion.div>
          )}
          
          {!transcript && !isListening && (
            <div className="h-full flex flex-col items-center justify-center text-center text-muted-foreground p-8 opacity-50">
              <Mic className="w-12 h-12 mb-4" />
              <p>Tap the microphone to start speaking</p>
            </div>
          )}
        </div>

        {/* Controls Area */}
        <div className="p-6 bg-white dark:bg-card border-t border-border flex items-center justify-center relative">
          {/* Visualizer effect when listening */}
          {isListening && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
               <div className="w-32 h-32 bg-primary rounded-full animate-ping" />
               <div className="w-48 h-48 bg-primary rounded-full animate-ping" style={{ animationDelay: '0.2s' }} />
            </div>
          )}
          
          <Button 
            size="lg" 
            className={`w-20 h-20 rounded-full shadow-xl transition-all duration-300 ${
              isListening 
                ? 'bg-destructive hover:bg-destructive/90 scale-110' 
                : 'bg-primary hover:bg-primary/90 hover:scale-105'
            }`}
            onClick={toggleListening}
          >
            {isListening ? (
              <MicOff className="w-8 h-8" />
            ) : (
              <Mic className="w-8 h-8" />
            )}
          </Button>
          
          <p className="absolute bottom-2 text-xs text-muted-foreground font-medium">
            {isListening ? "Listening..." : "Click to Speak"}
          </p>
        </div>
      </div>
    </div>
  );
}
