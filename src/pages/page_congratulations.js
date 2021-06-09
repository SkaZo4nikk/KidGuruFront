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


function Congratulations({appState}) {


    const Back = () => {
        dispatch({type: "redirect", redirect: 0})
    }


    return (
    <>        
        <div class="math" style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '1'}}>
          <p>{appState.solved} '/' {appState.total_tasks}</p>
        </div>
        <Button onClick={Back}><Link to='/'>На главную</Link></Button>
    </>
    );
}



export default Congratulations
