import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useInputState, getHotkeyHandler, useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { Input, Button } from '@mantine/core';
import { connect } from "react-redux";
import { unwrapResult } from '@reduxjs/toolkit';
import { addTask } from '../../state/reducks/tasks/slices';

let AddTask = (props) => {
  const [textValue, setTextValue] = useInputState('');
  const [isSubmittable, setIsSubmittable] = useInputState(true);
  const dispatch = useDispatch();

  const add = async (event) => {
    setIsSubmittable(false);
    if (textValue === '' || !isSubmittable) {
      return;
    }
    event.preventDefault();

    // フォームデータを作成
    const data = new FormData();
    data.append("parent_id", props.parentId);
    data.append("category_id", props.categoryId);
    data.append("text", textValue);

    try {
      const result = await dispatch(addTask(data));

      if (unwrapResult(result) !== false) {
        setTextValue('');
        props.done();
      } else {
        console.error('Failed to add the task');
      }
    } catch (err) {
      console.error('Failed to save the post: ', err)
    }
  };

  return (
    <div className='flex flex-row justify-between'>
      <Input
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
          </svg>
        }
        data-autofocus
        onChange={(event) => setTextValue(event.currentTarget.value)}
        className='grow mr-2'
        placeholder="What your to-do?"
        onKeyDown={getHotkeyHandler([
          ['Enter', (event)=>add(event)],
        ])}
      />
      <Button color="cyan" onClick={(event)=>add(event)} disabled={textValue === '' && isSubmittable}>
        Add
      </Button>
    </div>
  );
};
AddTask = connect()(AddTask);

export default AddTask;
