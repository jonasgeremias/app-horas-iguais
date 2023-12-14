
import horas from './horas'
import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
  Grid,
} from "@mui/material";


const HorasComponent = () => {
  const [inputText, setInputText] = useState("");
  const [resultado, setResultado] = useState("");

  const handleInputChange = (event) => {
    // Permitir que o caractere ":" seja inserido
    setInputText(event.target.value);
  };

  const handleBuscarClick = () => {
    // Remover o caractere ":" antes de pesquisar
    const inputValueWithoutColon = inputText.replace(/:/g, "");
    const mensagem = horas[inputValueWithoutColon] || "Código não encontrado.";
    setResultado(mensagem);
  };

  return (
    <Container maxWidth="sm">
      <Box mt={4}>

        
        
        <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} p>
          <Typography variant="h2" align="center">
            Qual é a hora ?
          </Typography>
        </Grid>
        
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Digite a hora (formato HH:MM)"
              variant="outlined"
              value={inputText}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              fullWidth
              variant="contained"
              onClick={handleBuscarClick}
            >
              Buscar
            </Button>
          </Grid>
          {resultado && (
            <Grid item xs={12}>
              <Box mt={2}>
                <Typography variant="h2" align="center">
                  {resultado}
                </Typography>
              </Box>
            </Grid>
          )}
        </Grid>
      </Box>
    </Container>
  );
};

export default HorasComponent;