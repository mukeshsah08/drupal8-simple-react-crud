//component that contains all the logic and other small components that forms the REACT product view

/*window.ReadProductsComponent = React.createClass({
    getInitialState: function() {
        return {
            products: []
        };
    },

    //on mount fetch all products and store them as this components state
    componentDidMount: function() {
        const hostURL = location.protocol + '//' + location.hostname ;
        //const hostURL = 'http://local.drupal8-new.com/api/product-list';
        // const hostURL = 'http://local.mytest.com/Simple-CRUD/api/product/read.php';
        this.serverRequest = $.get(hostURL+'/api/product-list', function(products) {
            console.log(products.records);
            this.setState({
                products: products.records
            });
        }.bind(this));
    },

    //on unmount kill products fetching in case request is still pending
    componentWillUnmount: function() {
        this.serverRequest.abort();
    },

    //render components on page
    render: function() {
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

});
*/



export class ReadProductsComponent extends React.Component {

    constructor(){
        super();
        this.state = {
           products: []
        };           
    }

    //on mount fetch all products and store them as this components state

    componentDidMount() {
    const apiUrl = location.protocol + '//' + location.hostname +'/api/product-list';

    fetch(apiUrl)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            products: result.records
          });
        },
        (error) => {
          this.setState({ error });
        }
      )
   }
  

    //render components on page
    render() {
        //list produtcs
        console.log('records-');
        console.log(this.state.products);
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

