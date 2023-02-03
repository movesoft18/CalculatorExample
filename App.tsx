/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import calculatorHelper from './src/classes/CalculateHelper';

const numbers = ['0','00','1','2','3','4','5','6','7','8','9',','];
const operations = ['-','+','*','/','%'];

const App = () => {
  const [screenText, setScreenText] = useState('0');

  function handleKeyPress(char: string)
  {
    let action = '0';
    if (numbers.indexOf(char) !== -1){
      action = calculatorHelper.addChar(char);
    } else if (operations.indexOf(char) !== -1){
      action = calculatorHelper.doOperation(char);
    } else if (char === '='){
      action = calculatorHelper.doEqualPress();
    } else if (char === 'D'){
      action = calculatorHelper.eraseLastChar();
    } else if (char === 'C'){
      action = calculatorHelper.clear();
    }
    setScreenText(action);
  }

  return (
    <View style={styles.mainView}>
      <View style={styles.resultView}>
        <Text style={styles.screenText}>{screenText}</Text>
      </View>
      <View style={styles.buttonsView}>
        <View style={styles.buttonsRow}>
          <TouchableOpacity style={[styles.button,{backgroundColor:'lightpink'}]} onPress={()=>handleKeyPress('C')}>
            <Text style={styles.buttonText}>C</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button,{backgroundColor:'palegreen'}]} onPress={()=>handleKeyPress('%')}>
            <Text style={styles.buttonText}>%</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button,{backgroundColor:'lightpink'}]} onPress={()=>handleKeyPress('D')}>
            <Text style={styles.buttonText}>⌫</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button,{backgroundColor:'palegreen'}]} onPress={()=>handleKeyPress('/')}>
            <Text style={styles.buttonText}>÷</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonsRow}>
          <TouchableOpacity style={[styles.button,{backgroundColor:'lightskyblue'}]} onPress={()=>handleKeyPress('7')}>
            <Text style={styles.buttonText}>7</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button,{backgroundColor:'lightskyblue'}]} onPress={()=>handleKeyPress('8')}>
            <Text style={styles.buttonText}>8</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button,{backgroundColor:'lightskyblue'}]} onPress={()=>handleKeyPress('9')}>
            <Text style={styles.buttonText}>9</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button,{backgroundColor:'palegreen'}]} onPress={()=>handleKeyPress('*')}>
            <Text style={styles.buttonText}>×</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonsRow}>
          <TouchableOpacity style={[styles.button,{backgroundColor:'lightskyblue'}]} onPress={()=>handleKeyPress('4')}>
            <Text style={styles.buttonText}>4</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button,{backgroundColor:'lightskyblue'}]} onPress={()=>handleKeyPress('5')}>
            <Text style={styles.buttonText}>5</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button,{backgroundColor:'lightskyblue'}]} onPress={()=>handleKeyPress('6')}>
            <Text style={styles.buttonText}>6</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button,{backgroundColor:'palegreen'}]} onPress={()=>handleKeyPress('-')}>
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonsRow}>
          <TouchableOpacity style={[styles.button,{backgroundColor:'lightskyblue'}]} onPress={()=>handleKeyPress('1')}>
            <Text style={styles.buttonText}>1</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button,{backgroundColor:'lightskyblue'}]} onPress={()=>handleKeyPress('2')}>
            <Text style={styles.buttonText}>2</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button,{backgroundColor:'lightskyblue'}]} onPress={()=>handleKeyPress('3')}>
            <Text style={styles.buttonText}>3</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button,{backgroundColor:'palegreen'}]} onPress={()=>handleKeyPress('+')}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonsRow}>
          <TouchableOpacity style={[styles.button,{backgroundColor:'lightskyblue'}]} onPress={()=>handleKeyPress('0')}>
            <Text style={styles.buttonText}>0</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button,{backgroundColor:'lightskyblue'}]} onPress={()=>handleKeyPress('00')}>
            <Text style={styles.buttonText}>00</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button,{backgroundColor:'lightskyblue'}]} onPress={()=>handleKeyPress(',')}>
            <Text style={styles.buttonText}>,</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button,{backgroundColor:'palegreen'}]} onPress={()=>handleKeyPress('=')}>
            <Text style={styles.buttonText}>=</Text>
          </TouchableOpacity>
        </View>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    padding: 5,
  },
  resultView: {
    flex: 1,
    margin: '2%',
    padding: '10%',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 20,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },

  screenText: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  buttonsView: {
    flex: 20,
  },

  buttonsRow: {
    flexDirection: 'row',
    height: '20%',
    alignContent: 'space-between',
  },

  button: {
    flex: 1,
    borderRadius: 20,
    height: '90%',
    marginHorizontal: '1%',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 10,
  },

  buttonText: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 30,
  },
});

export default App;
