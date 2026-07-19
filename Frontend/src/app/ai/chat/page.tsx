'use client';

import Link from 'next/link';
import { useState, useRef, useEffect, useCallback } from 'react';
import {
  ArrowLeft,
  Bot,
  MessageSquare,
  Plus,
  Send,
  Trash2,
  User,
} from 'lucide-react';
import { Container } from '@/components/layout/container';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Heading, Text } from '@/components/ui/typography';
import { ErrorState } from '@/components/common/error-state';
import { Spinner } from '@/components/common/loading';
import {
  useChatSession,
  useChatSessions,
  useCreateSession,
  useDeleteSession,
  useSendMessage,
} from '@/hooks/useChat';
import { getApiErrorMessage } from '@/utils/api-error';
import { ROUTES } from '@/constants/routes';
import type { ChatMessage } from '@/types/chat';

const SUGGESTED_PROMPTS = [
  'Explain the concept of gravity and how it affects planetary motion.',
  'Help me understand the basics of cellular respiration.',
  'What are the key principles of supply and demand in economics?',
  'Walk me through solving a quadratic equation step by step.',
];

function MessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === 'user';
  return (
    <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : ''}`}>
      <div
        className={`flex size-8 shrink-0 items-center justify-center rounded-full ${
          isUser ? 'bg-primary/10 text-primary' : 'bg-secondary/10 text-secondary'
        }`}
        aria-hidden="true"
      >
        {isUser ? <User className="size-4" /> : <Bot className="size-4" />}
      </div>
      <div
        className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-6 ${
          isUser
            ? 'bg-primary text-primary-foreground'
            : 'bg-surface text-foreground'
        }`}
      >
        <p className="whitespace-pre-wrap break-words">{message.content}</p>
      </div>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex gap-3">
      <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-secondary/10 text-secondary" aria-hidden="true">
        <Bot className="size-4" />
      </div>
      <div className="flex items-center gap-1.5 rounded-2xl bg-surface px-4 py-3">
        <span className="size-2 animate-bounce rounded-full bg-muted [animation-delay:0ms]" />
        <span className="size-2 animate-bounce rounded-full bg-muted [animation-delay:150ms]" />
        <span className="size-2 animate-bounce rounded-full bg-muted [animation-delay:300ms]" />
      </div>
    </div>
  );
}

function NewSessionView({ onSelectPrompt }: { onSelectPrompt: (prompt: string) => void }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-8 px-4 py-12">
      <div className="flex flex-col items-center gap-3 text-center">
        <div className="flex size-16 items-center justify-center rounded-full bg-secondary/10" aria-hidden="true">
          <Bot className="size-8 text-secondary" />
        </div>
        <Heading level={2}>StudyGenie Tutor</Heading>
        <Text size="base" className="max-w-md text-muted">
          Your personal AI tutor. Pick a topic or type your own question to get started.
        </Text>
      </div>
      <div className="grid w-full max-w-2xl gap-3 sm:grid-cols-2">
        {SUGGESTED_PROMPTS.map((prompt) => (
          <button
            key={prompt}
            type="button"
            className="rounded-xl border border-border bg-background p-4 text-left text-sm text-foreground transition-colors hover:border-primary hover:bg-primary/5 focus:outline-none focus:ring-2 focus:ring-primary"
            onClick={() => onSelectPrompt(prompt)}
          >
            {prompt}
          </button>
        ))}
      </div>
    </div>
  );
}

function SessionItem({
  session,
  isActive,
  isDeleting,
  onSelect,
  onDelete,
}: {
  session: { id: string; title: string };
  isActive: boolean;
  isDeleting: boolean;
  onSelect: () => void;
  onDelete: () => void;
}) {
  return (
    <div
      className={`group flex items-center gap-2 rounded-lg px-3 py-2.5 transition-colors ${
        isActive
          ? 'bg-primary/10 text-primary'
          : 'text-foreground hover:bg-surface'
      }`}
    >
      <button
        type="button"
        className="min-w-0 flex-1 text-left"
        onClick={onSelect}
        aria-pressed={isActive}
        aria-label={`Switch to ${session.title}`}
      >
        <p className="truncate text-sm font-medium">{session.title}</p>
      </button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="shrink-0 text-muted opacity-0 transition-opacity group-hover:opacity-100 focus:opacity-100"
        isLoading={isDeleting}
        onClick={onDelete}
        aria-label={`Delete ${session.title}`}
      >
        {!isDeleting && <Trash2 className="size-3.5" aria-hidden="true" />}
      </Button>
    </div>
  );
}

