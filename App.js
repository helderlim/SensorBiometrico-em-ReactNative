import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Alert, TouchableOpacity, SafeAreaView, TextInput, Platform, Modal } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';


export default function App() {

  const  [isModalVisible, setIsModalVisible] = useState(true)

  async function authenticate(){
    const hasPassword = await LocalAuthentication.isEnrolledAsync();

    if(!hasPassword) return;

    const {success, error} = await LocalAuthentication.authenticateAsync()
    
    if(success){
      Alert.alert('Realizada com sucesso');
    }else{
      Alert.alert('autenticação falhou');
    }

    setIsModalVisible(false);

  }

  Platform.OS =='ios' && authenticate()

  return (
    
   <SafeAreaView style={styles.container}>
     <TextInput style={styles.input} 
     placeholder="Email"
     placeholderTextColor="#444"
     />
     <TextInput 
     style={styles.input}
      placeholder="Senha"
      placeholderTextColor="#444"
     />

     <TouchableOpacity style={styles.button}> 
     <Text >Entrar</Text>
     </TouchableOpacity>
    {
      Platform.OS ==='android' && (
        <Modal 
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onShow={authenticate}
        >
          <View style={styles.modal}>
            <Text style={styles.authText} >autenticação digital </Text>
            <TouchableOpacity onPress={() =>{
            LocalAuthentication.cancelAuthenticate();
            setIsModalVisible(false);
          }}>
            <Text style={styles.cancelText}>Cancelar</Text>
          </TouchableOpacity>
          </View>

          
        </Modal>
      )
    }

   </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#19181f',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input:{
    width:200,
    height:45,
    borderWidth: 2,
    borderColor:'#7159c1',
    borderRadius: 5,
    marginBottom:10,
    padding:10,
  },
  button:{
    width:200,
    height:45,
    borderWidth:2,
    borderColor:'#7159c1',
    backgroundColor: '#7159c1',
    borderRadius: 5,
    marginBottom:10,
    padding:10,
    justifyContent:'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: '#333',
    position:'absolute',
    left:0,
    right:0,
    bottom:0,
    justifyContent: 'center',
    alignItems: 'center',
    height: '40%',
  },
  cancelText:{
    color:'red',
    fontSize: 16,
  },
  
  authText: {
    color:'white',
    fontSize: 16,
  }
});
