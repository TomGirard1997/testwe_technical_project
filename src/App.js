import './App.css';
import React, { Component } from 'react';
import axios from 'axios';
import ReactFullpage from '@fullpage/react-fullpage';
import FullPageItem from './components/FullPageItem';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      booksData: null
    }
  }

  componentDidMount = () => {
    axios.get("https://anapioficeandfire.com/api/books")
    .then((response) => {
      console.log(response)
      this.setState({ booksData: response.data})
    })
  }

  render() {
    return (
      <div>
        <div style={{ display: 'flex', zIndex: 1000, position: 'absolute', top: '0%', left: '50%', transform: 'translate(-50%, 0%)'}}>
          <h1 style={{textAlign:'center', fontFamily: 'Seagram', fontSize: 48, textShadow: '1px 1px 2px black'}}>GoT Wiki</h1>
        </div>
        {this.state.booksData &&
        <ReactFullpage
          licenseKey={"Test"}
          //fullpage options
          scrollingSpeed = {1000} /* Options here */
          
          render={({ state, fullpageApi }) => {
            console.log("render prop change", state, fullpageApi); // eslint-disable-line no-console

            return (
              <div>
                
                <ReactFullpage.Wrapper>
                { this.state.booksData.map((e, index) => {
                  console.log("e: ",e)
                  return(
                  <FullPageItem data={e} orientationLeft={index % 2 === 0 ? true : false}></FullPageItem>
                  )
                })}
                </ReactFullpage.Wrapper>
              </div>
            );
          }}
        />
        }
      </div>

    );
  }
  
}

export default App;
