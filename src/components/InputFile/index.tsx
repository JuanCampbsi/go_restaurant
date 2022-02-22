import React, {
} from 'react';


import { Container } from './styles';

interface ButtonProps{
  onChange: (value: any) => void;
}


const InputFile = ({onChange, ...rest}: ButtonProps) => {
  return (
    <Container >

    </Container>
  );
};

export default InputFile;
