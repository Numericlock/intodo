// ./containers/App.jsx
import {
  connect,
} from 'react-redux'

import TaskAddModal from '../../../views/components/task_add_modal'
import Actions from '../app_actions'

const mapStateToProps = (state) => {
  return state
}
const mapDispatchToProps = (dispatch) => {
  return {
    handleTodoAdd(value) {
      dispatch(Actions.addTodo(value))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskAddModal)

