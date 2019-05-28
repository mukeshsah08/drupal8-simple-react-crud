//component for holding table header and rows
import React, { Component } from 'react';
import ProductRow from './ProductRow';

class ProductsTable extends Component {
    render() {
        var rows = this.props.products
        .map(function(product, i) {
            return (
                <ProductRow
                    key={i}
                    product={product}
                    changeAppMode={this.props.changeAppMode } />
            );
        }.bind(this));

        return (
           <table className="table table-bordered table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">SKU</th>
                            <th scope="col">Description</th>
                            <th scope="col">Price</th>
                            <th scope="col">Category</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
              </table>
        );
    }
}

export default ProductsTable;