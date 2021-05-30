import APIHelper from './APIHelper'


export const reducer = (state, action) => {
    function correct(lhs, rhs){
      return lhs == rhs ? 1 : 0
    }

    switch (action.type) {
      case "math_guru":
        return{
          ...state,
          task: action.task,
          validness: 0,
          next_task: 0,
          redirect: 1
        }

      case "animal_guru":
        return{
          ...state,
          animal: action.options,
          validness: 0,
          next_task: 0,
          redirect: 2
        }

      case "next_task":
        return{
          ...state,
          next_task: 1
        }

      case "redirect":
        return{
          ...state,
          redirect: action.redirect
        }

      case "answer_given":
        if(state.task){
          return {
            ...state,
            validness: correct(state.task.result, action.number)
          };
        };

      case "animal_given":
        if(state.animal){
          return{
            ...state,
            validness: correct(state.animal.name, action.animal)
          };
        };
      
      // case "redirect":
      //   return{
      //     ...state,
      //     redirect: action.redirect,
      //   }
  
      default:
        throw new Error();
    }
  };
