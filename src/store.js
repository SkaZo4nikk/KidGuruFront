export const reducer = (state, action) => {
    function correct(lhs, rhs){
      return lhs == rhs ? 1 : 0
    }

    switch (action.type) {
      case "math_guru":
        return{
          ...state,
          task: action.task,
          next_task: 0,
          redirect: 1,
          solved: 0,
          total_tasks: (action.task.task_num % 20)
        }

      case "animal_guru":
        return{
          ...state,
          animal: action.options,
          next_task: 0,
          solved: 0,
          redirect: 2
        }

      case "next_task":
        return{
          ...state,
          next_task: 1
        }

      case "answer_given":
        if(state.task){
          return {
            ...state,
            validness: correct(state.task.result, action.number),
            solved: solved + correct(state.task.result, action.number)
          };
        };

      case "animal_given":
        if(state.animal){
          return{
            ...state,
            validness: correct(state.animal.name, action.animal),
            solved: solved + correct(state.task.result, action.number)
          };
        };
      
      case "redirect":
        return{
          ...state,
          redirect: action.redirect,
        }
  
      default:
        throw new Error();
    }
  };
