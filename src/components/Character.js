import React, { Component } from 'react';
import axios from 'axios';
import '../App.css'


class Character extends Component {
    constructor(props) {
        super(props);
        this.state = {
            characterUrl: this.props.characterUrl,
            data: null
        }
    }

    componentDidMount = () => {
        axios.get(this.state.characterUrl)
        .then((response) => {
            this.setState({data: response.data})
        })
    }

    render = () => {
        return (
            <h3>{this.state.data?.name}</h3>  
        )
    }
}

export default Character;