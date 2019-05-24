import React, { Component } from 'react';
import $ from 'jquery'; 

//for global configuration
import config from 'react-global-configuration';

class DeleteProductComponent extends Component {  

    constructor(){
        super();
        this.state = {
           name: '',
           sku: '',
           apiUrl: config.get('apiUrl'),
        }; 
        this.onDelete = this.onDelete.bind(this);    
    }

    componentDidMount() {

        var productId = this.props.productId;

        //read one product data  
        const apiUrlForProduct = this.state.apiUrl +'/api/product-info?id=' + productId;

        fetch(apiUrlForProduct)
          .then(res => res.json())
          .then(
            (result) => {              
                this.setState({name: result.name});
                this.setState({sku: result.sku});              
            },
            (error) => {
              this.setState({ error });
            }
        ) 
        $('.page-header h2').text('Delete Product');
    }

    onDelete(e) {
        //product to delete
        var productId = this.props.productId;

        const apiUrl = 'http://local.drupal8-new.com/api/delete-product';
        const formData = new FormData();
        formData.append('id', productId);

        const options = {
          method: 'POST',
          body: formData
        }

        fetch(apiUrl, options)
          .then(res => res.json())
          .then(
            (result) => {
              this.props.changeAppMode('read');
            },
            (error) => {
              this.setState({ successUpdate: 'Unable to save' });
            }
          )

        e.preventDefault();
    }

    render() {
        console.log("render");
        return (
            <div className="row">
                <div className="col-md-3"></div>
                <div className="col-md-6">
                    <div className="panel panel-default">
                        <div className="panel-body text-center">
                            Are You Sure Want to Delete {this.state.name}?
                        </div>
                        <div className="panel-footer clearfix">
                            <div className="text-center">
                                <button onClick={this.onDelete} className="btn btn-danger m-r-1em">Yes</button>
                                <button onClick={() => this.props.changeAppMode('read')} className="btn btn-primary">No</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-3"></div>
            </div>
        );
    }
}

export default DeleteProductComponent;