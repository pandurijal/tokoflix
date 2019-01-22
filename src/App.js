import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Home from "./components/Home";
import Movie from "./components/Movie";
import NavHeader from "./components/Navbar";

class App extends Component {
  state = {
    balance: 100000,
    bought: []
  };
  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <NavHeader balance={this.state.balance} />
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/page/:pg" component={Home} />
            <Route
              path="/movie/:id"
              render={props => (
                <Movie
                  {...props}
                  balance={this.state.balance}
                  bought={this.state.bought}
                  onBuying={this.handleBuying}
                />
              )}
            />
          </Switch>
        </React.Fragment>
      </BrowserRouter>
    );
  }
  handleBuying = (id, price) => {
    let balance = this.state.balance;
    let boughtArr = [];
    boughtArr.id = id;
    let bought = [...this.state.bought, boughtArr];
    if (balance - price < 0) {
      return null;
    } else {
      balance = balance - price;
    }
    this.setState({ balance, bought });
  };
}

export default App;
