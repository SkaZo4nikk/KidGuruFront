export const reducer = (state, action) => {
    function correct(lhs, rhs){
      return lhs == rhs ? 1 : 0
    }

    switch (action.type) {
      case "start_math":
        return{
          ...state,
          start: action.start
        }

      case "math_guru":
        return{
          ...state,
          task: action.task,
          next_task: 0,
          solved: (state.solved) ? state.solved : 0,
          total_tasks: action.task.task_num,
          validness: 0,
          start: 0
        }

      case "solved":
        return{
          ...state,
          solved: action.solved
        }

      case "animal_guru":
        return{
          ...state,
          animal: action.options,
          next_task: 0,
          solved: (state.solved) ? state.solved : 0,
          redirect: 2,
          validness: 0,
          total_tasks: 0
        }

      case "total_tasks":
        return{
          ...state,
          total_tasks: action.total_tasks
        }

      case "next_task":
        return{
          ...state,
          next_task: 1
        }

      case "answer_given":
        console.log("smh")
        if(state.task){
          return {
            ...state,
            validness: correct(state.task.result, action.number),
            solved: state.solved + correct(state.task.result, action.number)
          };
        };

      case "animal_given":
        if(state.animal){
          return{
            ...state,
            validness: correct(state.animal.name, action.animal),
            solved: state.solved + correct(state.animal.name, action.animal)
          };
        };
      
      case "redirect":
        return{
          ...state,
          redirect: action.redirect,
        }

      case "event":
        return{
          ...state,
          event: action.event 
        }
  
      default:
        throw new Error();
    }
  };
