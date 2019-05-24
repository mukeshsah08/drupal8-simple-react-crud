//component that contains logic to read one product
import React, { Component } from 'react';
import $ from 'jquery';

//for global configuration
import config from 'react-global-configuration';

class ReadOneProductComponent extends Component {   

    constructor(){
        super();
        this.state = {
            id: 0,
            name: '',
            sku: '',
            description: '',
            price: '',
            category_name: '',
            apiUrl: config.get('apiUrl'),
        }; 
   
    }

    componentDidMount() {
        var productId = this.props.productId;
        const apiUrl = this.state.apiUrl + '/api/product-info?id=' + productId;

        fetch(apiUrl)
          .then(res => res.json())
          .then(
            (result) => {
              
                this.setState({category_name: result.category_name});
                this.setState({id: result.id});
                this.setState({name:result.name});
                this.setState({sku: result.sku});
                this.setState({description: result.description});
                this.setState({price: result.price});
             
            },
            (error) => {
              //this.setState({ error });
            }
          )
        $('.page-header h2').text("View Product");
    }

    render() {
        return (
            <div>
               <div align="right"> 
                   <a href="#"
                        onClick={() => this.props.changeAppMode('read')}
                        className='btn btn-primary m-b-1em'> Back
                    </a>
                </div>

                
                    <table className="table table-bordered table-hover">
                        <tbody>
                            <tr>
                                <td>Name</td>
                                <td>{this.state.name}</td>
                            </tr>
                            <tr>
                                <td>SKU</td>
                                <td>{this.state.sku}</td>
                            </tr>
                            <tr>
                                <td>Description</td>
                                <td>{this.state.description}</td>
                            </tr>
                            <tr>
                                <td>Price (Rs.)</td>
                                <td>Rs.{parseFloat(this.state.price).toFixed(2)}</td>
                            </tr>
                            <tr>
                                <td>Category</td>
                                <td>{this.state.category_name}</td>
                            </tr>
                        </tbody>
                    </table>
                
            </div>
        );
    }
}

export default ReadOneProductComponent;
