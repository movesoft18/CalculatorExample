/* eslint-disable prettier/prettier */
class CalculatorHelper {
    operand1 = 0;       // операнд 1
    operand2 = 0;       // операнд 2
    operation = 0;      // знак операции
    source = '0';       // источник ввода
    stage = 0;          // 0, 1  - ввод 1 операнда
                        // 2 - ввод 2 операнда, операция определена
                        // 3 - вычислен результат, операция не определена
                        // 4 - состояние ошибки
    canInputOperation = false; // признак возможности ввести операцию

    constructor(){
        this.clear();   // чистим состояние
    }

    // метод сброса
    clear(){
        this.operand1 = 0;
        this.operand2 = 0;
        this.operation = 0;
        this.source = '0';
        this.stage = 0;
        this.canInputOperation = false;
        return this.source;
    }

    getSource() {
        return this.source;
    }

    setSource(value){
        this.source = value;
    }

    isError(){ // возвращает логический статус ошибки
        return this.stage === 4;
    }

    // возвращает возможность ввести разделитель целой и дробной части числа
    decimalSeparatorExists(){
        return this.source.indexOf('.') !== -1;
    }

    // вычисление результата операции
    calculate(){
        switch (this.operation){
            case '+': return this.operand1 + this.operand2;
            case '-': return this.operand1 - this.operand2;
            case '*': return this.operand1 * this.operand2;
            case '%':
                if (this.operand2 !== 0){           // проверяем на деление на 0
                    return this.operand1 % this.operand2;
                }
                this.stage = 4;                     // выставляем ошибку
                return 'Error - division by zero';  // возвращаем текст ошибки
            case '/':
                if (this.operand2 !== 0){           // проверяем на деление на 0
                    return this.operand1 / this.operand2;
                }
                this.stage = 4;                     // выставляем ошибку
                return 'Error - division by zero';  // возвращаем текст ошибки
                //break;
        }
        return undefined;
    }

    // обработка нажатия кнопки '='
    doEqualPress(){
        let displayResult = this.source;
        switch (this.stage) {
            case 0:                                            // это режимы, где кнопка = не действует
            case 1:
            case 3:
            case 4:
                break;
            case 2:
                this.stage = 3;                                // устанавливаем режим статуса "результат"
                this.operand2 = parseFloat(this.source);       // преобразуем 2 операнд в число
                if (isNaN(this.operand2)){                     // если ощибка то устанавливаем флаг ошибки и выходим
                    displayResult = 'Error';
                    this.stage = 4;
                    break;
                }
                displayResult = this.calculate();               // вычисляем результат
                this.source = displayResult.toString();         // источник ввода устанавливаем равным результату, чтобы при последующей операции можно было его взять за основу нового операнда
                this.canInputOperation = true;                  // разрешаем ввод операций
        }
        return displayResult;
    }

    // обработка операций
    doOperation(op) {
        let displayResult = this.source;
        if (op === '-' && this.source === '0' && this.stage !== 4){     // если нажат унарный минус и нет ошибки и источник не определен - разрешаем вводить отрицательное число в источник
            return this.addChar('-');                                   // вызываем метод добавления символа к источнику
        }
        if (this.canInputOperation) {                                   // если операции на данном шаге разрешены - обрабатываем их
            switch (this.stage) {
                case 0:
                case 1:
                // eslint-disable-next-line no-fallthrough
                case 3:                                                 // данные режимы подразумевают, что необходимо взять первый операнд из источника
                    this.stage = 2;                                     // переключаем режим для следующего шага
                    this.operand1 = parseFloat(this.source);            // извлекаем  1 операнд
                    if (isNaN(this.operand1)){                          // провераем на ошибку
                        displayResult = 'Error';
                        this.stage = 4;
                        break;
                    }
                    this.operation = op;                                // запоминаем операцию
                    this.source = '0';                                  // очищаем источник для ввода следующего операнда
                    this.canInputOperation = false;                     // запрещаем вводить несколько операций подряд, за исключением унарного минуса
                    break;
                case 2:                                                 // режим ввода 2 операнда одновременно с вычислением результата и вводом новой операции
                    this.operand2 = parseFloat(this.source);            // получаем 2-й операнд
                    if (isNaN(this.operand2)){                          // проверем на ошибку
                        displayResult = 'Error';
                        this.stage = 4;
                        break;
                    }
                    displayResult = this.calculate();                   // вычисляем выражение
                    if (this.stage !== 4) {                             // если ОК, то получаем первый операнд из результата - готовимся к новому вычислению без нажатия клавиши "="
                        this.operand1 = parseFloat(displayResult);
                        this.operation = op;                            // запомнаем новую операцию
                        this.source = '0';                              // очищаем источник для нового ввода
                    }
                    this.canInputOperation = false;                     // запрещаем повторный ввод операций за исключением унарного минуса.
                    break;
            }
        }
        return displayResult;
    }

    // добавление нового символа к источнику
    addChar(value){
        if (this.stage !== 4) {                         // если режим ошибки - то игнорируем все до сброса
            if (this.stage === 3){                      // если вычислен результат и юзер жмет числа - то сбрасываем состояние и открываем новый ввод
                this.clear();
            }
            if (value === '.' || value === ',') {       // если символ - десятичный сепаратор, то проверяем можем ли его ввести
                if (this.decimalSeparatorExists()) {
                    return this.source;
                }
                if (this.source.length === 0) {         // если источник пустой, до дописываем к нему 0
                    this.source = '0';
                }
                this.source = this.source + '.';        // добавляем десятичный сепаратор
                return this.source;
            }
            if (value === '-'){                         // если введен унарный минус в начале числа, до дописываем его
                if (this.source === '0'){
                    this.source = '-' + this.source;
                }
                return this.source;
            }
            if (this.source === '0') {                  // предотвращаем ввод незначащих нулей
                this.source = '';
                if (value === '00') value = '0';
            }
            if (this.source === '-0') {                 // если отрицательное число, то заменяем 0 значащей цифрой
                this.source = '-';
                if (value === '00') value = '0';
            }
            this.source += value;                       // добавляем символ к источнику
        }
        this.canInputOperation = true;                  // после ввода числа разрешаем ввод операции
        return this.source;
    }

    eraseLastChar() {
        if (this.stage !== 4){                      // если ошибка то игнорируем ввод до сброса
            if (this.stage === 3){                  // если режим полученного ответа, то сбрасываем источник
                this.clear();
            }
            if (this.source.length > 0) {           // если длина источника не нулевая, то удаляем символ с конца
                this.source = this.source.slice(0, -1); // delete last char
            }
            if (this.source.length === 0 || (this.source.length === 1 && this.source[0] === '-')) {     // если  удалили все или остался один "-" - сбрасываем источник в 0
                this.source = '0';
            }
        }
        return this.source;
    }

}

var calculatorHelper = new CalculatorHelper();

export default calculatorHelper;
