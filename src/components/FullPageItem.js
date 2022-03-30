import React, { Component } from 'react';
import axios from 'axios';
import '../App.css'
import Character from './Character'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function timeConverter(UNIX_timestamp){
    console.log(UNIX_timestamp)
    var a = new Date(UNIX_timestamp);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var time = date + ' ' + month + ' ' + year + ' ';
    return time;
  }

class FullPageItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data,
            orientationLeft: this.props.orientationLeft,
            cover: null,
            sectionColor: getRandomColor(),
            date: timeConverter(this.props.data.released)
        }
    }

    componentDidMount = () => {
        axios.get('https://www.googleapis.com/books/v1/volumes?q=isbn:'+this.state.data.isbn.slice(4))
        .then((response) => {
            this.setState({
                cover: response?.data?.items[0].volumeInfo.imageLinks.thumbnail
            })
        })
    }

    render = () => {
        return (
            <div className="section" style={{backgroundColor: this.state.sectionColor}}>
                <div style={{display: 'flex', flexDirection: this.state.orientationLeft? 'row' : 'row-reverse', justifyContent: 'space-evenly', alignItems: 'center'}}>                
                    <div style={{justifyContent: 'center'}}>
                        <img src={this.state.cover} style={{height: '50vh'}}></img>
                    </div>
                    <div style={{padding: 12, width: "60%", backgroundColor: 'whitesmoke', opacity: 0.8, textAlign: 'center'}}>
                        <h1 style={{ fontFamily: 'Seagram', fontSize: '28'}}>{this.state.data.name}</h1>
                        <h2 style={{ fontSize: 'medium'}}>Written by {this.state.data.authors}</h2>
                        <h2 style={{ fontSize: 'medium'}}>Released on {this.state.date} by {this.state.data.publisher}</h2>
                        <h2 style={{ fontSize: 'medium'}}>This book counts {this.state.data.numberOfPages} pages</h2>
                        <Popup modal trigger={<button style={{ marginTop: 12, fontFamily: 'Seagram', justifyContent:'center', fontSize: 22, color: this.state.sectionColor, paddingTop: 10}}>See Characters</button>}>
                            <div style={{height: 500, overflowY: 'scroll'}}>
                                {this.state.data.characters.map((characterUrl) => {
                                    return(
                                    <Character characterUrl={characterUrl}></Character>
                                    )
                                })}
                            </div>
                        </Popup>
                    </div>
                </div>
            </div>
        )
    }
}

export default FullPageItem;