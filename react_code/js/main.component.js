//component that decide which main components to load read or create/update
/*r MainApp = React.createClass({
  
    //console.log("I Am Here");
    // initial mode is 'read' mode
    getInitialState: function() {
        return {
            currentMode : 'read',
            productId: null
        };
    },

    //used when user click something that changes current mode
    changeAppMode: function(newMode, productId) {
        this.setState({currentMode: newMode});
        if(productId !== undefined){
            this.setState({productId: productId});
        }
    },

    //render the component based on selecte or current mode
    render: function() {
        var modeComponent =
            <ReadProductsComponent changeAppMode={this.changeAppMode}/>;

        switch(this.state.currentMode) {
            case 'read' :
                break;
            case 'readOne' :
                modeComponent = <ReadOneProductComponent productId={this.state.productId} changeAppMode={this.changeAppMode} />;
                break;
            case 'create' :
                modeComponent = <CreateProductComponent changeAppMode={this.changeAppMode} />;
                break;
            case 'update' :
                modeComponent = <UpdateProductComponent productId={this.state.productId} changeAppMode={this.changeAppMode} />;
                break;
            case 'delete' :
                modeComponent = <DeleteProductComponent productId={this.state.productId} changeAppMode={this.changeAppMode} />;
                break;
            default :
                break;
            }

            return modeComponent;
    }
});*/


import ReadProductsComponent from './product/read_products.component.js';

class MainApp extends React.Component {
    
    constructor(){
        super();
        console.log('constructor called')
        this.state = {
           currentMode : 'read',
            productId: null
        }; 
        this.changeAppMode = this.changeAppMode.bind(this); 
        alert("sss");      
    }

    changeAppMode(newMode, productId) {
        this.setState({currentMode: newMode});
        if(productId !== undefined){
            this.setState({productId: productId});
        }
    }
    render() {
          var modeComponent =
            <ReadProductsComponent changeAppMode={this.changeAppMode}/>;

        switch(this.state.currentMode) {
            case 'read' :
                break;
            case 'readOne' :
                modeComponent = <ReadOneProductComponent productId={this.state.productId} changeAppMode={this.changeAppMode} />;
                break;
            case 'create' :
                modeComponent = <CreateProductComponent changeAppMode={this.changeAppMode} />;
                break;
            case 'update' :
                modeComponent = <UpdateProductComponent productId={this.state.productId} changeAppMode={this.changeAppMode} />;
                break;
            case 'delete' :
                modeComponent = <DeleteProductComponent productId={this.state.productId} changeAppMode={this.changeAppMode} />;
                break;
            default :
                break;
            }

            return modeComponent;
         
    }
}   



// go and render the whole react component on the div with id 'content'
ReactDOM.render(< MainApp / >, document.getElementById('react_content'));