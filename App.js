import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Switch,
  StatusBar,
  Modal,
  Alert
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Slider from '@react-native-community/slider';
import { MaskService } from 'react-native-masked-text';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      age: '',
      gender: 0,
      genders: [
        { key: 0, nome: 'Selecione seu gênero' },
        { key: 1, nome: 'Feminino' },
        { key: 2, nome: 'Masculino' },
        { key: 3, nome: 'Transgênero' },
        { key: 4, nome: 'Não-binário' },
        { key: 5, nome: 'Outros' },
      ],
      creditLimit: 100,
      isStudent: false,

      modalInfoChecked: false,
      modalNoHaveInfo: false,
    };
  }

  checkInfos() {
    if (this.state.name != '' && this.state.age != '' && this.state.gender != 0) {
      this.setState({ modalInfoChecked: true })
    } else {
      this.setState({ modalNoHaveInfo: true })
    }
  }

  renderModalInfoChecked() {
    let student = this.state.isStudent ? 'Sim' : 'Não';
    if (this.state.modalInfoChecked) {
      return (
        <View style={styles.centeredView}>
          <Modal
            animationType="fade"
            transparent={true}
            visible={this.state.modalInfoChecked}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.textCongratulations}>Parabéns, seus dados foram confirmados!</Text>
                <View>
                  <Text style={styles.textModalInfoChecked}>Nome: {this.state.name}</Text>
                  <Text style={styles.textModalInfoChecked}>Idade: {this.state.age}</Text>
                  <Text style={styles.textModalInfoChecked}>Gênero: {this.state.genders[this.state.gender].nome}</Text>
                  <Text style={styles.textModalInfoChecked}>Estudante: {student}</Text>
                  <Text style={styles.textModalInfoChecked}>Limite de Crédito: {MaskService.toMask(
                    'money',
                    this.state.creditLimit,
                    {
                      precision: 2,
                      separator: ',',
                      delimiter: '.',
                      unit: 'R$ ',
                      suffixUnit: ''
                    })
                  }</Text>
                </View>
                <TouchableOpacity
                  style={styles.btn}
                  onPress={() => {
                    this.setState({ modalInfoChecked: false })
                  }}
                >
                  <Text style={styles.textStyle}>Fechar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      )
    }
  }

  renderModalNoHaveInfo() {
    if (this.state.modalNoHaveInfo) {
      return (
        <View style={styles.centeredView}>
          <Modal
            animationType="fade"
            transparent={true}
            visible={this.state.modalNoHaveInfo}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>Por favor, verifique os campos de Nome, Idade ou Gênero e preencha corretamente.</Text>

                <TouchableOpacity
                  style={styles.btn}
                  onPress={() => {
                    this.setState({ modalNoHaveInfo: false })
                  }}
                >
                  <Text style={styles.textStyle}>Preencher Campos</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      )
    }
  }

  render() {
    let genderItem = this.state.genders.map((value, key) => {
      return <Picker.Item key={key} value={key} label={value.nome} />
    })

    let colorPicker = this.state.gender == 0 ? '#c5c9cf' : '#3c4158';

    let student = this.state.isStudent ? 'Você confirma que é estudante' : 'Você não é estudante';
    let thumbColor = this.state.isStudent ? '#3757df' : '#c5c9cf';

    return (
      <ScrollView showsHorizontalScrollIndicator={false} contentContainerStyle={{ flex: 1, backgroundColor: '#1d2238' }}>
        <StatusBar backgroundColor="#1d2238" />
        <View style={styles.container}>
          <Image style={styles.imageBank} source={require('./src/image/bank-of-america-logo.png')} />
          <Text style={styles.createAccount}>Informe os dados para criar a conta</Text>
          <View style={styles.cardInfo}>
            <TextInput
              style={styles.textInpuName}
              placeholder={'Seu nome'}
              placeholderTextColor={'#c5c9cf'}
              returnKeyType='next'
              onChangeText={text => this.setState({ name: text })}
              onSubmitEditing={() => { this.ageTextInput.focus(); }}
              blurOnSubmit={false}
              value={this.state.name}
              maxLength={50}
            />
            <TextInput
              style={styles.textInpuAge}
              placeholder={'Sua Idade'}
              placeholderTextColor={'#c5c9cf'}
              keyboardType='numeric'
              maxLength={3}
              ref={(input) => { this.ageTextInput = input; }}
              onChangeText={text => this.setState({ age: text })}
              value={this.state.age}
            />


            <Picker
              style={[styles.picker, { color: colorPicker }]}
              dropdownIconColor={'#3757df'}
              selectedValue={this.state.gender}
              itemStyle={{ color: '#3c4158' }}
              onValueChange={(itemValue, itemIndex) => this.setState({ gender: itemValue })} >
              {genderItem}
            </Picker>

            <View style={styles.line} />
            <View style={styles.containerStudy}>
              <Text style={styles.textIsStudent}>Você é estudante?</Text>
              <Switch
                style={styles.switch}
                thumbColor={thumbColor}
                trackColor={{ true: '#96a6ec', false: '#e2e7f8' }}
                value={this.state.isStudent}
                onValueChange={(valueSwitch) => this.setState({ isStudent: valueSwitch })}
              />
            </View>
            <Text style={styles.textStudent}>{student}</Text>

          </View>

          <View style={[styles.cardInfo, { marginTop: 26 }]}>
            <Text style={styles.textLimit}>Selecione o Limite que deseja :</Text>
            <Slider
              style={{ marginTop: 16 }}
              minimumValue={100}
              maximumValue={3000}
              onValueChange={(valueSelected) => this.setState({ creditLimit: valueSelected })}
              value={this.state.creditLimit}
              step={100}
              thumbTintColor={'#3757df'}
              minimumTrackTintColor={'#96a6ec'}
            />
            <Text style={styles.textLimitValue}>seu limite será de: {MaskService.toMask(
              'money',
              this.state.creditLimit,
              {
                precision: 2,
                separator: ',',
                delimiter: '.',
                unit: 'R$ ',
                suffixUnit: ''
              })
            }</Text>

          </View>
          <TouchableOpacity style={styles.btn} onPress={() => this.checkInfos()}>
            <Text style={styles.textBtn}>Abrir Conta</Text>
          </TouchableOpacity>
          {this.renderModalNoHaveInfo()}
          {this.renderModalInfoChecked()}
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#f2f4f8',
    paddingTop: 50,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  imageBank: {
    height: 30,
    width: 300
  },
  createAccount: {
    textAlign: 'center',
    marginTop: 26,
    color: '#86909b',
    fontSize: 16
  },
  cardInfo: {
    width: '90%',
    marginTop: 46,
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 20,
    shadowColor: "#e2e7f8",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textInpuName: {
    height: 40,
    fontWeight: '500',
    fontSize: 16,
    color: '#3c4158'
  },
  textInpuAge: {
    height: 40,
    marginTop: 16,
    fontWeight: '500',
    fontSize: 16,
    color: '#3c4158'
  },
  picker: {
    marginTop: 16,
    width: '103%',
    alignSelf: 'center'
  },
  line: {
    height: 1,
    backgroundColor: '#c5c9cf',
    width: '99%',
    marginTop: 16
  },
  containerStudy: {
    marginTop: 20,
    flexDirection: 'row'
  },
  textIsStudent: {
    fontSize: 16,
    color: '#3c4158'
  },
  switch: {
    alignSelf: 'center',
    marginLeft: 10,
    bottom: 3
  },
  textStudent: {
    fontSize: 16,
    color: '#3c4158',
    marginTop: 12
  },
  textLimit: {
    marginTop: 12,
    fontSize: 16,
    color: '#3c4158'
  },
  textLimitValue: {
    marginTop: 12,
    textAlign: 'center',
    fontSize: 16,
    color: '#3c4158'
  },
  btn: {
    width: '90%',
    marginTop: 26,
    padding: 16,
    backgroundColor: '#3757df',
    borderRadius: 20,
    shadowColor: "#c0cbf3",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textBtn: {
    textAlign: 'center',
    fontSize: 16,
    color: 'white'
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 16,
    color: '#3c4158'
  },
  textCongratulations: {
    fontSize: 22,
    color: '#3c4158',
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 15
  },
  textModalInfoChecked: {
    marginBottom: 10,
    textAlign: 'left',
    fontSize: 16,
    color: '#3c4158'
  },
})

export default App;
