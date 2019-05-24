import React, { Component } from 'react';
import $ from 'jquery'; 

//for global configuration
import config from 'react-global-configuration';

//for accessing bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/custom.css';

//fort accessing custom component
import TopActionsComponent from './TopActionsComponent';
import ProductsTable from './ProductsTable';

class ReadProductsComponent extends Component {

    constructor(){
        super();
        this.state = {
           products: [],
           apiUrl: config.get('apiUrl'),
        };           
    }

    //on mount fetch all products and store them as this components state

    componentDidMount() {
    const apiUrl = this.state.apiUrl +'/api/product-list';

    fetch(apiUrl)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            products: result.records
          });
        },
        (error) => {
          //this.setState({ error });
        }
      )
   }
  

    //render components on page
    render() {
        //list produtcs
        var filteredProducts = this.state.products;
        $('.page-header h2').text("Product List");

        return (
            <div className='overflow-hidden'>
                <TopActionsComponent changeAppMode = {this.props.changeAppMode} />

                <ProductsTable
                    products={filteredProducts}
                    changeAppMode={this.props.changeAppMode} />
            </div>
        );

    }
} 

export default ReadProductsComponent;

