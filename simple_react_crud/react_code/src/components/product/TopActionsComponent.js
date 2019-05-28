//components that contain functionalities that appear on top of the product table: create product
import React, { Component } from 'react';

class TopActionsComponent extends Component {

    render() {
        return (
            <div align="right">
                <a href="#"
                    onClick={() => this.props.changeAppMode('create')}
                    className='btn btn-primary m-b-1em'> Add New
                </a>
            </div>
        );
    }
}

export default TopActionsComponent;