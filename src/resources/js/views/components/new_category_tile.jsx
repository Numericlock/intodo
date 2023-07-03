import { React, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { useInputState, getHotkeyHandler, useDisclosure } from '@mantine/hooks';
import { Modal, Input, Button, FileButton, Group, Text } from '@mantine/core';
import CategoryTile from './category_tile';
import { unwrapResult } from '@reduxjs/toolkit';
import { addCategory } from '../../state/reducks/categories/slices';


const NewCategoryTile = (props) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [textValue, setTextValue] = useInputState('');
  const [isSubmittable, setIsSubmittable] = useInputState(true);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState();
  const dispatch = useDispatch();

  const clearFile = () => {
    setFile(null);
    setPreview(null);
  };

  //メモリ内のBLOBにアクセスするためのURL生成
  useEffect(() => {
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  }, [file]);

  const handleAddButton = async (event) => {
    event.preventDefault();

    if (textValue === '' || !isSubmittable) {
      return;
    }
    setIsSubmittable(false);

    const data = new FormData();
    data.append("name", textValue);
    if (file !== null) {
      data.append("image", file);
    }

    try {
      const result = await dispatch(addCategory(data));

      if (unwrapResult(result) !== false) {
        clearFile();
        setTextValue('');
        setIsSubmittable(true);
        close();
      } else {
        console.error('Failed to add the category');
      }
    } catch (err) {
      console.error('Failed to save the category: ', err)
    }
  };

	return (
    <>
      <div className="m-4 w-52 flex items-center justify-center">
        <div onClick={open} className="glass-white text-neutral-500 rounded-full flex items-center justify-center w-28 h-28 duration-200 cursor-pointer">
          <div className='hover:rotate-360'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-20 h-20">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </div>
        </div>
      </div>
      <Modal
        opened={opened}
        onClose={close}
        overlayProps={{
          opacity: 0,
          blur: 0,
        }}
        centered
      >
        <div className='flex flex-col justify-around items-center'>
          <div>
            <Input
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
                </svg>
              }
              data-autofocus
              onChange={(event) => setTextValue(event.currentTarget.value)}
              className='grow my-2'
              placeholder="input category name."
              onKeyDown={getHotkeyHandler([
                ['Enter', (event)=>addTask(event)],
              ])}
            />
            <Group position="center">
              <FileButton className='my-2' onChange={setFile} accept="image/png,image/jpeg">
                {(props) => <Button {...props}>Upload image</Button>}
              </FileButton>
              <Button disabled={!file} color="red" onClick={clearFile}>
                Reset
              </Button>
            </Group>
          </div>
          <div className='preview flex flex-col my-2 justify-around items-center rounded-lg p-4 w-60 bg-white'>
            <Text>Preview</Text>
            <CategoryTile image={preview} name={textValue} num={0}></CategoryTile>
          </div>
          <Button className='my-2' color="cyan" onClick={(event)=>handleAddButton(event)} disabled={textValue === ''}>
            Add
          </Button>
        </div>
      </Modal>
    </>
	);
};

export default NewCategoryTile;
