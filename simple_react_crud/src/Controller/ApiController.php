<?php
 /**
 * @file
 * Contains \Drupal\simple_react_crud\Controller\ApiController.
 */
namespace Drupal\simple_react_crud\Controller;

use Drupal\Core\Controller\ControllerBase;
use Drupal\Core\Database\Connection;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\HttpFoundation\RedirectResponse;


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
  header("Access-Control-Allow-Origin: *");
  header("Content-Type: application/json; charset=UTF-8");	



    // set current page
    $page = isset($_GET['page']) ? $_GET['page'] : 1; 
    // set limit of records for current page
    $limit = isset($_GET['limit']) ? $_GET['limit'] : 10; 
    $start = (($page*$limit) - $limit);  
   //exit;
    // to get total records
    $query = $this->injected_database->select('products', 'p');
    $query->addExpression('COUNT(id)', 'total');
    $result = $query->execute()->fetchAssoc();
    $total = $result['total'];

    // to get records of current page
    $select = $this->injected_database->select('products', 'p');
    $select->fields('p');
    $select->addField('pc', 'name', 'category_name');
    $select->join('product_categories', 'pc', 'p.product_category_id = pc.id');
    $select->condition('p.status', 1, "=");
    $select->range($start, $limit);
    $select->orderBy('id', 'DESC');
    
    $result = $select->execute()->fetchAll(\PDO::FETCH_ASSOC);
    $result_count = count($result);

    $product_arr = [];
    $products_arr["records"] = [];
    $products_arr["total"] = $total;
    if($result_count > 0 ) {
    	//$products_arr["records"] = $result_count;
     	foreach ($result as $row) {
        //  extract($row);

          $product_item = array(
              "id" => $row['id'],
              "name" => $row['name'],
              "sku" => $row['sku'],
              "description" => html_entity_decode($row['description']),
              "price" => $row['price'],
              "category_id" => $row['product_category_id'],
              "category_name" => $row['category_name']
          );

          array_push($products_arr["records"], $product_item);
      }
    	 
    } 
    echo json_encode($products_arr);
    exit;

  }

  public function getProductCategoryList() {
  header("Access-Control-Allow-Origin: *");
  header("Content-Type: application/json; charset=UTF-8");

    // set id of product
    $pid = isset($_GET['id']) ? $_GET['id'] : 0;  

    $select = $this->injected_database->select('product_categories', 'pc');
    $select->fields('pc');
    $result = $select->execute()->fetchAll(\PDO::FETCH_ASSOC);
    $result_count = count($result);

    $category_arr = [];
    $category_arr["records"] = [];
    if($result_count > 0 ) {

      foreach ($result as $row) {
          $product_item = array(
              "id" => $row['id'],
              "name" => $row['name'],
              "description" => html_entity_decode($row['description']),
          );
          array_push($category_arr["records"], $product_item);
      }
      
      echo json_encode($category_arr);
      exit;

    } else {
      
    }
  }

  public function createProduct() {
    //required headers
  header("Access-Control-Allow-Origin: *");
  header("Content-Type: application/json; charset=UTF-8");  

      //get posted data
      $result = $this->injected_database->insert('products')->fields(
        array(
          'product_category_id' => $_POST['category_id'],
          'name' => $_POST['name'],
          'sku' => $_POST['sku'],
          'description' => $_POST['description'],
          'price' => $_POST['price'],
          'status' => 1,
          'created' => time(),
          'modified' => time(),
        )
      )->execute();
      
      if(!empty($result)) {
        echo json_encode(
        array("message"=>"Product has been creaated successfully!")
      );
      } else { // if unable to create product, notify user
        echo json_encode(
        array("message"=>"Unable to create product.")
        );
      }
      exit;
  }

  public function getProductInfo() {
    //required headers
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");  

    // set id of product
    $pid = isset($_GET['id']) ? $_GET['id'] : 0;
   // echo $pid; exit;

      $select = $this->injected_database->select('products', 'p');
      $select->fields('p');
      $select->addField('pc', 'name', 'category_name');
      $select->join('product_categories', 'pc', 'p.product_category_id = pc.id');
      $select->condition('p.id', $pid, "=");
      $select->condition('p.status', 1, "=");
      $row = $select->execute()->fetchAssoc(\PDO::FETCH_ASSOC);

      $product_arr = [];
      $product_arr = array(
        "id" => $row['id'],
        "name" => $row['name'],
        "sku" => $row['sku'],
        "description" => html_entity_decode($row['description']),
        "price" => $row['price'],
        "category_id" => $row['product_category_id'],
        "category_name" => $row['category_name']
      );
            
      echo json_encode($product_arr);
      exit;
    }

  public function updateProduct() {
    //required headers
  header("Access-Control-Allow-Origin: *");
  header("Content-Type: application/json; charset=UTF-8");  


      if(empty($_POST['id'])) {
        echo json_encode(
        array("message"=>"Unable to update product.")
        ); exit;
      }

      $result = $this->injected_database->update('products')->fields(
        array(
          'product_category_id' => $_POST['category_id'],
          'name' => $_POST['name'],
          'sku' => $_POST['sku'],
          'description' => $_POST['description'],
          'price' => $_POST['price'],
          'modified' => time(),
        )
      )->condition('id', $_POST['id'], "=")->execute();
      
      if(!empty($result)) {
        echo json_encode(
        array("message"=>"Product has been updated successfully!")
        );
      } else { // if unable to update product, notify user
        echo json_encode(
        array("message"=>"Unable to update product.")
        );
      }
      exit;
  }

  public function deleteProduct() {
    //required headers
  header("Access-Control-Allow-Origin: *");
  header("Content-Type: application/json; charset=UTF-8");  

      if(empty($_POST['id'])) {
        echo json_encode(
        array("message"=>"Unable to delete product.")
        ); exit;
      }

      $query = $this->injected_database->delete('products');
      $query->condition('id', $_POST['id'], "=");
      $result = $query->execute();
      
      if(!empty($result)) {
        echo json_encode(
        array("message"=>"Product has been deleted successfully!")
        );
      } else { // if unable to update product, notify user
        echo json_encode(
        array("message"=>"Unable to delete product.")
        );
      }
      exit;
  }
}




	
