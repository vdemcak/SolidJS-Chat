export type TMessage = {
  message: string;
  user: string;
};

const MessageBubble = ({ message, sender }: { message: TMessage; sender: boolean }) => {
  return (
    <div
      class={`border-gray-300 flex flex-col border-b-2 border-grey-200 bg-grey-100 p-2
    ${sender ? 'items-end' : 'items-start'}`}
    >
      <span class="font-bold">@{message.user}</span>
      <span>{message.message}</span>
    </div>
  );
};

export default MessageBubble;
