<?php 

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
    public function build() {
      $build = [];
      $build['react_todo_block'] = [
        '#markup' => '<div id="react-app"></div>',
        '#attached' => [
          'library' => 'react_todo/react-todo'
        ],
      ];
  
      return $build;
    }
  }
  