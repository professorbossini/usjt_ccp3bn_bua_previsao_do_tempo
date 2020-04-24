import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList, Keyboard } from 'react-native';
import PrevisaoItem from './components/PrevisaoItem';

export default function App() {

  const endPoint = "https://api.openweathermap.org/data/2.5/forecast?lang=pt_br&units=metric&cnt=5&q=";
  const apiKey = "d60bfb3ab6ba21d51404b86eb00cb592";

  const [cidade, setCidade] = useState('');
  const [previsoes, setPrevisoes] = useState([]);


  const obterPrevisoes = () => {
    setPrevisoes([]);
    const target = endPoint + cidade + "&appid=" + apiKey;
    fetch(target)
      .then((dados) => dados.json())
      .then((dados) => {
        setPrevisoes(dados["list"]);
      });
    Keyboard.dismiss();
  }

  const capturarCidade = (cidade) => {
    setCidade(cidade);
  }


  return (
    <View style={styles.container}>
      <View style={styles.entrada}>
        <TextInput
          style={styles.nomeCidade}
          placeholder="Digite o nome da cidade"
          value={cidade}
          onChangeText={capturarCidade}
        />
        <Button
          title="Ok"
          onPress={obterPrevisoes}
        />
      </View>
      <FlatList
        data={previsoes}
        renderItem={
          (previsao) => (<PrevisaoItem previsao={previsao}></PrevisaoItem>)
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  nomeCidade: {
    padding: 10,
    borderBottomColor: '#CCC',
    borderBottomWidth: 2,
    textAlign: 'left',
    flexGrow: 0.9
  },
  entrada: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8
  },
  container: {
    padding: 40,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
