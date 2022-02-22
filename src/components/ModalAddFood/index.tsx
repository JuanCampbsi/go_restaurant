import React, { useRef, useCallback, useState } from 'react';

import { FiCheckSquare } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from './styles';
import Modal from '../Modal';
import Input from '../Input';
import InputFile from '../InputFile';

interface IFoodPlate {
  id: number;
  name: string;
  image: string;
  price: string;
  description: string;
  available: boolean;
}

interface ICreateFoodData {
  name: string;
  image: string;
  price: string;
  description: string;
}

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleAddFood: (food: Omit<IFoodPlate, 'id' | 'available'>) => void;
}

const ModalAddFood: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  handleAddFood,
}) => {
  const formRef = useRef<FormHandles>(null);
  const [newData, setNewData] = useState('');

  const selectFile = (value: any) => {
    let element: any = document.querySelector('input[type="file"]');

    const file = value.target.files[0];
    const preview = URL.createObjectURL(file);
    const newPreview = String(preview)
    setNewData(newPreview);
  };


  const handleSubmit = useCallback(
    async (data: ICreateFoodData) => {

      const newDataFormatted = {
        ...data,
        image: newData
      }

      localStorage.setItem('@GoRestaurant:dish', JSON.stringify(newDataFormatted))
      console.log(newDataFormatted)
      handleAddFood(newDataFormatted);
      setIsOpen();
    },
    [handleAddFood, setIsOpen],
  );

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1>Novo Prato</h1>

        <input
          type="file"
          accept="image/*"
          onChange={(value) => selectFile(value)}
        />

        <Input name="name" placeholder="Ex: Moda Italiana" />
        <Input name="price" placeholder="Ex: 19.90" />

        <Input name="description" placeholder="Descrição" />
        <button type="submit" data-testid="add-food-button">
          <p className="text">Adicionar Prato</p>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
};

export default ModalAddFood;