export default function AIChatPage() {
  const sessionsQuery = useChatSessions(true);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const sessionDetailQuery = useChatSession(activeSessionId, !!activeSessionId);
  const createSession = useCreateSession();
  const sendMessage = useSendMessage();
  const deleteSession = useDeleteSession();
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const sessions = sessionsQuery.data ?? [];
  const messages = sessionDetailQuery.data?.messages ?? [];
  const isNewSession = activeSessionId !== null && messages.length === 0 && !sessionDetailQuery.isLoading;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.length, sendMessage.isPending]);

  const handleSelectSession = useCallback((id: string) => {
    setActiveSessionId(id);
  }, []);

  const handleCreateSession = useCallback(async () => {
    try {
      const session = await createSession.mutateAsync();
      setActiveSessionId(session.id);
    } catch {
      // error handled by the form
    }
  }, [createSession]);

  const handleDeleteSession = useCallback(
    (id: string) => {
      deleteSession.mutate(id, {
        onSuccess: () => {
          if (activeSessionId === id) {
            setActiveSessionId(null);
          }
        },
      });
    },
    [deleteSession, activeSessionId]
  );

  const handleSendMessage = useCallback(
    (content: string) => {
      if (!activeSessionId || !content.trim()) return;
      setInputValue('');
      sendMessage.mutate({ sessionId: activeSessionId, message: content });
    },
    [activeSessionId, sendMessage]
  );

  const handleSuggestedPrompt = useCallback(
    (prompt: string) => {
      if (activeSessionId) {
        handleSendMessage(prompt);
      }
    },
    [activeSessionId, handleSendMessage]
  );

  const handleFormSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      handleSendMessage(inputValue);
    },
    [inputValue, handleSendMessage]
  );

  return (
    <Container as="section" className="flex min-h-[calc(100vh-8rem)] flex-col py-4 lg:py-6">
      <Link
        href={ROUTES.dashboard}
        className="mb-3 inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        Back to Dashboard
      </Link>

      <div className="flex flex-1 gap-4 overflow-hidden lg:gap-6">
        <aside className="hidden w-64 shrink-0 flex-col lg:flex">
          <Card className="flex flex-1 flex-col">
            <CardHeader className="pb-3">
              <CardTitle>Chat History</CardTitle>
              <CardDescription>Your study sessions</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col gap-2 overflow-y-auto">
              <Button
                variant="primary"
                size="sm"
                fullWidth
                isLoading={createSession.isPending}
                onClick={handleCreateSession}
                className="mb-2"
              >
                {!createSession.isPending && <Plus className="mr-1.5 size-4" aria-hidden="true" />}
                New Chat
              </Button>

              {sessionsQuery.isLoading ? (
                <Spinner size="sm" label="Loading..." />
              ) : sessionsQuery.isError ? (
                <ErrorState
                  title="Failed to load"
                  message={getApiErrorMessage(sessionsQuery.error, 'Could not load chat sessions.')}
                  onRetry={() => sessionsQuery.refetch()}
                />
              ) : sessions.length === 0 ? (
                <div className="py-8 text-center">
                  <MessageSquare className="mx-auto mb-2 size-8 text-muted" aria-hidden="true" />
                  <p className="text-sm text-muted">No sessions yet</p>
                </div>
              ) : (
                <div className="space-y-1">
                  {sessions.map((session) => (
                    <SessionItem
                      key={session.id}
                      session={session}
                      isActive={activeSessionId === session.id}
                      isDeleting={deleteSession.isPending && deleteSession.variables === session.id}
                      onSelect={() => handleSelectSession(session.id)}
                      onDelete={() => handleDeleteSession(session.id)}
                    />
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </aside>

        <Card className="flex flex-1 flex-col overflow-hidden">
          {activeSessionId === null ? (
            <div className="flex flex-1 flex-col items-center justify-center gap-4 px-4 py-12">
              <div className="flex size-16 items-center justify-center rounded-full bg-secondary/10" aria-hidden="true">
                <Bot className="size-8 text-secondary" />
              </div>
              <div className="text-center">
                <Heading level={2}>StudyGenie Tutor</Heading>
                <Text size="base" className="mt-1 max-w-md text-muted">
                  Select a session from the sidebar or start a new chat.
                </Text>
              </div>
              <div className="flex gap-3 lg:hidden">
                <Button
                  variant="primary"
                  isLoading={createSession.isPending}
                  onClick={handleCreateSession}
                >
                  {!createSession.isPending && <Plus className="mr-1.5 size-4" aria-hidden="true" />}
                  New Chat
                </Button>
              </div>
            </div>
          ) : sessionDetailQuery.isLoading ? (
            <div className="flex flex-1 items-center justify-center">
              <Spinner size="lg" label="Loading conversation..." />
            </div>
          ) : sessionDetailQuery.isError ? (
            <div className="flex flex-1 items-center justify-center p-4">
              <ErrorState
                title="Conversation unavailable"
                message={getApiErrorMessage(sessionDetailQuery.error, 'Could not load this conversation.')}
                onRetry={() => sessionDetailQuery.refetch()}
              />
            </div>
          ) : isNewSession ? (
            <NewSessionView onSelectPrompt={handleSuggestedPrompt} />
          ) : (
            <div className="flex flex-1 flex-col overflow-hidden">
              <CardHeader className="border-b border-border pb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>{sessionDetailQuery.data?.session.title ?? 'Chat'}</CardTitle>
                    <CardDescription>
                      {messages.length} message{messages.length !== 1 ? 's' : ''}
                    </CardDescription>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-muted hover:text-danger lg:hidden"
                    isLoading={createSession.isPending}
                    onClick={handleCreateSession}
                  >
                    {!createSession.isPending && <Plus className="size-4" aria-hidden="true" />}
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="flex-1 space-y-4 overflow-y-auto py-4">
                {messages.map((message) => (
                  <MessageBubble key={message.id} message={message} />
                ))}

                {sendMessage.isPending && <TypingIndicator />}

                {sendMessage.error && (
                  <p className="rounded-lg bg-danger/10 px-3 py-2 text-sm text-danger" role="alert">
                    {getApiErrorMessage(sendMessage.error, 'Failed to send message. Please try again.')}
                  </p>
                )}

                <div ref={messagesEndRef} />
              </CardContent>

              <CardFooter className="border-t border-border pt-3">
                <form onSubmit={handleFormSubmit} className="flex w-full gap-3">
                  <div className="flex-1">
                    <Textarea
                      placeholder="Ask a question..."
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      isDisabled={sendMessage.isPending}
                      rows={1}
                      className="min-h-[2.5rem] resize-none"
                    />
                  </div>
                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    isLoading={sendMessage.isPending}
                    isDisabled={!inputValue.trim() || sendMessage.isPending}
                    aria-label="Send message"
                  >
                    {!sendMessage.isPending && <Send className="size-4" aria-hidden="true" />}
                  </Button>
                </form>
              </CardFooter>
            </div>
          )}
        </Card>
      </div>

      <div className="mt-3 flex gap-2 lg:hidden">
        <Button
          variant="primary"
          size="sm"
          fullWidth
          isLoading={createSession.isPending}
          onClick={handleCreateSession}
        >
          {!createSession.isPending && <Plus className="mr-1.5 size-4" aria-hidden="true" />}
          New Chat
        </Button>
      </div>
    </Container>
  );
}
