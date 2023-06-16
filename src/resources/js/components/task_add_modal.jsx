import { useState } from 'react';
import { useInputState, getHotkeyHandler, useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import {Modal, Input, Button} from '@mantine/core';

const TaskAddModal = (props) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [textValue, setTextValue] = useInputState('');

  const addTask = (event) => {
    if (textValue === '') {
      return;
    }
    event.preventDefault();
    props.addTask(event, textValue, props.parentId);

    close();
    setTextValue('');
  };

	return (
    <>
      <span className='hover:bg-teal-50' onClick={open}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
      </span>
      <Modal
        opened={opened}
        onClose={close}
        overlayProps={{
          opacity: 0,
          blur: 0,
        }}
        centered
      >
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
              ['Enter', (event)=>addTask(event)],
            ])}
          />
          <Button color="cyan" onClick={(event)=>addTask(event)} disabled={textValue === ''}>
            Add
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default TaskAddModal;
