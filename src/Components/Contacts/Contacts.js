import { ListGroup,Modal, Button, Form } from "react-bootstrap";
import { useContacts } from "../../Context/ContactsProvider";
import Classes from "./Contacts.module.css";
import { useState } from "react";
import { MdDeleteOutline } from "react-icons/md";

const Contacts = () => {
  const { contacts } = useContacts();

  const [modalOpen, setModalOpen] = useState(false);
  const [indexToDelete, setIndexToDelete] = useState(null);

  const deleteConversation = () => {
    if (indexToDelete != null) {
      let jsonValue = localStorage.getItem("chat-app-contacts");

      jsonValue = JSON.parse(jsonValue);

      console.log(jsonValue);

      jsonValue.splice(indexToDelete, 1);

      console.log(jsonValue);

      localStorage.setItem("chat-app-contacts", JSON.stringify(jsonValue));
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
    <ListGroup variant="flush">
      {contacts.map((contact, index) => {
        return (
          <ListGroup.Item key={contact.id} className={`${Classes.items}`}>
            {contact.name}

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
                Are you sure you want to delete this contact?
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
  );
};

export default Contacts;
