import styled from 'styled-components';

export const Container = styled.div`
    padding: 20px;
    background-color: #f8f9fa;
    border-radius: 5px;
    max-width: 600px;
    margin: 20px auto;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

export const Title = styled.h2`
    text-align: center;
    color: #343a40;
    margin-bottom: 20px;
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

export const Select = styled.select`
    padding: 10px;
    border: 1px solid #ced4da;
    border-radius: 5px;
    font-size: 16px;
`;

export const Input = styled.input`
    padding: 10px;
    border: 1px solid #ced4da;
    border-radius: 5px;
    font-size: 16px;
`;

export const Button = styled.button`
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;

    &:hover {
        background-color: #0056b3;
    }
`;

export const BreweryList = styled.div`
    margin-top: 20px;
`;

export const BreweryCard = styled.div`
    background-color: white;
    padding: 15px;
    margin-bottom: 10px;
    border-radius: 5px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
`;

export const BreweryName = styled.h3`
    margin: 0;
    color: #007bff;
`;

export const BreweryInfo = styled.p`
    margin: 5px 0;
`;
