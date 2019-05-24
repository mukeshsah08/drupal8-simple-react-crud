<?php
 /**
 * @file
 * Contains \Drupal\simple_react_crud\Controller\ProductController.
 */
namespace Drupal\simple_react_crud\Controller;

use Drupal\Core\Controller\ControllerBase;


/**
 * Controller routines for displaying products using REACT.
 */
class ProductController extends ControllerBase {


  public function showProduct() {

   return array(
        '#theme' => 'product_template',
        '#attached' =>
          array(
            'library' =>
              array('simple_react_crud/react-styling')
          ),
        // For testing purposes
        '#cache' => array(
          'max_age' => 0,
        )
      );

  }


}


	
