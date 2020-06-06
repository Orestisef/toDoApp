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

    $response['data'] = 'Some test data to return';
    $response['method'] = 'PUT';

    return new JsonResponse( $response );
  }

  /**
   * Callback for `my-api/post.json` API method.
   */
  public function post_example( Request $request ) {

    $node = $this->entityTypeManager()->getStorage('node')->create(['type' => 'article', 'title' => 'hello']);
    $node->save();
    //$response[] = $node->toArray();


    return new JsonResponse( $response );
  }

  /**
   * Callback for `my-api/delete.json` API method.
   */
  public function delete_example( Request $request ) {

    // TODO: now nodeID is static, pass it as an argument
    $entity = $this->entityTypeManager()->getStorage('node')->load(2);
    $entity->delete();

    return new JsonResponse( $response );
  }

}
