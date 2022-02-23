import { Button, Form, Modal } from "react-bootstrap";
import { useState } from "react";
import { useContacts } from "../../Context/ContactsProvider";
import { useConversations } from "../../Context/ConversationsProvider";
import Classes from './NewConversationModal.module.css';

const NewConversationModal = ({ closeModal }) => {
  const [selectedContactsIds, setSelectedContactsIds] = useState([]);


  const {createConversation} = useConversations();


  const { contacts } = useContacts();

  const handleSubmit = (e) => {
    e.preventDefault();

    if(selectedContactsIds.length > 0){
      createConversation(selectedContactsIds);
      closeModal();
    }

    document.getElementById("alert").style.visibility = "visible";
  };

  const handleCheackboxChange = (contactId) => {

    document.getElementById("alert").style.visibility = "hidden";

    setSelectedContactsIds((prevSelectedContactsIds) => {
      if (prevSelectedContactsIds.includes(contactId)) {
        return prevSelectedContactsIds.filter((prevId) => {
          return contactId !== prevId;
        });
      } else {
        return [...prevSelectedContactsIds, contactId];
      }
    });

      
  };

  return (
    <>
      <Modal.Header className={`${Classes.title}`} closeButton={closeModal}>Create Contact</Modal.Header>
      <Modal.Body>
        <Form className={`${Classes.checkBoxForm}`} onSubmit={handleSubmit}>
          {contacts.map((contact) => (
            <Form.Group controlId={contact.id} key={contact.id}>
              <Form.Check
                type="checkbox"
                value={selectedContactsIds.includes(contact.id)}
                label={contact.name}
                onChange={() => handleCheackboxChange(contact.id)}
              />
            </Form.Group>
          ))}
          <Button type="Submit">Create</Button>
          <span id="alert" style={{visibility: "hidden"}}>You need to select at least one contact</span>
        </Form>
      </Modal.Body>
    </>
  );
};

export default NewConversationModal;
