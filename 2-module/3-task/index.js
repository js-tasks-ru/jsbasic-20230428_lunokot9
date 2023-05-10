let calculator = {
    num1: null,
    num2: null,
    read: function(a, b) {
        this.num1 = a;
        this.num2 = b;
    },
    sum: function() {
        return this.num1 + this.num2;
    },
    mul: function() {
        return this.num1 * this.num2;
    }
};

// НЕ УДАЛЯТЬ СТРОКУ, НУЖНА ДЛЯ ПРОВЕРКИ
window.calculator = calculator; // делает ваш калькулятор доступным глобально
