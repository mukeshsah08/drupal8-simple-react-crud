import React, { Component } from 'react';
import $ from 'jquery'; 

//for accessing global configuration
import config from 'react-global-configuration';


class UpdateProductComponent extends Component {

    constructor(){
        super();
        this.state = {
            categories: [],
            selectedCategoryId: 0,
            id: 0,
            name: '',
            sku: '',
            description: '',
            price: 0,
            successUpdate: null,

            errorCategory: '',
            errorName: '',
            errorSKU: '',
            errorDescription: '',
            errorPrice: '',
            apiUrl: config.get('apiUrl'),
        }; 
        this.onCategoryChange = this.onCategoryChange.bind(this); 
        this.onNameChange = this.onNameChange.bind(this); 
        this.onSKUChange = this.onSKUChange.bind(this); 
        this.onDescriptionChange = this.onDescriptionChange.bind(this); 
        this.onPriceChange = this.onPriceChange.bind(this); 
        this.onSave = this.onSave.bind(this); 
        this.validateForm = this.validateForm.bind(this); 
        this.onBlurCheck = this.onBlurCheck.bind(this); 
   
    }

    componentDidMount() {
        // to reset message of list page
        this.props.changeMessage('');
        
        var productId = this.props.productId;

        const apiUrl = this.state.apiUrl +'/api/product-category-list';

        fetch(apiUrl)
          .then(res => res.json())
          .then(
            (result) => {
              this.setState({
                categories: result.records
              });
            },
            (error) => {
              this.setState({ error });
            }
          )
        //read one product data  
        const apiUrlForProduct = this.state.apiUrl +'/api/product-info?id=' + productId;

        fetch(apiUrlForProduct)
          .then(res => res.json())
          .then(
            (result) => {
              
                this.setState({selectedCategoryId: result.category_id});
                this.setState({name: result.name});
                this.setState({sku: result.sku});
                this.setState({description: result.description});
                this.setState({price: result.price});
                this.setState({id: result.id});
              
            },
            (error) => {
              this.setState({ error });
            }
          ) 

        $('.page-header h2').text('Edit Product');
    }

   //handle category change
    onCategoryChange(e) {
        this.setState({selectedCategoryId: e.target.value});
    }

    //handle name change
    onNameChange(e) {
        this.setState({name: e.target.value});
    }

    //handle sku change
    onSKUChange(e) {
        this.setState({sku: e.target.value});
    }

    //handle description change
    onDescriptionChange(e) {
        this.setState({description: e.target.value});
    }

    //handle price change
    onPriceChange(e) {
        this.setState({price: e.target.value});
    }

    onBlurCheck(e) {
        if(!this.validateForm()) {
           e.preventDefault();
        }  
    }

    validateForm() {
        var formError = false;
        if(this.state.selectedCategoryId == -1) {
            this.setState({errorCategory: "Please select category!"});
            formError = true;
        } else {
            this.setState({errorCategory: ""});
        }

        if(this.state.name == '' ) {
            this.setState({errorName: "Please enter name!"});
            formError = true;
        } else {
            this.setState({errorName: ""});
        }

        if(this.state.sku == '' ) {
            this.setState({errorSKU: "Please enter SKU!"});
            formError = true;
        } else {
            this.setState({errorSKU: ""});
        }

        if(this.state.price == '' ) {
            this.setState({errorPrice: "Please enter Price!"});
            formError = true;
        } else {
            this.setState({errorPrice: ""});
        }

        if(this.state.description == '' ) {
            this.setState({errorDescription: "Please enter Description!"});
            formError = true;
        } else {
            this.setState({errorDescription: ""});
        }


        if(formError) {
            return false;
        } else {
            return true;
        }       

    }

    //handle save changes button clicked
    onSave(e) {

        if(this.validateForm()) {

            //data in the form
            const apiUrl = this.state.apiUrl +'/api/update-product';
            const formData = new FormData();
            formData.append('id', this.state.id);
            formData.append('name', this.state.name);
            formData.append('sku', this.state.sku);
            formData.append('description', this.state.description);
            formData.append('price', this.state.price);
            formData.append('category_id', this.state.selectedCategoryId);  


            const options = {
              method: 'POST',
              body: formData
            }

            fetch(apiUrl, options)
              .then(res => res.json())
              .then(
                (result) => {
                  
                    this.setState({successUpdate: result['message']});
                    this.props.changeMessage(result['message']);
                    this.props.changeAppMode('read');
                  
                },
                (error) => {
                  this.setState({ successUpdate: 'Unable to save' });
                }
              )

            e.preventDefault();
        } else {
            e.preventDefault(); 
        }
    }

    render() {
        var categoriesOptions = this.state.categories.map(function(category) {
            return (
                <option key={category.id} value={category.id}>{category.name}</option>
            );
        });

        return (
            <div>
                {
                    this.state.successUpdate == "Product was updated." ?
                    <div className='alert alert-success'>
                        Product has been updated successfully.
                    </div>
                    : null
                }

                {
                    this.state.successUpdate == "Unable to update product." ?
                    <div className='alert alert-danger'>
                        Unable to update product. Please try again.
                    </div>
                    : null
                }
                <div align="right">
                    <a href="#"
                        onClick={() => this.props.changeAppMode('read')}
                        className='btn btn-primary m-b-1em'>
                        Back
                    </a>
                </div>

                <form onSubmit={this.onSave}>
                    <table className="table table-bordered table-hover">
                        <tbody>
                            <tr>
                                <td>Name</td>
                                <td>
                                    <input
                                        type='text'
                                        className='form-control'
                                        //required
                                        value={this.state.name}
                                        onBlur={this.onBlurCheck}
                                        onChange={this.onNameChange} />
                                    <span className="form-error">{this.state.errorName}</span>
                                </td>
                            </tr>

                            <tr>
                                <td>SKU</td>
                                <td>
                                    <input
                                        type='text'
                                        className='form-control'
                                        //required
                                        value={this.state.sku}
                                        onBlur={this.onBlurCheck}
                                        onChange={this.onSKUChange} />
                                    <span className="form-error">{this.state.errorSKU}</span>
                                </td>
                            </tr>

                            <tr>
                                <td>Description</td>
                                <td>
                                    <textarea
                                        className='form-control'
                                        //required
                                        value={this.state.description}
                                        onBlur={this.onBlurCheck}
                                        onChange={this.onDescriptionChange}></textarea>
                                    <span className="form-error">{this.state.errorDescription}</span>    
                                </td>
                            </tr>

                            <tr>
                                <td>Price ($)</td>
                                <td>
                                    <input
                                        type='number'
                                        step='0.01'
                                        className='form-control'
                                        value={this.state.price}
                                        // required
                                        onBlur={this.onBlurCheck}
                                        onChange={this.onPriceChange} />
                                    <span className="form-error">{this.state.errorPrice}</span>        

                                </td>
                            </tr>

                            <tr>
                                <td>Category</td>
                                <td>
                                    <select
                                         onBlur={this.onBlurCheck}
                                        onChange={this.onCategoryChange}
                                        className='form-control'
                                        value={this.state.selectedCategoryId}>                                       
                                        <option value="-1">Select Category</option>
                                        {categoriesOptions}
                                    </select>
                                    <span className="form-error">{this.state.errorCategory}</span> 
                                </td>
                            </tr>

                            <tr>
                                <td></td>
                                <td>
                                    <button
                                        className="btn btn-primary"
                                        onClick={this.onSave}>Save Changes</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </div>
        );
    }
}

export default UpdateProductComponent;