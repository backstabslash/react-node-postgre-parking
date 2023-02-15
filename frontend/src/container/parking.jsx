import React, { Component } from "react";
import axios from "axios";
import './parking.css';
import Header from '../components/header/header'
import Main from '../components/main/main'

class Parking extends Component {
    state = {
        data: []
    };
    componentDidMount() {
        axios.get('http://localhost:3001/api/users').then((res) => {
            this.setState({ data: res.data.rows });
        })
    }
    render() {
        const { data } = this.state;
        return (
            <div className="parkingWrapper">
                <Header />
                <Main data={data} />
            </div>
        );
    };
}

export default Parking;