import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Home from './components/Home';
import LogIn from './LogIn';
import UserProfile from './components/UserProfile';
import Debit from './components/Debit';
import Credit from './components/Credit';
import axios from "axios";

class App extends Component {

  constructor() {
    super();

    this.state = {
      accountBalance: 0,
      currentUser: {
        userName: 'bob_loblaw',
        memberSince: '08/23/99',
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
    }
  }

  componentDidMount() {

    axios.all([
        axios.get('https://moj-api.herokuapp.com/debits'),
        axios.get('https://moj-api.herokuapp.com/credits')
    ])
    .then(axios.spread((debits,credits ) => {
      const debit = debits.data
      const credit = credits.data
      this.setState({ debit: debit, credit: credit});
    })
);

}
  mockLogIn = (logInInfo) => {
    const newUser = {...this.state.currentUser}
    newUser.userName = logInInfo.userName
    this.setState({currentUser: newUser})
  }

  render() {

    const HomeComponent = () => (<Home accountBalance={this.state.accountBalance}/>);
    const LogInComponent = () => (<LogIn user={this.state.currentUser} mockLogIn={this.mockLogIn} {...this.props}/>)
    const UserProfileComponent = () => (
        <UserProfile userName={this.state.currentUser.userName} memberSince={this.state.currentUser.memberSince}  />
    );
    const DebitComponent = () => (
      <Debit userName={this.state.currentUser.userName} memberSince={this.state.currentUser.memberSince}  />
  );
  const CreditComponent = () => (
    <Credit userName={this.state.currentUser.userName} memberSince={this.state.currentUser.memberSince}  />
  );

    return (
        <Router>
          <div>
            <Route exact path="/" render={HomeComponent}/>
            <Route exact path="/userProfile" render={UserProfileComponent}/>
            <Route exact path="/login" render={LogInComponent}/>
            <Route exact path="/debit" render={DebitComponent}/>
            <Route exact path="/credit" render={CreditComponent}/>
          </div>
        </Router>
    );
  }

}

export default App;