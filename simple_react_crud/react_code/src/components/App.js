
import React, { Component } from 'react';
import ReadProductsComponent from './product/ReadProductsComponent';
import CreateProductComponent from './product/CreateProductComponent';
import ReadOneProductComponent from './product/ReadOneProductComponent';
import UpdateProductComponent from './product/UpdateProductComponent';
import DeleteProductComponent from './product/DeleteProductComponent';


class App extends Component {
    
    constructor(){
        super();
        this.state = {
           currentMode : 'read',
           message : '',
           productId: null
        }; 
        this.changeAppMode = this.changeAppMode.bind(this); 
        this.changeMessage = this.changeMessage.bind(this); 
   
    }

    changeAppMode(newMode, productId) {
        this.setState({currentMode: newMode});
        if(productId !== undefined){
            this.setState({productId: productId});
        }
    }
    changeMessage(messageText) {
        this.setState({message: messageText});
    }
    render() {
          var modeComponent = '';
          if(this.state.message != "") { 
            modeComponent = <div key='msg' className='alert alert-success'>{this.state.message}</div>;
          }
          modeComponent = [modeComponent, <ReadProductsComponent key="read"  changeAppMode={this.changeAppMode} changeMessage={this.changeMessage}/>];

        switch(this.state.currentMode) {
            case 'read' :
                break;
            case 'readOne' :
                modeComponent = <ReadOneProductComponent productId={this.state.productId} changeAppMode={this.changeAppMode} changeMessage={this.changeMessage} />;
                break;
            case 'create' :
                modeComponent = <CreateProductComponent changeAppMode={this.changeAppMode} changeMessage={this.changeMessage}/>;
                break;
            case 'update' :
                modeComponent = <UpdateProductComponent productId={this.state.productId} changeAppMode={this.changeAppMode} changeMessage={this.changeMessage}/>;
                break;
            case 'delete' :
                modeComponent = <DeleteProductComponent productId={this.state.productId} changeAppMode={this.changeAppMode} changeMessage={this.changeMessage}/>;
                break;
            default :
                break;
            }


            return modeComponent;
         
    }
} 

export default App;
