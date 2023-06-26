import { React, useState, useEffect } from 'react';
import { useInputState, getHotkeyHandler, useDisclosure } from '@mantine/hooks';
import { Modal, Input, Button, FileButton, Group, Text } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import CategoryTile from './category_tile';


const NewCategoryTile = (props) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [textValue, setTextValue] = useInputState('');
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState();

  const history = useNavigate();

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

  const addCategory = (event) => {
    event.preventDefault();

    if (textValue === '') {
      return;
    }

    const data = new FormData();
    data.append("name", textValue);
    if (file !== null) {
      data.append("image", file);
    }

    axios.post(`/api/category/create`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
      },
    }).then(res => {
      if(res.data.status === 200){
        props.addCategoryTile(res.data.category);
        clearFile();
        close();
      }
    });
  };

	return (
    <>
      <div onClick={open} className="m-4 w-52 flex items-center justify-center">
        <div className="glass text-neutral-400 rounded-full flex items-center justify-center w-28 h-28 hover:glass-white hover:scale-105 hover:text-neutral-500 duration-200">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-20 h-20">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
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
          <Button className='my-2' color="cyan" onClick={(event)=>addCategory(event)} disabled={textValue === ''}>
            Add
          </Button>
        </div>
      </Modal>
    </>
	);
};

export default NewCategoryTile;