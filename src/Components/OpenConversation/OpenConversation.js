import { useState, useCallback } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { useConversations } from "../../Context/ConversationsProvider";
import Classes from "./OpenConversation.module.css";
import { MdSend } from "react-icons/md";

const OpenConversation = () => {
  const [text, setText] = useState("");
  const setRef = useCallback((node) => {
    if (node) {
      node.scrollIntoView({ smooth: true });
    }
  }, []);

  const { sendMessage, selectedConversation } = useConversations();

  const send = () => {
    if(text !== "" && text !== " "){
      sendMessage(
        selectedConversation.recipients.map((recipient) => recipient.id),
        text
      );
    }
    
    setText("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    send();
  };

  return (
    <div className={`${Classes.main_container}`}>
      <div className={` ${Classes.messages_container}`}>
        <div className="d-flex flex-column align-items-start justify-content-end px-3">
          {selectedConversation.messages.map((message, index) => {
            const lastMessage =
              selectedConversation.messages.length - 1 === index;

            return (
              <div
                ref={lastMessage ? setRef : null}
                key={index}
                className={`my-1 d-flex flex-column ${
                  message.fromMe
                    ? "align-self-end align-items-end"
                    : "align-items-start"
                }`}
              >
                <div
                  className={`rounded px-2 py-1 ${
                    message.fromMe
                      ? `${Classes.fromMe_message} text-white`
                      : `${Classes.fromOther_message} borde`
                  }`}
                  style={{ wordBreak: "break-word" }}
                >
                  <div
                    className={`${Classes.senderName} ${
                      message.fromMe ? "text-end" : ""
                    }`}
                  >
                    {message.fromMe ? "You" : message.senderName}
                  </div>
                  {message.text}
                </div>
                <div
                  className={`text-muted small ${
                    message.fromMe ? "text-end" : ""
                  }`}
                >
                  {message.time}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Form className={`${Classes.form}`} onSubmit={handleSubmit}>
        <Form.Group>
          <InputGroup className={`${Classes.inputGroup}`}>
            <Form.Control
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type here"
              className={`${Classes.inputText}`}
              onKeyPress={(event) => {
                event.key === "Enter" && send();
              }}
            />
            <Button
              type="submit"
              className={`${Classes.buttonSend}`}
              id="button-addon2"
            >
              <MdSend className={`${Classes.sendIcon}`} />
            </Button>
          </InputGroup>
        </Form.Group>
      </Form>
    </div>
  );
};

export default OpenConversation;
