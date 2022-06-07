import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { 
  MainContainer,
  HeaderContainer,
  FormContainer,
  FormHeader,
  FormGridContainerStyled,
  ButtonStyled
} from './styles';

//@ts-ignore
import logoAgrotis from '../../assets/logoAgrotis.svg';
//@ts-ignore
import name from '../../assets/name.png'
import { Grid, TextField, Typography, Stack, InputLabel, Select, MenuItem, FormControl, InputAdornment, ListItemText, SelectChangeEvent } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Box } from '@mui/system';

interface IProperties {
  id: number;
  nome: string;
  cnpj: string;
}

interface ILaboratories {
  id: number;
  nome: string;
}

function Home() {
  const [values, setValues] = useState({
    infosPropriedade: {
        id: 0,
        nome: '',
        cnpj: '',
    },
    laboratorio: {
        id: 0,
        nome: ''
    }
  });

  const [nome, setNome] = useState('');
  const [dataInicial, setDataInicial] = useState('');
  const [dataFinal, setDataFinal] = useState('');
  const [observacoes, setObservacoes] = useState('');

  const properties: IProperties[] = [
    {
      id: 1,
      nome: 'Fazenda São Joao I',
      cnpj: '00111000000110'
    },
    {
      id: 2,
      nome: 'Fazenda São Joao II',
      cnpj: '00111000000120'
    },
    {
      id: 3,
      nome: 'Fazenda Terra Fria',
      cnpj: '99999000000110'
    },
    {
      id: 4,
      nome: 'Fazenda São Pedro',
      cnpj: '12345678000110'
    },
    {
      id: 5,
      nome: 'Fazenda Coloninha',
      cnpj: '99999999000199'
    },
  ];

  const laboratories: ILaboratories[] = [
    {
      id: 1,
      nome: 'Laboratório Teste I'
    },
    {
      id: 2,
      nome: 'Laboratório Teste II'
    },
    {
      id: 3,
      nome: 'Laboratório Teste III'
    },
    {
      id: 4,
      nome: 'Laboratório Teste IV'
    },
    {
      id: 5,
      nome: 'Laboratório Teste V'
    },
  ];

  const [errorName, setErrorName] = useState(false);
  const [errorProperties, setErrorProperties] = useState(false);
  const [errorLaboratory, setErrorLaboratory] = useState(false);
  const [errorInitialDate, setErrorInitialDate] = useState(false);
  const [errorFinalDate, setErrorFinalDate] = useState(false);

  const handleProperty = (event: any) => {
    const propriedade: IProperties[] = properties.filter((item) => item.id === Number(event.target.value));
    setValues({
      ...values,
      infosPropriedade: { 
        id: propriedade[0].id,
        nome: propriedade[0].nome,
        cnpj: propriedade[0].cnpj
      }
    });
  };

  const handleLaboratory = (event: any) => {
    const laboratorio: ILaboratories[] = properties.filter((item) => item.id === Number(event.target.value));
    setValues({
      ...values,
      laboratorio: { 
        id: laboratorio[0].id,
        nome: laboratorio[0].nome,
      }
    });
  }

  const handleDates = (value: any, type: string) => {
    if (type === 'dataInicial') {
      setDataInicial(new Date(value).toLocaleDateString());
    } else {
      setDataFinal(new Date(value).toLocaleDateString());
    }
  }

  const handleSubmit = () => {
    if (!nome) {
      setErrorName(true);
      return;
    }
    if (!dataInicial) {
      setErrorInitialDate(true);
      return;
    }
    if (!dataFinal) {
      setErrorFinalDate(true);
      return;
    }
    if (!values.infosPropriedade.nome) {
      setErrorProperties(true);
      return;
    }
    if (!values.laboratorio.nome) {
      setErrorLaboratory(true);
      return;
    }

    const data = {
      nome: nome,
      dataInicial: new Date(dataInicial).toISOString(),
      dataFinal: new Date(dataFinal).toISOString(),
      infosPropriedades: {
        id: values.infosPropriedade.id,
        nome: values.infosPropriedade.nome,
      },
      cnpj: values.infosPropriedade.cnpj,
      laboratorio: {
        id: values.laboratorio.id,
        nome: values.laboratorio.nome,
      },
      observacoes: observacoes
    };

    console.log(data);
    toast.success('Cadastro realizado com sucesso!');
  }

  return (
      <MainContainer>
        <HeaderContainer>
          <img src={logoAgrotis} alt="Logo" />
          <img src={name} alt="AGROTIS" />
        </HeaderContainer>
        <FormContainer>
          <FormHeader>
            <Typography fontFamily="Roboto" fontSize={20} color="#fff">Teste front-end</Typography>
            <Box>
              <ButtonStyled variant="text" onClick={() => handleSubmit()}>Salvar</ButtonStyled>
            </Box>
          </FormHeader>
          <FormGridContainerStyled container >
            <Grid item xs={6} p="1rem">
              <TextField 
                required
                error={errorName}
                id="name"
                label="Nome"
                variant="standard"
                sx={{ width: '100%' }}
                color="success"
                inputProps={{
                  maxlength: 40
                }}
                value={nome}
                onChange={(e) => {
                  setNome(e.target.value),
                  setErrorName(false)
                }}
              />
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <InputAdornment position="start" sx={{ mt: 1.5 }}>
                  <Typography color="red" fontSize={12}>{errorName && 'Error'}</Typography>
                </InputAdornment>
                <InputAdornment position="end" sx={{ mt: 1.5 }}>
                  <Typography fontSize={12}>{`${nome.length} / 40`}</Typography>
                </InputAdornment>
              </Box>
            </Grid>
            <Grid item xs={3} p="1.5rem" mb="0.7rem">
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Stack spacing={3}>
                  <DatePicker
                    views={['day']}
                    label="Data inicial"
                    value={dataInicial}
                    onChange={(newValue) => {
                      handleDates(newValue, "dataInicial")
                    }}
                    renderInput={(params) => 
                      <TextField
                        {...params}
                        error={errorInitialDate}
                        variant="standard"
                        required
                        sx={{ width: '95%' }}
                        color="success"
                        helperText={errorInitialDate && 'Error'}
                      />}
                  />
                </Stack>
              </LocalizationProvider>
            </Grid>
            <Grid item xs={3} p="1.5rem" mb="0.7rem">
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Stack spacing={3}>
                  <DatePicker
                    views={['day']}
                    label="Data final"
                    value={dataFinal}
                    onChange={(newValue) => {
                      handleDates(newValue, "dataFinal")
                    }}
                    renderInput={(params) => 
                      <TextField
                        {...params}
                        error={errorFinalDate}
                        variant="standard"
                        required
                        sx={{ width: '100%' }}
                        color="success"
                        helperText={errorFinalDate && 'Error'}
                      />}
                  />
                </Stack>
              </LocalizationProvider>
            </Grid>
          </FormGridContainerStyled>
          <FormGridContainerStyled container >
            <Grid item xs={6} p="1rem">
              <FormControl variant="standard" sx={{ m: 1, width: '100%' }} color="success">
                <InputLabel id="demo-simple-select-label">Propriedades</InputLabel>
                <Select
                  required
                  error={errorProperties}
                  id="properties"
                  onChange={(event) => handleProperty(event)}
                  renderValue={(value) => <ListItemText primary={values.infosPropriedade.nome} />}
                >
                  {properties.map((item) => {
                    return (
                      <MenuItem value={item.id}>
                        <ListItemText
                          primary={item.nome}
                          secondary={`CNPJ: ${item.cnpj}`}
                        />
                      </MenuItem>    
                    )
                  })}
                </Select>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <InputAdornment position="start" sx={{ mt: 2 }}>
                    <Typography fontSize={12}>{ values.infosPropriedade.cnpj && `CNPJ: ${values.infosPropriedade.cnpj}` }</Typography>
                  </InputAdornment>
                  <InputAdornment position="end" sx={{ mt: 1.5 }}>
                    <Typography color="red" fontSize={12}>{errorProperties && 'Error'}</Typography>
                  </InputAdornment>
                </Box>
              </FormControl>
            </Grid>
            <Grid item xs={6} p="1rem" mb="1rem">
              <FormControl variant="standard" sx={{ m: 1, width: '100%' }} color="success">
                <InputLabel id="demo-simple-select-label">Laboratorio</InputLabel>
                <Select
                  required
                  error={errorLaboratory}
                  id="laboratory"
                  onChange={(event) => handleLaboratory(event)}
                >
                  {laboratories.map((item) => {
                    return (
                      <MenuItem value={item.id}>{item.nome}</MenuItem>    
                    )
                  })}
                </Select>
              </FormControl>
            </Grid>
          </FormGridContainerStyled>
          <FormGridContainerStyled container >
            <Grid item xs={12} p="1rem">
              <TextField
                multiline
                maxRows={4}
                id="observations"
                label="Observações"
                variant="standard"
                sx={{ width: '100%' }}
                color="success"
                inputProps={{
                  maxlength: 1000
                }}
                value={observacoes}
                onChange={(e) => setObservacoes(e.target.value)}
              />
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <InputAdornment position="end" sx={{ mt: 2 }}>
                  <Typography fontSize={12}>{`${observacoes.length}/1000`}</Typography>
                </InputAdornment>
              </Box>
            </Grid>
          </FormGridContainerStyled>
        </FormContainer>
      </MainContainer>
    );
}

export default Home;