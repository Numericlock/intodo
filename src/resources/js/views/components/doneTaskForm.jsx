import { Checkbox } from '@mantine/core';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const doneTaskForm = (props) => {
  // ToDo を完了させる、または未完了に戻す
  const doneTask = (data) => {
    return axios.post(`/api/task/done`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
      },
    });
  };

  const queryClient = useQueryClient();

  const useDoneTask = () => {
    return useMutation(doneTask, {
      onMutate: async (updatedData) => {
        // キャッシュを更新する前に他のリクエストをキャンセル
        await queryClient.cancelQueries(['tasks', props.categoryId]);

        // 以前のキャッシュデータを取得
        const previousTasks = queryClient.getQueryData(['tasks', props.categoryId]);

        // 以前のキャッシュデータが存在する場合のみ更新
        if (previousTasks) {
          // 楽観的更新を実行
          queryClient.setQueryData(['tasks', props.categoryId], (oldData) => {
            const data = oldData.map((task) => {
              if (task.id === parseInt(updatedData.get('id'))) {
                return { ...task, done: Boolean(parseInt(updatedData.get('is_done'))) };
              } else {
                return task;
              }
            });

            return data;
          });
        }

        // 以前のデータを戻すために返す
        return { previousTasks };
      },
      onError: (err, updatedData, context) => {
        // エラーが発生した場合、キャッシュを元の状態に戻す
        queryClient.setQueryData(['tasks', props.categoryId], context.previousTasks);
        console.error('Error registering data:', error);
      },
      onSettled: () => {
        // 成功または失敗に関わらず、クエリを再フェッチ
        queryClient.invalidateQueries(['tasks', props.categoryId]);
      },
    });
  };

  const { mutate } = useDoneTask();

  // チェックボックスの状態を更新する
  const handleCheckTask = async (event, id, done) => {
    event.preventDefault();
    // フォームデータを作成
    const formData = new FormData();
    formData.append('id', id);
    formData.append('is_done', done ? 1 : 0);

    mutate(formData);
  };

	return (
    <Checkbox
      className = 'ml-2 grow cursor-pointer'
      color = "gray"
      checked = {props.isDone}
      onChange = {(event) => handleCheckTask(event, props.taskId, event.currentTarget.checked)}
      label = {
        <>
          <span style={{ textDecoration: props.isDone ? 'line-through' : 'none' }}>{props.text}</span>
        </>
      }
    />
  );
};

export default doneTaskForm;
