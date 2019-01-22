import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Movie from "./components/Movie";

class App extends Component {
  state = {
    balance: 100000,
    bought: []
  };
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar balance={this.state.balance} />
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
        </div>
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
