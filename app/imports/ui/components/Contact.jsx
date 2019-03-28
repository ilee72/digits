import React from 'react';
import { Card, Image, Feed, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import Note from '/imports/ui/components/Note';
import AddNote from '/imports/ui/components/AddNote';
import { Contacts } from '/imports/api/contact/contact';
/** Need this for bert alert **/
import { Bert } from 'meteor/themeteorchef:bert';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Contact extends React.Component {
/**Add a constructor that invokes super(props), then binds THIS in the onClick method. **/
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }
/** Implement onClick. Should remove and call on Contacts.remove with the _id for the current item and then passes this.deleteCallback **/
  onClick() {
    if (confirm("Are you sure?")) {
      Contacts.remove(this.props.contact._id, this.deleteCallback);
    }
  }

  /** Implement deleteCallback which says success or failed on bert alert **/
  deleteCallback(error) {
    if (error) {
      Bert.alert({ type: 'danger', message: `Delete has failed: ${error.message}` });
    } else {
      Bert.alert({ type: 'success', message: 'Delete has succeeded' });
    }
  }

  render() {
    return (
        <Card centered>
          <Card.Content>
            <Image floated='right' size='mini' src={this.props.contact.image} />
            <Card.Header>{this.props.contact.firstName} {this.props.contact.lastName}</Card.Header>
            <Card.Meta>{this.props.contact.address}</Card.Meta>
            <Card.Description>
              {this.props.contact.description} <strong>best friends</strong>
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <Link to={`/edit/${this.props.contact._id}`}>Edit</Link>
          </Card.Content>
          <Card.Content extra>
            <Feed>
              {this.props.notes.map((note, index) => <Note key={index} note={note}/>)}
            </Feed>
          </Card.Content>
          <Card.Content extra>
            <AddNote owner={this.props.contact.owner} contactId={this.props.contact._id}/>
          </Card.Content>
          <Card.Content extra>
            <Button onClick={this.onClick}>Delete</Button>
          </Card.Content>
        </Card>
    );
  }
}

/** Require a document to be passed to this component. */
Contact.propTypes = {
  contact: PropTypes.object.isRequired,
  notes: PropTypes.array.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(Contact);
