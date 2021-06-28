import React from 'react';
import Button from 'react-bootstrap/Button';


class TodoForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = { item: {} };
  }
  formHandler = e => {
    this.setState({ item: {...this.state.item, [e.target.name]: e.target.value } });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    e.target.reset();
    this.props.handleSubmit(this.state.item);
    const item = {};
    this.setState({item});
  };

  render() {
    return (
      <>
        <h3>Add Item</h3>
        <form onSubmit={this.handleSubmit}>
          <label>
            <span>To Do Item</span>
            <input
              name="text"
              placeholder="Add To Do List Item"
              onChange={this.formHandler}
            />
          </label>
          <label>
            <span>Difficulty Rating</span>
            <input defaultValue="1" type="range" min="1" max="5" name="difficulty" onChange={this.formHandler} />
          </label>
          <label>
            <span>Assigned To</span>
            <input type="text" name="assignee" placeholder="Assigned To" onChange={this.formHandler} />
          </label>
          <Button variant="success" type="submit">Add Item</Button>
        </form>
      </>
    );
  }
}

export default TodoForm;
