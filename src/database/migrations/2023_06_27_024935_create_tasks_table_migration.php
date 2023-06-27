<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\Schema;

class CreateTasksTableMigration extends Migration
{
    public function up()
    {
        Schema::create('tasks', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('parent_id')->unsigned()->nullable();
            $table->integer('position', false, true);
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('category_id');
            $table->string('text', 60);
            $table->boolean('is_done')->default(false);
            $table->boolean('is_droppable')->default(true);
            $table->timestamps();

            $table->softDeletes();
            $table->foreign('user_id')->references('id')->on('users');
            $table->foreign('category_id')->references('id')->on('task_categories');
            $table->foreign('parent_id')
                ->references('id')
                ->on('tasks')
                ->onDelete('set null');
        });

        Schema::create('task_closure', function (Blueprint $table) {
            $table->increments('closure_id');

            $table->integer('ancestor', false, true);
            $table->integer('descendant', false, true);
            $table->integer('depth', false, true);

            $table->foreign('ancestor')
                ->references('id')
                ->on('tasks')
                ->onDelete('cascade');

            $table->foreign('descendant')
                ->references('id')
                ->on('tasks')
                ->onDelete('cascade');

        });
    }

    public function down()
    {
        Schema::dropIfExists('task_closure');
        Schema::dropIfExists('tasks');
    }
}
