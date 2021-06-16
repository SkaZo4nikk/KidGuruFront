import ApiHelper from '../APIHelper.js'
import React, { useEffect, useState } from 'react';
import { TextBox } from '@sberdevices/ui/components/TextBox/TextBox'
import { darkSber } from '@sberdevices/plasma-tokens/themes';
import { Button } from '@sberdevices/ui/components/Button/Button';
import { Container } from '@sberdevices/plasma-ui/components/Grid';
import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";

let currentId = 0;

function Page0({dispatch, appState}) {
    const [items, setItems] = useState([]);

    const fetchedData = async (id, next) => {
        return await ApiHelper.getMathGuru(id, next);
    }
    
    useEffect(() => {
      fetchedData(currentId, 0).then((response) => {
            dispatch({type: "math_guru", task: response.data})
            const  data  = response.data;
            setItems(data);
        })
    }, []);

    const moveTo = (nextId) =>  {
        fetchedData(nextId, 0).then((response) => {
            const data  = response.data;
            dispatch({type: "math_guru", task: data})
            setItems(data);
        })
        dispatch({type: "redirect", redirect: 1})
    }

    useEffect(() => {
      if(appState.total_tasks >= 20){
        fetchedData(0,1)
      }
      else if(appState.redirect == 1 && appState.next_task == 1){
        moveTo(1)
      }
    }, [appState.next_task])

    useEffect(() => {
      if(appState.validness == 1){
        moveTo(1)
      }
    }, [appState.validness])



    const Back = () => {
      dispatch({type: "event", event: "main"})
      dispatch({type: "redirect", redirect: 0})
    }

    const Next = () => {
      dispatch({type: "next_task", next_task: 1})
    }

  return (
    <>
      <Container styles={darkSber}>
        <div class="progress">
          <p>Прогресс: {appState.solved} / 20</p>
        </div>
        <div class="math" style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '1'}}>
          <p>{items.first_arg} {items.operator} {items.second_arg}= ?</p>
        </div>
        <Button style={{ marginBottom: '20px'}} onClick={()=>Next()}>Следующий пример</Button>
        <Button onClick={Back}><Link to='/'>Меню</Link></Button>
      </Container>
    </>
  );
}



export default Page0
