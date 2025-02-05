import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Loader2, Send, Mic, MicOff, AlertCircle } from 'lucide-react'
import { supabase } from '@/integrations/supabase/client'
import { cn } from '@/lib/utils'
import { logger } from '@/utils/logger'

export const VapiAssistant = () => {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant', content: string }>>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isRecording, setIsRecording] = useState(false)

  useEffect(() => {
    logger.info("VapiAssistant mounted");
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim() || isLoading) return

    const userMessage = message.trim()
    setMessage('')
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])
    setIsLoading(true)

    try {
      logger.info("Calling Vapi assistant", { message: userMessage });
      const { data: { data }, error } = await supabase.functions.invoke('vapi-assistant', {
        body: { message: userMessage }
      })

      if (error) {
        logger.error("Error from Vapi assistant", error);
        throw error;
      }

      logger.info("Received response from Vapi assistant", { response: data });
      setMessages(prev => [...prev, { role: 'assistant', content: data.choices[0].message.content }])
    } catch (error) {
      logger.error('Error calling Vapi assistant:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const toggleRecording = () => {
    logger.info("Toggling recording", { wasRecording: isRecording });
    setIsRecording(!isRecording)
  }

  const suggestions = [
    "Show me lease expirations this month",
    "List overdue maintenance requests",
    "Summarize revenue trends",
    "Show pending lease approvals"
  ]

  return (
    <div className="flex flex-col h-full">
      <ScrollArea className="flex-1 px-4">
        <div className="space-y-4 py-4">
          {messages.length === 0 && (
            <div className="space-y-4">
              <div className="text-center text-muted-foreground py-4">
                <p className="font-medium">How can I help you today?</p>
                <p className="text-sm mt-2">Try asking about:</p>
              </div>
              <div className="grid grid-cols-1 gap-2">
                {suggestions.map((suggestion, i) => (
                  <Button
                    key={i}
                    variant="outline"
                    className="justify-start text-left h-auto py-2 px-3"
                    onClick={() => {
                      logger.info("Selected suggestion", { suggestion });
                      setMessage(suggestion);
                    }}
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>
            </div>
          )}
          
          {messages.map((msg, i) => (
            <div
              key={i}
              className={cn(
                "flex items-start gap-3",
                msg.role === 'assistant' ? 'justify-start' : 'justify-end'
              )}
            >
              {msg.role === 'assistant' && (
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <AlertCircle className="w-4 h-4 text-primary" />
                </div>
              )}
              <div
                className={cn(
                  "max-w-[80%] rounded-lg p-3",
                  msg.role === 'assistant'
                    ? 'bg-secondary text-secondary-foreground'
                    : 'bg-primary text-primary-foreground'
                )}
              >
                {msg.content}
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <AlertCircle className="w-4 h-4 text-primary" />
              </div>
              <div className="bg-secondary text-secondary-foreground max-w-[80%] rounded-lg p-3">
                <Loader2 className="h-4 w-4 animate-spin" />
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      <form onSubmit={handleSubmit} className="p-4 border-t bg-background">
        <div className="flex gap-2">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={toggleRecording}
            className={cn(
              "transition-colors",
              isRecording && "text-destructive"
            )}
          >
            {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
          </Button>
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask your AI assistant..."
            disabled={isLoading}
            className="flex-1"
          />
          <Button type="submit" disabled={isLoading || !message.trim()}>
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          </Button>
        </div>
      </form>
    </div>
  )
}