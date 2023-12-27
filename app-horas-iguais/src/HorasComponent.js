
import horas from './horas'
import React, { useEffect, useState } from "react";
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

  // useEffect(() => {
  //   // Obtém a hora atual
  //   const now = new Date();
  //   const hours = now.getHours();
  //   const minutes = now.getMinutes();
    
    
  //   // Formata a hora no formato 'HHMM'
  //   const formattedTime = `${String(hours).padStart(2, '0')}${String(minutes).padStart(2, '0')}`;

  //   // Verifica se há uma chave correspondente à hora atual no objeto JSON
  //   if (horas.hasOwnProperty(formattedTime)) {
  //     // Define o estado com o texto correspondente à hora atual
  //     setResultado(formattedTime + ': ' + horas[formattedTime]);
  //   } else {
  //     // Se não houver uma correspondência exata, você pode adotar uma lógica de fallback aqui
  //     setResultado('Não há previsão disponível para este momento.');
  //   }
  // }, []); // A dependência vazia garante que este efeito ocorra apenas uma vez, quando o componente é montado
  useEffect(() => {
    const getHoraMaisProxima = () => {
      // Obtém a hora atual
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();

      // Formata a hora no formato 'HHMM'
      const horaFormatada = `${String(hours).padStart(2, '0')}${String(minutes).padStart(2, '0')}`;

      // Obtém todas as chaves (horas) do objeto
      const horaKeys = Object.keys(horas);

      // Encontra a chave mais próxima à hora atual
      const horaMaisProxima = horaKeys.reduce((prevHora, currHora) => {
        const prevDiff = Math.abs(Number(prevHora) - Number(horaFormatada));
        const currDiff = Math.abs(Number(currHora) - Number(horaFormatada));
        return currDiff < prevDiff ? currHora : prevHora;
      });

      // Retorna o texto correspondente à hora mais próxima
      return  horaMaisProxima + ': ' + horas[horaMaisProxima];
    };

    // Obtém o resultado mais próximo ao carregar a página
    const resultadoMaisProximo = getHoraMaisProxima();

    // Define o estado com o resultado
    setResultado(resultadoMaisProximo);
  }, []); // A dependência vazia garante que este efeito ocorra apenas uma vez, quando o componente é montado

  
  
  
  const handleInputChange = (event) => {
    // Permitir que o caractere ":" seja inserido
    setInputText(event.target.value);
  };

  const handleBuscarClick = () => {
    // Remover o caractere ":" antes de pesquisar
    const inputValueWithoutColon = inputText.replace(/:/g, "");
    const mensagem = horas[inputValueWithoutColon] || "Código não encontrado.";
    setResultado(inputValueWithoutColon + ': ' + mensagem);
  };
  
  const handleTypographyClick = () => {
    // Seleciona o texto dentro do elemento Typography
    const textToCopy = document.getElementById('result_id').innerText;

    // Cria um elemento de área de transferência temporário
    const tempTextArea = document.createElement('textarea');
    tempTextArea.value = textToCopy;

    // Adiciona o elemento à página
    document.body.appendChild(tempTextArea);

    // Seleciona e copia o texto dentro da área de transferência temporária
    tempTextArea.select();
    document.execCommand('copy');

    // Remove o elemento da página
    document.body.removeChild(tempTextArea);

    // Informa ao usuário que o texto foi copiado
    alert('Texto copiado para a área de transferência');
  };

  return (
    <Container maxWidth="md">
      <Box mt={4}>
        <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} p>
          <Typography variant="h4" align="center">
            Horas Iguais e Invertidas. Digite e clique em procurar.
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
                <Typography variant="h2" align="center" id="result_id" onClick={handleTypographyClick}>
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