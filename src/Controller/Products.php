<?php
 /**
 * @file
 * Contains \Drupal\simple_react_crud\Controller\ApiController.
 */
namespace Drupal\simple_react_crud\Controller;

use Drupal\Core\Controller\ControllerBase;
use Drupal\Core\Database\Connection;
use Symfony\Component\DependencyInjection\ContainerInterface;


/**
 * Controller routines for CRUD API.
 */
class ApiController extends ControllerBase {

 /**
  * @var \Drupal\Core\Database\Connection
 */
  private $injected_database;

   public function __construct(Connection $injected_database) {
    $this->injected_database = $injected_database;
  }

  public static function create(ContainerInterface $container) {
    return new static(
      $container->get('database')
    );
  }

  public function getProductList() {

    $select = $this->injected_database->select('products', 'p');
    $select->fields('p');
    $select->addField('pc', 'name', 'category_name');
    $select->join('product_categories', 'pc', 'p.product_category_id = pc.id');
    $select->condition('p.status', 1, "=");
    $result = $select->execute()->fetchAll(\PDO::FETCH_ASSOC);
    $result_count = count($result);

  //  print_r($result); exit;
    $product_arr = [];
   $products_arr["records"] = [];
    if($result_count > 0 ) {
    	//$products_arr["records"] = $result_count;
	   	foreach ($result as $row) {
	      //  extract($row);

	        $product_item = array(
	            "id" => $row['id'],
	            "name" => $row['name'],
	            "sku" => $row['name'],
	            "description" => html_entity_decode($row['description']),
	            "price" => $row['price'],
	            "category_id" => $row['product_category_id'],
	            "category_name" => $row['category_name']
	        );

	        array_push($products_arr["records"], $product_item);
	    }
    	echo json_encode($products_arr);
    	exit;
    }


  }


}


	
