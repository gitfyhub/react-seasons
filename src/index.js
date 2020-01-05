import React from "react";
import ReactDOM from "react-dom";
import SeasonDisplay from "./SeasonDisplay";

// // Functional Component
// const App = () => {
//   window.navigator.geolocation.getCurrentPosition(
//     position => console.log(position),
//     err => console.log(err)
//   );
//   return <div>Latitude: </div>;
// };

class App extends React.Component {
  // constructor(props) {
  //   super(props);
  //   // This is the only time we do direct assignment to this.state
  //   // this.state = { lat: null, lon: null };
  // }

  state = { lat: null, lon: null };

  componentDidMount() {
    console.log("component did mount - rendered to the screen");

    // we did not do this at it can not be set this way!!!
    // this.state.lat = position.coords.latitude;
    window.navigator.geolocation.getCurrentPosition(
      position =>
        this.setState({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
          errorMessage: ""
        }),
      err => this.setState({ errorMessage: err.message })
    );
  }

  componentWillUnmount() {
    console.log("component will unmount");
  }

  componentDidUpdate() {
    console.log("my component just updated - it re-rendered");
  }

  render() {
    if (this.state.errorMessage && !this.state.lat) {
      return <div>Error: {this.state.errorMessage}</div>;
    }

    if (!this.state.errorMessage && this.state.lat) {
      // return (
      //   <div>
      //     <p>Latitude: {this.state.lat}</p>
      //     <p>Longitude: {this.state.lon}</p>
      //   </div>
      // );
      return <SeasonDisplay lat={this.state.lat} />;
    }

    return <div>Loading!</div>;
  }
}

ReactDOM.render(<App />, document.querySelector("#root"));
