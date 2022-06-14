import React from "react";
import { nanoid } from 'nanoid'


import ContactForm from "./ContactForm";
import ContactList from "./ContactList";
import Filter from './Filter';


class App extends React.Component{
  state = {
  contacts:  [],
  filter: ''
  }
  componentDidMount() {
    const contacts = JSON.parse(localStorage.getItem('contacts'))
   
    if(contacts){
    this.setState({
      contacts,
    })}
  }


  componentDidUpdate(prevProps,prevState) {
    if (prevState.contacts !== this.state.contacts){
    localStorage.setItem('contacts', JSON.stringify(this.state.contacts))}
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
  
