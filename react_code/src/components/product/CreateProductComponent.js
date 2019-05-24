
import React, { Component } from 'react';
import $ from 'jquery'; 

//for accessing global configuration
import config from 'react-global-configuration';


class CreateProductComponent extends Component {
    
    constructor(){
        super();
        this.state = {
            categories: [],
            selectedCategoryId: -1,
            name: '',
            sku: '',
            description: '',
            price: '',
            successCreation: null,

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
   	
    }

    //on mount get all categories and store them in it's component state
    componentDidMount() {

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
          $('.page-header h2').text("Create Product");
    } 


    //handle category change
    onCategoryChange(e) {
        this.setState({selectedCategoryId: e.target.value});
        //this.validateForm();
    }

    //handle name change
    onNameChange(e) {
        this.setState({name: e.target.value});
       // this.validateForm();
    }

    //handle sku change
    onSKUChange(e) {
        this.setState({sku: e.target.value});
        //this.validateForm();
    }

    //handle description change
    onDescriptionChange(e) {
        this.setState({description: e.target.value});
       // this.validateForm();
    }

    //handle price change
    onPriceChange(e) {
        this.setState({price: e.target.value});
       // this.validateForm();
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

    //handle save button clicked
    onSave(e) {

    	if(this.validateForm()) {


        //data in the form

        const apiUrl = 'http://local.drupal8-new.com/api/create-product';
	    const formData = new FormData();
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
	          this.setState({
                successCreation: result['message']
              });

               //empty form
                this.setState({name: ""});
                this.setState({sku: ""});
                this.setState({description: ""});
                this.setState({price: ""});
                this.setState({selectedCategoryId: -1});
	        },
	        (error) => {
	          this.setState({ successCreation: 'Unable to Create' });
	        }
	      )
	      e.preventDefault();	

		} else {
		    e.preventDefault();
		}
	}

    //render Component Here
    render() {
        //make categories as option for the select tag
        var categoriesOptions = this.state.categories.map(function(category) {
            return (
                <option key={category.id} value={category.id}>{category.name}</option>
            );
        });

        return (
        <div>
            {
                this.state.successCreation == "Product was created." ?
                    <div className="alert alert-success">
                        Product has been saved successfully.
                    </div>
                : null
            }

            {
                this.state.successCreation == "Unable to create product." ?
                    <div className="alert alert-danger">
                        Unable to save product. Please try again.
                    </div>
                : null
            }


            <div align="right"> <a href="#"
                onClick={() => this.props.changeAppMode('read')}
                className="btn btn-primary m-b-1em"> Back
            </a>
            </div>

            <form onSubmit={this.onSave}>
                <table className="table table-bordered table-hover">
                    <tbody>

                        <tr>
                            <td>Name</td>
                            <td>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={this.state.name}
                                    //required
                                    onChange={this.onNameChange} />
                                    <span className="form-error">{this.state.errorName}</span>
                            </td>
                        </tr>
                         <tr>
                            <td>SKU</td>
                            <td>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={this.state.sku}
                                   // required
                                    onChange={this.onSKUChange} />
                                    <span className="form-error">{this.state.errorSKU}</span>
                            </td>
                        </tr>

                        <tr>
                            <td>Description</td>
                            <td>
                                <textarea
                                    className="form-control"
                                    //required
                                    value={this.state.description}
                                    onChange={this.onDescriptionChange}></textarea>
                                    <span className="form-error">{this.state.errorDescription}</span>
                            </td>
                        </tr>

                        <tr>
                            <td>Price ($)</td>
                            <td>
                                <input
                                    type="number"
                                    step="0.01"
                                    className="form-control"
                                    value={this.state.price}
                                   // required
                                    onChange={this.onPriceChange} />
                                    <span className="form-error">{this.state.errorPrice}</span>

                            </td>
                        </tr>

                        <tr>
                            <td>Category</td>
                            <td>
                                <select
                                    onChange={this.onCategoryChange}
                                    className="form-control"
                                    value={this.state.selectedCategoryId}>
                                    <option value="-1">Select Category ... </option>
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

export default CreateProductComponent;