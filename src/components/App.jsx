import React from "react";
import { nanoid } from 'nanoid'


import ContactForm from "./ContactForm";
import ContactList from "./ContactList";
import Filter from './Filter';


class App extends React.Component{
  state = {
  contacts:  [
    {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
    {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
    {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
    {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
  ],
  filter: ''
}
  formSubmit = data => {
    data.id = nanoid()
    if (this.state.contacts.some(({ name }) => name === data.name)) {
      alert(`${data.name} is already in contacts`)
      return
    }
    this.setState({ contacts: [...this.state.contacts, data] })
    
  }

  deletContact = id => {
    this.setState(prevState=>({contacts: prevState.contacts.filter(contact=>contact.id!==id)}))
  }
  changeFilter = e => {

    this.setState({ filter: e.currentTarget.value })
    
  }
  render() { 
    const normilizeFilter = this.state.filter.toLowerCase()
    const filterContacts = this.state.contacts.filter(contact=>contact.name.toLowerCase().includes(normilizeFilter))
    const {filter}=this.state
    return (<div className="section">
      <h1>Phonebook</h1>
      <ContactForm onSubmit={this.formSubmit} />

      <h2>Contacts</h2>
      <Filter value={filter} onChange={this.changeFilter} />
      <ContactList contacts={filterContacts} deletContact={this.deletContact} />
      
    </div>)
  }
}

export {App} 
  
