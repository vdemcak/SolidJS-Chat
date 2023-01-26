import { Component, createSignal } from 'solid-js';
import { io } from 'socket.io-client';
import Message, { TMessage } from './components/Message';
import MessageBubble from './components/Message';

const App: Component = () => {
  const [messages, setMessages] = createSignal([] as TMessage[]);
  const [usernameSet, setUsernameSet] = createSignal(false);
  const [user, setUser] = createSignal('');
  const [input, setInput] = createSignal('');

  if (!user()) {
    const userFromStorage = localStorage.getItem('user');
    if (userFromStorage) {
      setUser(userFromStorage);
      setUsernameSet(true);
    }
  }

  // Connect to server
  const socket = io('http://localhost:8000');

  // Get message history, sent by server on initial connection
  socket.on('message-history', (messages: TMessage[]) => {
    setMessages(messages);
    const messageContainer = document.querySelector('#messages');
    messageContainer.scrollTop = messageContainer.scrollHeight;
  });

  // Listen for new messages
  socket.on('new-message', ({ message, user }) => {
    setMessages((messages) => [...messages, { message, user }]);
    const messageContainer = document.querySelector('#messages');
    messageContainer.scrollTop = messageContainer.scrollHeight;
  });

  // Send message action
  function sendMessage() {
    if (!input()) return;
    socket.emit('message', { message: input(), user: user() });
    setInput('');
  }

  // Set username after user has entered it
  function setUsername() {
    if (!user()) return;
    localStorage.setItem('user', user());
    setUsernameSet(true);
  }

  // Send message on enter
  function handleKeyDown(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      sendMessage();
    }
  }
  window.addEventListener('keydown', handleKeyDown);

  return (
    <div class="mx-auto flex h-full w-full flex-col items-center md:w-1/3">
      {/* Header */}
      <h1 class="py-3 text-2xl font-bold">Live Chat</h1>

      {/* Message Container */}
      <div id="messages" class="h-full w-full overflow-scroll bg-grey-50">
        {messages().map((message) => (
          <MessageBubble message={message} sender={message.user === user()} />
        ))}
      </div>
      {/* Send prompt */}
      <div class="mt-auto flex w-full items-center p-4">
        {/* Show login if no username has been set yet, otherwise show send prompt */}
        {usernameSet() ? (
          <>
            <input
              type="text"
              class="border-gray-300 flex-1 rounded-md border"
              value={input()}
              disabled={!user()}
              onInput={(e) => setInput(e.currentTarget.value)}
            />
            <button
              class="ml-2 rounded-md bg-blue-500 p-2 text-xs text-white disabled:opacity-50"
              disabled={!user()}
              onClick={sendMessage}
            >
              Send message
            </button>
          </>
        ) : (
          <div class="flex w-full items-center justify-center gap-2">
            <span>Enter username to begin:</span>
            <input
              type="text"
              placeholder="Username"
              class="border-gray-300 rounded-md border p-1"
              value={user()}
              onInput={(e) => {
                setUser(e.currentTarget.value);
              }}
            />
            <button
              class="ml-2 rounded-md bg-blue-500 p-2 text-xs text-white disabled:opacity-50"
              disabled={!user()}
              onClick={setUsername}
            >
              Submit
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
