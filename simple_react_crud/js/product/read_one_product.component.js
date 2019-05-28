//component that contains logic to read one product
window.ReadOneProductComponent = React.createClass({
    getInitialState: function() {
        return {
            id: 0,
            name: '',
            sku: '',
            description: '',
            price: '',
            category_name: ''
        };
    },

    componentDidMount: function() {
        var productId = this.props.productId;
        const hostURL = location.protocol + '//' + location.hostname;
        this.serverRequest = $.get(hostURL+"/api/product-info?id=" + productId,
            function(product) {
                this.setState({category_name: product.category_name});
                this.setState({id: product.id});
                this.setState({name:product.name});
                this.setState({sku: product.sku});
                this.setState({description: product.description});
                this.setState({price: product.price});
            }.bind(this));

        $('.page-header h2').text("View Product");
    },

    componentWillUnmount: function() {
        this.serverRequest.abort();
    },

    render: function() {
        return (
            <div>
                <a href="#"
                    onClick={() => this.props.changeAppMode('read')}
                    className='btn btn-primary m-b-1em'> Back
                </a>

                
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
});