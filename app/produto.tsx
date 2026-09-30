import React from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function Produto() {
  const { nome, preco } = useLocalSearchParams();
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>

      <Text style={styles.logo}>amazon</Text>

      <Text style={styles.titulo}>Detalhes do produto</Text>

      <Text style={styles.nome}>{nome}</Text>

      <Text style={styles.preco}>{preco}</Text>

      <TouchableOpacity
        style={styles.botao}
        onPress={() => router.back()}
      >
        <Text style={styles.textoBotao}>Voltar</Text>
      </TouchableOpacity>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f3f3',
    padding: 20,
    alignItems: 'center',
  },

  logo: {
    backgroundColor: '#131921',
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    width: '100%',
    textAlign: 'center',
    padding: 15,
  },

  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 40,
    marginBottom: 30,
  },

  nome: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },

  preco: {
    fontSize: 20,
    marginBottom: 30,
  },

  botao: {
    backgroundColor: '#ffd814',
    padding: 12,
    borderRadius: 5,
    width: 150,
    alignItems: 'center',
  },

  textoBotao: {
    fontWeight: 'bold',
  },
});