import styled from 'styled-components';
import ApiHelper from '../APIHelper.js';
import React, { useEffect, useState } from 'react';

import { darkSber } from '@sberdevices/plasma-tokens/themes';
import { Button } from '@sberdevices/ui/components/Button/Button';
import { Container } from '@sberdevices/plasma-ui/components/Grid';
import { Image } from '@sberdevices/ui/components/Image/Image';
import { Link } from "react-router-dom";
//base64, 
const Wrapper = styled.div`
    @media screen and (min-width: 1538px)  {
        max-width: 70vw;
        margin: 0 auto;
        img {
            max-height: 60vh;
        }
    }

    @media screen and (max-width: 1200px){
        max-width: 90vw;
        margin: 0 auto;
        #top img{
            max-height: 30vh;
        }
    }

    @media screen and (min-width: 1120px) and (max-width: 1536px){
        max-width: 75vw;
        margin: 0 auto;
        #top img{
            max-height: 47vh;
        }
    }

    @media screen and (min-width: 0px) and (max-width: 1118px){
        max-width: 85vw;
        margin: 0 auto;
        #top img{
            max-height: 50vh;
        }
    }


    font-family:'Noto Sans HK', sans-serif;

    .copyright{
        color:#999;
    }
    .sources{
        display: flex;
        justify-content: space-between;
        width: 80%;
    }
    .sources a{
        text-decoration: none;
        color:#003569;
        text-transform: uppercase;
        font-size: 14px;
    }
`

let currentId = 0

function Page1 ({dispatch, appState}){
    const [animal, setAnimal] = useState([]);

    const fetchedData = async () => {
        return await ApiHelper.getAnimal(currentId);
    }
    
    useEffect(() => {
      fetchedData().then((response) => {
            dispatch({type: "animal_guru", options: response.data.options})

            const data = response.data;
            setAnimal(data.options);
        })
    }, []);

    const moveTo = () =>  {
        ((currentId+1) >= 20) ? currentId = 0 : currentId += 1;
        
        fetchedData().then((response) => {
            const data  = response.data;
            dispatch({type: "animal_guru", options: data.options})
            dispatch({type: "total_tasks", total_tasks: currentId+1})
            setAnimal(data.options);
        })
    }

    useEffect(() => {
        if(appState.validness == 1){
          moveTo()
        }
      }, [appState.validness])

    useEffect(() => {
        if(appState.redirect == 2 && appState.next_task == 1){
            moveTo()
        }
    }, [appState.next_task])

    useEffect(() => {
        console.log("SAKFJLKSAJKFL:SAJFSL:SAKFJSKA")
        if(appState.start_g == 1){
          currentId = 0;
          
        }
      }, [appState.start_g])

    const Back = () => {
        dispatch({type: "event", event: "main"})
        dispatch({type: "redirect", redirect: 0})
    }
    
    return(
        <>
        <Wrapper style={{ marginTop: '20px'}}>
            <Image id="top" src={animal.img_url}></Image>
        </Wrapper>
            <Container>  
                <Button style={{ marginTop: '20px'}} onClick={() => moveTo()}>Следующее животное</Button>
                <Button style={{ marginTop: '20px'}} onClick={Back}>Меню</Button>
             </Container>
        </>
     ) }

export default Page1
