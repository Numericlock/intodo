import { React, useState, useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams, Link } from "react-router-dom";
import { Checkbox, Button, Text } from '@mantine/core';
import {
  Tree,
  getBackendOptions,
  MultiBackend,
} from "@minoru/react-dnd-treeview";
import { DndProvider } from "react-dnd";
import TaskAddModal from '../components/addTaskModal';
import DeleteTaskForm from '../components/deleteTaskForm';
import DoneTaskForm from '../components/doneTaskForm';
import VariableLengthText from '../components/VariableLengthText';

function TaskList() {
  const handleDrop = (newTaskData) => setTasks(newTaskData);
  const { categoryId } = useParams();

  const queryClient = useQueryClient();
  let categories = queryClient.getQueryData(['categories']);
  if (!categories) {
    const { isLoading, data, isError, error } = useQuery({ queryKey: ['categories'], queryFn: async () => {
      const response = await axios.get(`/api/category`, {}, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('auth_token')}` },
      });

      return response.data.categories;
    }});

    if (isLoading) {
      return <h2>Loading...</h2>;
    }

    if (isError) {
      return <h2>{error.message}</h2>;
    }

    categories = data;
  }

  const currentCategoryData = categories.find((category) => category.id === Number(categoryId)) ?? null;
  const categoryImage = currentCategoryData ? currentCategoryData.base_64_image : null;
  const categoryName = currentCategoryData ? currentCategoryData.name : null;

  const { isLoading, data, isError, error } = useQuery({ queryKey: ['tasks', categoryId], queryFn: async () => {
    const response = await axios.get(`/api/task`, {
      params: { category_id: categoryId }
    }, {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('auth_token')}` },
    });

    return response.data.tasks;
  }});

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <div>
      <div className='relative'>
        {(categoryImage)
          ? <img src={categoryImage} className='h-40 w-full rounded-lg object-cover'/>
          : <div className="bg-repeat h-40 w-full rounded-lg bg-stone-500 heropattern-topography-white"/>
        }
        <div className='absolute inset-0'>
          <div className='flex items-center h-40 w-full justify-center'>
            <Text className='font-mono text-center rounded-lg mix-blend-overlay text-white'>
              <VariableLengthText text={categoryName} maxWidth='370' />
            </Text>
          </div>
        </div>
      </div>
      <DndProvider backend={MultiBackend} options={getBackendOptions()}>
        <div className="flex justify-end">
          <TaskAddModal parentId={0} categoryId={categoryId}/>
        </div>
        {data === null
          ? <></>
          :
        <Tree
          tree = {data}
          rootId = {0}
          onDrop = {handleDrop}
          classes = {{
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
              <DoneTaskForm taskId={node.id} categoryId={categoryId} isDone={node.done} text={node.text} key={node.id}/>
              <div className={`rounded-md duration-200 ${node.done ? 'hover:bg-red-500' : 'hover:bg-teal-50'}`}>{
                node.done
                ? <DeleteTaskForm taskId={node.id} categoryId={categoryId} key={node.id}/>
                : <TaskAddModal parentId={node.id} categoryId={categoryId} key={node.id}/>
              }</div>
            </div>
          )}
        />
        }
      </DndProvider>
      <Link to={'/category'}>
        <Button color="cyan">
          Back
        </Button>
      </Link>
    </div>
  );
}

export default TaskList;
