import { useState } from "react";
import { Tab, Nav, Navbar, Button, Modal } from "react-bootstrap";
import Conversations from "../Conversations/Conversations";
import Contacts from "../Contacts/Contacts";
import NewContactModal from "../ContactModal/NewContactModal";
import NewConversationModal from "../ConversationModal/NewConversationModal";
import Classes from './Sidebar.module.css';
import { MdPermContactCalendar } from "react-icons/md";
import { MdQuestionAnswer } from "react-icons/md";



const CONVERSATIONS_KEY = "conversations";
const CONTACTS_KEY = "contacts";

const Sidebar = ({ id }) => {
  const [activeKey, setActiveKey] = useState(CONVERSATIONS_KEY);
  const [modalOpen, setModalOpen] = useState(false);

  const [selected, setSelected] = useState(true);

  const active = () => {
    setSelected(!selected);
  }

  const conversationOpen = activeKey === CONVERSATIONS_KEY;

  const closeModal = () => {
      setModalOpen(false);
  }

  return (
    <div className={`${Classes.sidebar_Container}`}>

      
        <Navbar  collapseOnSelect expand="sm">

          <Tab.Container activeKey={activeKey} onSelect={setActiveKey}>

              <Navbar.Toggle className="navbar-dark" aria-controls="navbarScroll" />
              <Navbar.Collapse id="navbarScroll" className={`${Classes.sidebar_content}`}>  
              
              <Nav navbarScroll variant="tabs" className={`${Classes.sidebar_nav}`}>
                  <Nav.Item className={`${Classes.sidebar_nav__item} ${selected ? Classes.sidebar_nav__item_Active : ''}`} onClick={active}>
                    <Nav.Link eventKey={CONVERSATIONS_KEY}>
                      <MdQuestionAnswer className={`${Classes.sidebar_nav__contactImg} `}/>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item onClick={active} className={`${Classes.sidebar_nav__item} ${!selected ? Classes.sidebar_nav__item_Active : ''}`}>
                    <Nav.Link eventKey={CONTACTS_KEY}>
                      <MdPermContactCalendar className={`${Classes.sidebar_nav__contactImg}`}/>
                    </Nav.Link>
                  </Nav.Item>
              </Nav>

                <Tab.Content className={` ${Classes.tabContent}`}>
                <Tab.Pane eventKey={CONVERSATIONS_KEY}>
                  <Conversations />
                </Tab.Pane>
                <Tab.Pane eventKey={CONTACTS_KEY}>
                  <Contacts />
                </Tab.Pane>
              </Tab.Content>

              <div className={`p-2 ${Classes.yourID}`}>
                  <p>Your Id:</p>  
                  <span className="text-muted">{id}</span>
              </div>

              <Button onClick={() => {setModalOpen(true)}} 
              className={`${Classes.button}`}>
                  New {conversationOpen ? 'Conversation' : 'Contact'}
              </Button>
            
              </Navbar.Collapse>
          </Tab.Container>

        </Navbar>
     

      <Modal show={modalOpen} onHide={closeModal}>
          {conversationOpen ? 
            <NewConversationModal closeModal={closeModal}/> : 
            <NewContactModal closeModal={closeModal}/>
        }
      </Modal>
    </div>
  );
};

export default Sidebar;
