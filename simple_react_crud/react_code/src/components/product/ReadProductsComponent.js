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
import PaginationComponent from './PaginationComponent';

class ReadProductsComponent extends Component {

    constructor(){
        super();
        this.state = {
           products: [],
           totalProducts:0,
           currentPage:1,
           limit:5,
           apiUrl: config.get('apiUrl'),
           isLoading: true,

        };  

        this.changePage = this.changePage.bind(this);      
    }

    //on mount fetch all products and store them as this components state

    componentDidMount(event) {

    this.setState({isLoading:true});
      
    const apiUrl = this.state.apiUrl +'/api/product-list?page='+this.state.currentPage+'&limit='+this.state.limit;

    fetch(apiUrl)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            products: result.records,
            totalProducts: result.total,
            isLoading:false
          });
          console.log(this.state.totalProducts);
        },
        (error) => {
          isLoading:false;
        }
      )

      
   }

   changePage(page) {

    this.setState({isLoading:true});
    this.setState({currentPage:page});
      
    const apiUrl = this.state.apiUrl +'/api/product-list?page='+page+'&limit='+this.state.limit;

    fetch(apiUrl)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            products: result.records,
            totalProducts: result.total,
            isLoading:false
          });
          console.log(this.state.totalProducts);
        },
        (error) => {
          isLoading:false;
        }
      )
   }
  

    //render components on page
    render() {
        //list produtcs
        var filteredProducts = this.state.products;
        $('.page-header h2').text("Product List");

        if(!this.state.isLoading) {
          if(filteredProducts.length) {

          return (
              <div className='overflow-hidden'>

                  <TopActionsComponent changeAppMode = {this.props.changeAppMode} />

                  <ProductsTable
                      products={filteredProducts}
                      changeAppMode={this.props.changeAppMode} />

                  <div>&nbsp;</div>    

                  <div align="center" className="btn-wrapper"><PaginationComponent changeAppMode = {this.props.changeAppMode} changePage = {this.changePage} currentPage = {this.state.currentPage} totalProducts = {this.state.totalProducts} limit = {this.state.limit}  /></div>    
              </div>

          );
         } else {
            return (
              <div className='overflow-hidden'>
                  <TopActionsComponent changeAppMode = {this.props.changeAppMode} />

                  <div className="alert alert-danger">No Products Found.</div>
              </div>
            );  
         }
        } else {
            return (
              <div className='overflow-hidden'>
                  <TopActionsComponent changeAppMode = {this.props.changeAppMode} />

                  <div className="ajax-loader"></div>
              </div>
          );
        }

    }
} 

export default ReadProductsComponent;

