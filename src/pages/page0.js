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

    const fetchedData = async (id) => {
        return await ApiHelper.getMathGuru(id);
    }
    
    useEffect(() => {
      fetchedData(0).then((response) => {
            dispatch({type: "math_guru", task: response.data})
            const  data  = response.data;
            setItems(data);
        })
    }, []);

    const moveTo = () =>  {
        fetchedData(0).then((response) => {
            const data  = response.data;
            dispatch({type: "math_guru", task: data})
            setItems(data);
        })
    }

    useEffect(() => {
      if(appState.total_tasks >= 10){
        dispatch({type: "redirect", redirect: 3})
        fetchedData(1)
      }
      else if(appState.redirect == 1 && appState.next_task == 1){
        moveTo(1)
      }
    }, [appState.next_task])

    const Back = () => {
      dispatch({type: "redirect", redirect: 0})
    }

  return (
    <>
      <Container styles={darkSber}>
        <div class="math" style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '1'}}>
          <p>{items.first_arg} {items.operator} {items.second_arg}= ?</p>
        </div>
        <Button style={{ marginBottom: '20px'}} onClick={()=>moveTo()}>Следующий пример</Button>
        <Button onClick={Back}><Link to='/'>На главную</Link></Button>
      </Container>
    </>
  );
}



export default Page0
