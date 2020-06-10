<?php 
/**
 * We use this block to render the React application 
*/

namespace Drupal\react_todo\Plugin\Block;

use Drupal\Core\Block\BlockBase;

/**
 * Provides a 'ReactToDoBlock' block.
 *
 * @Block(
 *  id = "react_todo_block",
 *  admin_label = @Translation("React Todo block"),
 * )
 */
class ReactToDoBlock extends BlockBase {

    /**
     * {@inheritdoc}
     */

    // is returning a render array with the attached library
    public function build() {
      $build = [];
      $build['react_todo_block'] = [
        '#markup' => '<div id="container"></div>',
        '#attached' => [
          'library' => 'react_todo/react-todo' 
        ]
      ];
  
      return $build;
    }
  }
  