<?php

/**
 * @file
 * Contains \Drupal\custom_api\Controller\ApiController.
 */

namespace Drupal\custom_api\Controller;

use Drupal\Core\Controller\ControllerBase;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;

use Drupal\rest\Plugin\ResourceBase;
use Drupal\rest\ResourceResponse;

/**
 * Controller routines for custom_api routes.
 */
class ApiController extends ControllerBase {


  /**
  * This condition checks the 'Content-Type' and makes sure 
  * to decode JSON dtring from the request body into array
  */
  public function check_authentication( Request $request)
  {
    if ( 0 === strpos( $request->headers->get( 'Content-Type' ), 'application/json' ) ) {
      $data = json_decode( $request->getContent(), TRUE );
      $request->request->replace( is_array( $data ) ? $data : [] );
    }

    return $request;
  }

  /**
   * Callback for `custom-api/get.json` API method.
   * 
   * This function returns a json response containing all nodes from the Drupal site.
   */
  public function get_nodes( Request $request ) {

    $response = array();

    //get entities from Drupal
    $nodes = $this->entityTypeManager()->getStorage('node')->loadMultiple();

    //crete an array and put the node inside
    foreach ($nodes as $node) {
        $response[] = $node->toArray();
    }

    return new JsonResponse($response);
  }

  /**
   * Callback for `custom-api/put.json` API method.
   * 
   * This function changes the mark as complete state of the task.
   * Also returns a json response containing all the nodes.
   */
  public function put_node( Request $request ) {

    $request = $this->check_authentication($request);

    //take nid value from the request
    $nodeID = $request->get('nid');
    $node = $this->entityTypeManager()->getStorage('node')->load($nodeID);

    //get current "mark as complete" state of node.
    $currentState = $node->get('body')->value;
    $newState = !$currentState;

    //update node with a new state
    $node->set('body', array(
      'value' => $newState,
      'format' => 'basic_html'
    ));

    //and now save it
    $node->save();

    return $this->get_nodes( $request );
  }

  /**
   * Callback for `custom-api/post.json` API method.
   * 
   * This function creates new node with type article.
   * Also returns a json response containing all the nodes.
   */
  public function post_node( Request $request ) {

    $request = $this->check_authentication($request);

    //take the title from request
    $nodeTitle = $request->get('title');

    //create a new node of type article with a given title
    $node = $this->entityTypeManager()->getStorage('node')->create(['type' => 'article', 'title' => $nodeTitle]);

    //set a default value for "mark as complete state"
    $node->set('body', array(
      'value' => FALSE,
      'format' => 'basic_html'
    ));
    $node->save();


    return $this->get_nodes( $request );
  }

  /**
   * Callback for `custom-api/delete.json` API method.
   * 
   * This function deletes a node.
   */
  public function delete_node( Request $request ) {

    $request = $this->check_authentication($request);

    //take nid value from the request
    $nodeID = $request->get('nid');
    
    //store the specific node and then delete it
    $entity = $this->entityTypeManager()->getStorage('node')->load($nodeID);
    $entity->delete();

    return new JsonResponse( $request );
  }

}
