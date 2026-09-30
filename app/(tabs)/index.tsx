import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
  Linking,
} from 'react-native';
import * as Location from 'expo-location';
import { useRouter } from 'expo-router';

export default function Index() {
  const [pesquisa, setPesquisa] = useState('');
  const [carrinho, setCarrinho] = useState<string[]>([]);
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);

  const router = useRouter();

  const produtos = [
    { id: '1', nome: 'Fone Bluetooth', preco: 'R$ 89,90' },
    { id: '2', nome: 'Teclado Gamer', preco: 'R$ 129,90' },
    { id: '3', nome: 'Mouse sem fio', preco: 'R$ 59,90' },
    { id: '4', nome: 'Smartwatch', preco: 'R$ 199,90' },
  ];

  function adicionarCarrinho(nome: string) {
    setCarrinho([...carrinho, nome]);
  }

  function removerCarrinho(nome: string) {
    setCarrinho(carrinho.filter(item => item !== nome));
  }

  async function descobrirLocalizacao() {
    const { status } =
      await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
      alert('Permissão de localização negada!');
      return;
    }

    const location = await Location.getCurrentPositionAsync({});

    setLatitude(location.coords.latitude);
    setLongitude(location.coords.longitude);
  }

  const produtosFiltrados = produtos.filter(produto =>
    produto.nome.toLowerCase().includes(pesquisa.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.logo}>amazon</Text>

        <Text style={styles.carrinho}>
          🛒 {carrinho.length}
        </Text>
      </View>

      <View style={styles.pesquisaArea}>
        <TextInput
          style={styles.input}
          placeholder="Pesquisar produtos"
          value={pesquisa}
          onChangeText={setPesquisa}
        />

        <TouchableOpacity style={styles.botaoPesquisa}>
          <Text style={styles.textoBotao}>🔍</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.categorias}>
        <Text style={styles.categoria}>Eletrônicos</Text>
        <Text style={styles.categoria}>Casa</Text>
        <Text style={styles.categoria}>Games</Text>
        <Text style={styles.categoria}>Ofertas</Text>
      </View>

      {/* LOCALIZAÇÃO */}
      <View style={styles.localizacao}>
        <Text style={styles.localizacaoTitulo}>
          📍 Entregas perto de você
        </Text>

        <TouchableOpacity
          style={styles.botaoLocalizacao}
          onPress={descobrirLocalizacao}
        >
          <Text style={styles.textoLocalizacao}>
            Usar minha localização
          </Text>
        </TouchableOpacity>

        {latitude !== null && longitude !== null && (
          <View>
            <Text style={styles.coordenadas}>
              Localização encontrada!
            </Text>

            <TouchableOpacity
              onPress={() =>
                Linking.openURL(
                  `https://www.google.com/maps?q=${latitude},${longitude}`
                )
              }
            >
              <Text style={styles.mapa}>
                Ver localização no mapa
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <Text style={styles.titulo}>Produtos em destaque</Text>

      <FlatList
        data={produtosFiltrados}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.produto}>

            <View style={styles.informacoes}>
              <Text style={styles.nome}>{item.nome}</Text>
              <Text style={styles.preco}>{item.preco}</Text>

              <TouchableOpacity
                style={styles.detalhes}
                onPress={() =>
                  router.push({
                    pathname: '/produto',
                    params: {
                      nome: item.nome,
                      preco: item.preco,
                    },
                  })
                }
              >
                <Text>Ver produto</Text>
              </TouchableOpacity>
            </View>

            <View>
              <TouchableOpacity
                style={styles.adicionar}
                onPress={() => adicionarCarrinho(item.nome)}
              >
                <Text>Adicionar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.remover}
                onPress={() => removerCarrinho(item.nome)}
              >
                <Text>Remover</Text>
              </TouchableOpacity>
            </View>

          </View>
        )}
      />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f3f3',
    padding: 15,
  },

  header: {
    backgroundColor: '#131921',
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  logo: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
  },

  carrinho: {
    color: 'white',
    fontSize: 18,
  },

  pesquisaArea: {
    flexDirection: 'row',
    marginTop: 10,
  },

  input: {
    flex: 1,
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 5,
  },

  botaoPesquisa: {
    backgroundColor: '#febd69',
    width: 50,
    marginLeft: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },

  textoBotao: {
    fontSize: 20,
  },

  categorias: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    padding: 15,
    marginTop: 10,
  },

  categoria: {
    fontWeight: 'bold',
  },

  /* LOCALIZAÇÃO */

  localizacao: {
    backgroundColor: 'white',
    padding: 15,
    marginTop: 10,
    borderRadius: 5,
  },

  localizacaoTitulo: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  botaoLocalizacao: {
    backgroundColor: '#ffd814',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },

  textoLocalizacao: {
    fontWeight: 'bold',
  },

  coordenadas: {
    marginTop: 10,
    fontSize: 14,
  },

  mapa: {
    color: '#007185',
    marginTop: 5,
    fontWeight: 'bold',
  },

  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },

  produto: {
    backgroundColor: 'white',
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 5,
  },

  informacoes: {
    flex: 1,
    marginRight: 10,
  },

  nome: {
    fontSize: 17,
    fontWeight: 'bold',
  },

  preco: {
    fontSize: 16,
    marginTop: 5,
    marginBottom: 8,
  },

  detalhes: {
    backgroundColor: '#e7e7e7',
    padding: 8,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },

  adicionar: {
    backgroundColor: '#ffd814',
    padding: 8,
    borderRadius: 5,
  },

  remover: {
    backgroundColor: '#ddd',
    padding: 8,
    borderRadius: 5,
    marginTop: 5,
  },
});