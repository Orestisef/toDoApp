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
   * Callback for `my-api/get.json` API method.
   */
  public function get_example( Request $request ) {

    $response = array();
    $nodes = $this->entityTypeManager()->getStorage('node')->loadMultiple();
    foreach ($nodes as $node) {
        $response[] = $node->toArray();
    }
    return new JsonResponse($response);
  }

  /**
   * Callback for `my-api/put.json` API method.
   */
  public function put_example( Request $request ) {

    if ( 0 === strpos( $request->headers->get( 'Content-Type' ), 'application/json' ) ) {
      $data = json_decode( $request->getContent(), TRUE );
      $request->request->replace( is_array( $data ) ? $data : [] );
    }

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

    //------------------
    //create a function to get nodes
    $response = array();
    $nodes = $this->entityTypeManager()->getStorage('node')->loadMultiple();
    foreach ($nodes as $node) {
        $response[] = $node->toArray();
    }
    //------------------

    return new JsonResponse( $response );
  }

  /**
   * Callback for `my-api/post.json` API method.
   */
  public function post_example( Request $request ) {

    if ( 0 === strpos( $request->headers->get( 'Content-Type' ), 'application/json' ) ) {
      $data = json_decode( $request->getContent(), TRUE );
      $request->request->replace( is_array( $data ) ? $data : [] );
    }

    $nodeTitle = $request->get('title');
    $node = $this->entityTypeManager()->getStorage('node')->create(['type' => 'article', 'title' => $nodeTitle]);
    //set a default value for "mark as complete state"
    $node->set('body', array(
      'value' => FALSE,
      'format' => 'basic_html'
    ));
    $node->save();

    //get again
    $response = array();
    $nodes = $this->entityTypeManager()->getStorage('node')->loadMultiple();
    foreach ($nodes as $node) {
        $response[] = $node->toArray();
    }

    return new JsonResponse( $response );
  }

  /**
   * Callback for `my-api/delete.json` API method.
   */
  public function delete_example( Request $request ) {

    // $response['data'] = 'Some test data to return';
    // $response['method'] = 'DELETE';

    if ( 0 === strpos( $request->headers->get( 'Content-Type' ), 'application/json' ) ) {
      $data = json_decode( $request->getContent(), TRUE );
      $request->request->replace( is_array( $data ) ? $data : [] );
    }

    $nodeID = $request->get('nid');
    
    $entity = $this->entityTypeManager()->getStorage('node')->load($nodeID);
    $entity->delete();

    return new JsonResponse( $request );
  }

}
