import { useInputState, useDisclosure } from '@mantine/hooks';
import { Modal } from '@mantine/core';
import AddTaskForm from '../containers/addTaskForm';

const TaskAddModal = (props) => {
  const [opened, { open, close }] = useDisclosure(false);

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
        <AddTaskForm parentId={props.parentId} categoryId={props.categoryId} done={close}/>
      </Modal>
    </>
  );
};

export default TaskAddModal;
