// import { Container } from '@sberdevices/plasma-ui/components/Grid';
import React,{useEffect,useReducer,useRef}  from 'react';
import ApiHelper from './APIHelper.js'

import './App.css';
import MainPage from './pages/main_page'
import Page0 from './pages/page0'
import Page1 from './pages/page1'
import Congratulations from './pages/page_congratulations'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import {
  createSmartappDebugger,
  createAssistant,
} from "@sberdevices/assistant-client";
import {reducer} from './store'


const initializeAssistant = (getState/*: any*/) => {
  if (process.env.NODE_ENV === "development") {
    return createSmartappDebugger({
      token: process.env.REACT_APP_TOKEN ?? "",
      initPhrase: `Запусти ${process.env.REACT_APP_SMARTAPP}`,
      getState,
    });
  }
  return createAssistant({ getState });
};


const App = () => {
  
  const [appState, dispatch] = useReducer(reducer, { redirect: 0 });

  const assistantStateRef = useRef();
  const assistantRef = useRef();

  const fetchedData = async (id, next) => {
    return await ApiHelper.getMathGuru(id, next);
  }


  useEffect(() => {
    if(appState.total_tasks >= 20){
      dispatch({type: "redirect", redirect: 3})
      assistantRef.current?.sendData({ action: { action_id: 'GameOver' }});    
    }
  }, [appState.total_tasks]);

  useEffect(() => {
    if(appState.start == 1){
      fetchedData(0,1)
      dispatch({type: "solved", solved: 0})
      dispatch({type: "next_task", next_task: 1})
      dispatch({type: "redirect", redirect: 1})
    }
  }, [appState.start])

   useEffect(() => {
    if(appState.event == "main"){
      assistantRef.current?.sendData({ action: { action_id: 'MainPage' }});    
    }
    dispatch({type: "event", event: "none"})
  }, [appState.event])


  // useEffect(() => {
  //   if(appState.next_task == 1){
  //     fetchedData(1, 0).then((response) => {
  //       dispatch({type: "math_guru", task: response.data})
  //   })
  //   }
  // }, [appState.next_task]);

  useEffect(() => {
    assistantRef.current = initializeAssistant(() => assistantStateRef.current);

    assistantRef.current.on("data", ({ action }) => {
      if (action) {
        dispatch(action);
      }
    });
    dispatch({type: "redirect", redirect: 7000})
  }, []);

  useEffect(() => {
    assistantStateRef.current = appState
    console.log(assistantStateRef.current)
  }, [appState]);

  useEffect(() => {
    if(appState.redirect == 1){
      assistantRef.current?.sendData({ action: { action_id: 'Math' }});
    }
    if(appState.redirect == 2){
      assistantRef.current?.sendData({ action: { action_id: 'AnimalGuru' }});
    }
  },[appState.redirect])


  const render = () => {
    switch(appState.redirect){
      case 0:
        return(
          <Redirect to='/'/>
        )
      case 1:
        return(
          <Redirect to='/math_guru'/> 
        );
      case 2:
        return(
          <Redirect to='/g_animal'/> 
        );
      case 3:
        return(
          <Redirect to='/congratulations' />
        );
    }
  }

  return(
  <Router>
    { 
      render()
    }
    <Switch>
      <Route path='/congratulations' component={Congratulations}>
        <Congratulations appState={appState} dispatch={dispatch} assistant={assistantRef} />
      </Route>
      <Route path='/main_page' component={MainPage} >
        <MainPage dispatch={dispatch}/>
      </Route>
      <Route path='/math_guru' component={Page0}>
        <Page0 dispatch={dispatch} appState={appState} assistant={assistantRef}></Page0>
      </Route>
      <Route path='/g_animal' component={Page1} >
        <Page1 dispatch={dispatch} appState={appState} assistant={assistantRef}></Page1>
      </Route>
      <Route path='/' exact >
        <Redirect to='/main_page' exact/>
      </Route>
      </Switch>
  </Router>
  )
}

export default App;



// constructor(props) {
  //   super(props);
  //   console.log('constructor');

  //   this.state = {
  //     notes: [],
  //   }
    
  //   this.assistant = initializeAssistant(() => this.getStateForAssistant() );
  //   this.assistant.on("data", (event/*: any*/) => {
  //     console.log(`assistant.on(data)`, event);
  //     const { action } = event
  //     this.dispatchAssistantAction(action);
  //   });
    
  //   this.assistant.on("start", (event) => {
  //     console.log(`assistant.on(start)`, event);
  //   });
  // }

  // componentDidMount() {
  //   console.log('componentDidMount');
  // }

  // getStateForAssistant () {
  //   console.log('getStateForAssistant: this.state:', this.state)
  //   const state = {};
  //   console.log('getStateForAssistant: state:', state)
  //   return state;
  // }

  // dispatchAssistantAction (action) {
  //   console.log('dispatchAssistantAction', action);
  //   if (action) {
  //     switch (action.type) {
  //       case 'add_note':
  //         return this.add_note(action);

  //       case 'done_note':
  //         return this.done_note(action);

  //       default:
  //         throw new Error();
  //     }
  //   }
  // }