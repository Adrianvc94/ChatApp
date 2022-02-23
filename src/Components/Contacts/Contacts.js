import { ListGroup } from "react-bootstrap";
import { useContacts } from "../../Context/ContactsProvider";
import Classes from './Contacts.module.css';

const Contacts = () => {
  const { contacts } = useContacts();

  return (
    <ListGroup variant="flush">
      {contacts.map((contact) => {
        return (
        <ListGroup.Item 
          key={contact.id}
          className={`${Classes.items}`}>
            {contact.name}
        </ListGroup.Item>);
      })}
    </ListGroup>
  );
};

export default Contacts;
