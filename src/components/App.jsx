import { Component } from 'react';
import { LogicForm } from './LogicForm/LogicForm';
import { nanoid } from 'nanoid';
import ContactsList from './ContactsList/ContactsList';
import { Filter } from './Filter/Filter';
import './App.css';

export class App extends Component {
  state = {
    contacts: [],

    filter: '',
  };

  componentDidMount() {
    console.log('componentDidMount');
    const savedContacts = localStorage.getItem('contacts');
    // const initialContacts = localStorage.getItem('contacts');
    console.log(savedContacts);
    if (savedContacts !== null) {
      this.setState({ contacts: JSON.parse(savedContacts) });
    } else {
      // this.setState({ contacts: initialContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('componentDidUpdate');
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
    console.log('prevState', prevState);
    console.log('this.state', this.stae);
  }

  addContact = ({ name, number }) => {
    if (
      this.state.contacts.some(
        contact => name.toLowerCase() === contact.name.toLowerCase()
      )
    ) {
      alert(`${name} is already in contacts`);
      return;
    }
    const contact = { id: nanoid(), name, number };
    this.setState(prevState => ({
      contacts: [...prevState.contacts, contact],
    }));
  };

  deleteContacts = contactsId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(
        contacts => contacts.id !== contactsId
      ),
    }));
  };

  getFilteredContacts = () => {
    const { filter, contacts } = this.state;

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  changleFilterValue = e => this.setState({ filter: e.target.value });

  render() {
    console.log('render');
    const { filter, contacts } = this.state;
    const filteredContacts = this.getFilteredContacts();
    return (
      <div className="App__container">
        <h1>Phonebook</h1>
        <LogicForm addContact={this.addContact} />
        <h2>Contacts</h2>
        <h3>Find contacts by name</h3>
        {contacts.length > 0 ? (
          <>
            <Filter onChange={this.changleFilterValue} value={filter} />

            <ContactsList
              contacts={filteredContacts}
              onDeleteContacts={this.deleteContacts}
            />
          </>
        ) : (
          <p>No contacts</p>
        )}
      </div>
    );
  }
}
