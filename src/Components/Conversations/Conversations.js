import { ListGroup } from "react-bootstrap";
import { useConversations } from "../../Context/ConversationsProvider";
import Classes from './Conversations.module.css';

const Conversations = () => {
  const { conversations, selectConversationIndex } =
    useConversations();

  return (
    <ListGroup  variant="flush">
      {conversations.map((conversation, index) => {
        return (
          <ListGroup.Item
            key={index}
            action
            active={conversation.selected}
            onClick={() => selectConversationIndex(index)}
            className={`${Classes.items} ${conversation.selected ? Classes.itemActive : ""}`}
          >
            {conversation.recipients
              .map((recipient) => recipient.name)
              .join(", ")}


            <div>
              {conversation.messages[conversation.messages.length - 1]
                ? `${
                    conversation.messages[conversation.messages.length - 1]
                      .fromMe
                      ? "You"
                      : conversation.messages[conversation.messages.length - 1]
                          .senderName
                  }: ${
                    conversation.messages[conversation.messages.length - 1].text.length > 10 ? 
                    conversation.messages[conversation.messages.length - 1].text.substring(0,10) : conversation.messages[conversation.messages.length - 1].text
                  } `
                : ""}
            </div>

          </ListGroup.Item>
        );
      })}
    </ListGroup>
  );
};

export default Conversations;
