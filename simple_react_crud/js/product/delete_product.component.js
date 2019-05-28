window.DeleteProductComponent = React.createClass({

    getInitialState: function() {
        return {
            name: '',
            sku: '',
        };
        console.log("initialize");
    },
    componentDidMount: function() {
    console.log("componentDidMount");
        var productId = this.props.productId;
        const hostURL = location.protocol + '//' + location.hostname;
  
        this.serverRequestProd = $.get(hostURL+"/api/product-info?id=" + productId,
            function(product) {
                this.setState({name: product.name});
                this.setState({sku: product.sku});
            }.bind(this));
        $('.page-header h1').text('Delete Product');
    },

    onDelete: function(e) {
        //product to delete
        var productId = this.props.productId;
        const hostURL = location.protocol + '//' + location.hostname;

        //submit data to ajax API
        $.ajax({
            url: hostURL+"/api/delete-product",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify({'id':productId}),
            success: function(response) {
                this.props.changeAppMode('read');
            }.bind(this),
            error: function(xhr,resp,text) {
                //show error in console
                console.log(xhr,resp,text);
            }
        });
    },

    render: function() {
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
});