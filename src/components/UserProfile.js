import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from "axios";

class UserProfile extends Component {
  state = { 

    totald: [], 
    debit: [{
      id: "",
      description: "",
      amount: 0,
      date: ""
    }],
    credit: [{
      id: "",
      description: "",
      amount: 0,
      date: ""
    }]
  }

    componentDidMount() {
        axios.all([
            axios.get('https://moj-api.herokuapp.com/debits'),
            axios.get('https://moj-api.herokuapp.com/credits')
          ])
          .then(axios.spread((debits, credits) => {
            const data =debits.data
            const debit = data
            const credit = credits.data
            this.setState({ debit, credit});
          }));
      }

  render() {
    return (
        <div>
          <h1>User Profile</h1>
          
          <div>Username: {this.props.userName}</div>
          <div>Member Since: {this.props.memberSince}</div>
          <Link to="/">home</Link>
          <br></br>
          <Link to="/login">Sign In</Link>
          <br></br>
          <Link to="/debit">debit</Link>
          <br></br>
          <Link to="/credit">credit</Link>
        </div>
    );
  }
}

export default UserProfile;