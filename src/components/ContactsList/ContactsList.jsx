import React from 'react';
import './ContactsList.css';
import PropTypes from 'prop-types';

const ContactsList = ({ contacts, onDeleteContacts }) => {
  return (
    <ul className="ContactsList__list">
      {contacts.map(({ id, name, number }) => (
        <li key={id} className="ContactsList__item">
          <p className="ContactsList__text">
            {name}: {number}
          </p>
          <button onClick={() => onDeleteContacts(id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default ContactsList;

ContactsList.propTypes = {
  onDeleteContacts: PropTypes.func.isRequired,
  contacts: PropTypes.array.isRequired,
};
