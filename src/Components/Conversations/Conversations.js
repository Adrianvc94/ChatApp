import { ListGroup, Modal, Button, Form } from "react-bootstrap";
import { useConversations } from "../../Context/ConversationsProvider";
import Classes from "./Conversations.module.css";
import { MdDeleteOutline } from "react-icons/md";
import { useState } from "react";

const Conversations = () => {
  const { conversations, selectConversationIndex } = useConversations();
  const [modalOpen, setModalOpen] = useState(false);
  const [indexToDelete, setIndexToDelete] = useState(null);

  const deleteConversation = () => {
    if (indexToDelete != null) {
      let jsonValue = localStorage.getItem("chat-app-conversations");

      jsonValue = JSON.parse(jsonValue);

      console.log(jsonValue);

      jsonValue.splice(indexToDelete, 1);

      console.log(jsonValue);

      localStorage.setItem("chat-app-conversations", JSON.stringify(jsonValue));
    }

    setIndexToDelete(null);
    setModalOpen(false);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleSubmit = () => {
    deleteConversation();
    setModalOpen(false);
  };

  return (
    <>
      <ListGroup variant="flush">
        {conversations.map((conversation, index) => {
          return (
            <ListGroup.Item
              key={index}
              action
              active={conversation.selected}
              onClick={() => selectConversationIndex(index)}
              className={`${Classes.items} ${
                conversation.selected ? Classes.itemActive : ""
              }`}
            >
              <div>
                {conversation.recipients
                  .map((recipient) => recipient.name)
                  .join(", ")}

                <div>
                  {conversation.messages[conversation.messages.length - 1]
                    ? `${
                        conversation.messages[conversation.messages.length - 1]
                          .fromMe
                          ? "You"
                          : conversation.messages[
                              conversation.messages.length - 1
                            ].senderName
                      }: ${
                        conversation.messages[conversation.messages.length - 1]
                          .text.length > 10
                          ? conversation.messages[
                              conversation.messages.length - 1
                            ].text.substring(0, 10)
                          : conversation.messages[
                              conversation.messages.length - 1
                            ].text
                      } `
                    : ""}
                </div>
              </div>

              <MdDeleteOutline
                onClick={() => {
                  setModalOpen(true);
                  setIndexToDelete(index);
                }}
                className={`${Classes.deleteImg} `}
              />
              <Modal show={modalOpen} onHide={closeModal}>
                <Modal.Header
                  className={`${Classes.title}`}
                  closeButton={closeModal}
                >
                  Are you sure you want to delete this conversation?
                </Modal.Header>
                <Modal.Body>
                  <Form onSubmit={handleSubmit}>
                    <Button className={`${Classes.btnSubmit}`} type="submit">
                      Yes
                    </Button>
                    <Button
                      className={`${Classes.btnSubmit}`}
                      onClick={() => {
                        setModalOpen(false);
                      }}
                      type="button"
                    >
                      No
                    </Button>
                  </Form>
                </Modal.Body>
              </Modal>
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    </>
  );
};

export default Conversations;
