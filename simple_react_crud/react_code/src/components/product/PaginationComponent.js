//components that contain functionalities that appear on top of the product table: create product
import React, { Component } from 'react';

class PaginationComponent extends Component {


    paginate() {
        const currentPage = this.props.currentPage;
        var totalProducts = this.props.totalProducts;
        const limit = this.props.limit;

        var pagination = []; 
        var item = '';

                
            if(totalProducts > limit) {

                var pageCount = (totalProducts % limit == 0) ? Math.floor(totalProducts / limit) : Math.floor(totalProducts / limit)+1;
                console.log(pageCount);



                if(currentPage > 1) { // for First and Previous buttons

                  item =   <div key='firstPage'><a href="#" onClick={() => this.props.changePage(1)} className='btn btn-primary m-b-1em'> First </a>
                           </div>
                  pagination.push(item);

                  item =   <div key='prevPage'><a href="#" onClick={() => this.props.changePage(currentPage -1)} className='btn btn-primary m-b-1em'> Previous </a>
                            </div>
                  pagination.push(item);

                } 
               
                if(pageCount > 4 ) { // building pagination with ... for more than 4 items

                    if(currentPage == 1) {
                        var startPage = 1;
                        var endPage =3;
                    } else if(currentPage == pageCount) {
                        var startPage = pageCount-2;
                        var endPage =pageCount;

                        item = <div key='prev-dot' className=''><a href="#" onClick={() => this.props.changePage(startPage -1)} className='btn btn-primary'> ... </a></div>
                        pagination.push(item);
                    } else {
                        var startPage = currentPage-1;
                        var endPage = currentPage+1;
                        if(currentPage > 2) {
                            item = <div key='prev-dot' className=''><a href="#" onClick={() => this.props.changePage(startPage -1)} className='btn btn-primary'> ... </a></div>
                            pagination.push(item);
                        }

                    }

                    for(var i=startPage; i <= endPage; i++ ) {
                        let page = i;
                        if(currentPage != i) {
                            item = <div key={i} >
                                        <a href="#"
                                            onClick={() => this.props.changePage(page)}
                                            className='btn btn-primary m-b-1em'>{i}
                                        </a>
                                    </div>
                            pagination.push(item);
                        } else {
                                    item = <div key={i} className='btn active-btn'>{i}</div>
                                    pagination.push(item);
                        }
                        

                    } 



                    if(currentPage == 1) {
                        item = <div key='next-dot' className=''><a href="#" onClick={() => this.props.changePage(currentPage +2)} className='btn btn-primary m-b-1em'> ... </a></div>
                        pagination.push(item);
                    } else if(currentPage == pageCount) {
                        
                    } else {
                        if(currentPage < pageCount-1){
                            item = <div key='next-dot' className=''><a href="#" onClick={() => this.props.changePage(currentPage +2)} className='btn btn-primary m-b-1em'> ... </a></div>
                            pagination.push(item);
                        } 

                    }

                } else {  // building pagination with ... for less or equal to 4 items
                    for(var i=1; i <= pageCount; i++ ) {
                        let page = i;
                        if(currentPage != i) {
                            item = <div key={i} >
                                        <a href="#"
                                            onClick={() => this.props.changePage(page)}
                                            className='btn btn-primary m-b-1em'>{i}
                                        </a>
                                    </div>
                            
                        } else {
                            item = <div key={i} className='btn active-btn'>{i}</div>
                        }
                        pagination.push(item);
                    }  
                }      


                if(currentPage < pageCount) { // for Nest and Last buttons

                    item =   <div key='nextPage'><a href="#" onClick={() => this.props.changePage(currentPage +1)} className='btn btn-primary m-b-1em'> Next </a>
                              </div>
                    pagination.push(item);

                    item =   <div key='lastPage'><a href="#" onClick={() => this.props.changePage(pageCount)} className='btn btn-primary m-b-1em'> Last  </a>
                              </div>
                    pagination.push(item);

                }
            
              
          


        }

         return pagination;   

    }

    render() {

        return(
        this.paginate()
        );
    }
}

export default PaginationComponent;