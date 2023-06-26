import { React, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from "react-router-dom";
import { Checkbox} from '@mantine/core';
import {
  Tree,
  getBackendOptions,
  MultiBackend,
} from "@minoru/react-dnd-treeview";
import { DndProvider } from "react-dnd";
import { unwrapResult } from '@reduxjs/toolkit';
import TaskAddModal from '../components/addTaskModal';
import { decrease, increase, getTasks, doneTask } from '../../state/reducks/tasks/slices';
import initialData from '../../../sample-default.json';

function TaskList() {
  const handleDrop = (newTaskData) => setTasks(newTaskData);
  const { categoryId } = useParams();
  const dispatch = useDispatch();

  const taskData = useSelector((state) => state.tasks.list);
  console.log(taskData);

  useEffect(() => {
    dispatch(getTasks(categoryId));
  }, []);

  const addTask= (event, text, parentId) => {
    event.preventDefault();

    var id = taskData.map(function (p) {
      return p.id;
    });

    setTasks((prevState) => ([ ...prevState, {
      "id": Math.max.apply(null, id) + 1,
      "parent": parentId,
      "droppable": true,
      "text": text,
      "done": false
    }]));
  };

  // チェックボックスの状態を更新する
  const handleCheckTask = async (event, id, done) => {
    event.preventDefault();
    // フォームデータを作成
    const data = new FormData();
    data.append("id", id);
    data.append("is_done", Number(done));

    try {
      const result = await dispatch(doneTask(data));

      if (unwrapResult(result) !== false) {
        console.log('change done');
      } else {
        console.error('Failed to add the task');
      }
    } catch (err) {
      console.error('Failed to save the post: ', err)
    }
  };

  // タスクを削除する
  const deleteTask = (event, id) => {
    event.preventDefault();
    setTasks((oldState) =>
      oldState.filter((oldValue) => (oldValue.id !== id))
    );
  };

  return (
    <div>
      <button onClick={() => dispatch(increase())}>Up</button>
      <button onClick={() => dispatch(decrease())}>Down</button>
    <img />
    <DndProvider backend={MultiBackend} options={getBackendOptions()}>
      {categoryId}
      <div className="flex justify-end">
        <TaskAddModal parentId={0} categoryId={categoryId} addTask={addTask}/>
      </div>
      {taskData === null
        ? <></>
        :
      <Tree
        tree={taskData}
        rootId={0}
        onDrop={handleDrop}
        classes={{
          dropTarget: 'bg-teal-100'
        }}

        render = {(node, { depth, isOpen, onToggle }) => (
          <div style={{ paddingLeft: depth * 30 }} className='flex flex-row my-2 items-center w-full flex-nowrap'>
            {node.droppable && (
              <span onClick={onToggle}>{
                isOpen
                ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
              }</span>
            )}
            <Checkbox
              className='ml-2 grow'
              color="gray"
              checked={node.done}
              onChange={(event) => handleCheckTask(event, node.id, event.currentTarget.checked)}
              label={
                <>
                  <span style={{ textDecoration: node.done ? 'line-through' : 'none' }}>{node.text}</span>
                </>
              }
            />
            <div className={`rounded-md duration-200 ${node.done ? 'hover:bg-red-500' : 'hover:bg-teal-50'}`}>{
              node.done
              ? <span className='text-red-500 hover:text-white duration-200' onClick={(event) => deleteTask(event, node.id)}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                  </svg>
                </span>
              : <TaskAddModal parentId={node.id} categoryId={categoryId} addTask={addTask} key={node.id}/>
            }</div>
          </div>
        )}
      />
      }
    </DndProvider>
    </div>
  );
}

export default TaskList;