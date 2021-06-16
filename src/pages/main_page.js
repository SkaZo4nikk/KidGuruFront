import ApiHelper from '../APIHelper.js'
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { darkSber } from '@sberdevices/plasma-tokens/themes';
import { Button } from '@sberdevices/ui/components/Button/Button';
import { Container } from '@sberdevices/plasma-ui/components/Grid';
import { Image } from '@sberdevices/ui/components/Image/Image';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

const Wrapper = styled.div`
  padding-top: 15%;
  margin: 0 auto;
`


const MainPage = ({dispatch}) =>{
  
    useEffect(() => {
        dispatch({type: "redirect", redirect: 0})
      }, []);

      const MathGuru = () => {
        dispatch({type: "start_math", start: 1})
      }
  
      const AnimalGuru = () => {
        dispatch({type: "start_animal", start_g: 1})
      }

    return(
        <Container>
            <Wrapper>
              <h1>
                <span>K</span>
                <span>I</span>
                <span>D</span>
                <span>G</span>
                <span>U</span>
                <span>R</span>
                <span>U</span>
              </h1>
            </Wrapper>
            <Button style={{ marginBottom: '20px'}} onClick={MathGuru}><Link to='/math_guru'>Math Guru</Link></Button>
            <Button onClick={AnimalGuru}><Link to='/g_animal'>Guess Animal</Link></Button>
        </Container>
    )
}

export default MainPage
