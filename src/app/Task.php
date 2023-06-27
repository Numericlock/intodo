<?php
namespace App;

use Franzose\ClosureTable\Models\Entity;

class Task extends Entity
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'tasks';

    /**
     * ClosureTable model instance.
     *
     * @var \App\TaskClosure
     */
    protected $closure = 'App\TaskClosure';
}
