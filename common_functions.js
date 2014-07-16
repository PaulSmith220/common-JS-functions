// Возвращает название месяца по его номеру (от нуля, как возвращает Date.getMonth())
Number.prototype.toMonthName = function () {
    var month = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
    'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

    return month[this];
};

// Отдаёт индеск элемента в массиве, у которого свойство property = value
Array.prototype.indexByPropertyValue = function (property, value) {
    for (var i = 0, l = this.length; i < l; i++) {
        if (this[i][property] == value) {
            return i;
        }
    }
    return false;
}

// Вставляет element в массив после элемента с указанным индексом. Возвращает новый массив.
Array.prototype.insertAfter = function (element, index) {
    var a = this.slice(0, index + 1);
    var b = this.slice(index + 1);
    return a.concat(element).concat(b);
};

// Получение последнего элемента массива
Array.prototype.getLast = function () {
    return this[this.length-1];
}

// Перемещение элемента массива
Array.prototype.move = function (old_index, new_index) {
    if (new_index >= this.length) {
        var k = new_index - this.length;
        while ((k--) + 1) {
            this.push(undefined);
        }
    }
    this.splice(new_index, 0, this.splice(old_index, 1)[0]);
    return this;
};

// Генератор Guid-ов
Math.Guid = function () {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
};

Math.NullGuid = '00000000-0000-0000-0000-000000000000';

// Снимает выделение со всех элементов страницы
function clearSelection() {
    if (document.selection && document.selection.empty) {
        document.selection.empty();
    } else if (window.getSelection) {
        var sel = window.getSelection();
        sel.removeAllRanges();
    }
};

//  ----------------------[ DateTime ]-----------------------
// Возвращает число дней в месяце данной даты. 
Date.prototype.daysInMonth = function () {
    return (new Date(this.getFullYear(), this.getMonth() + 1, 0)).getDate();
};

// Возвращает день недели строкой
Date.prototype.dayOfMonthString = function () {
    //var arr = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];
    var arr = ["Вс.", "Пн.", "Вт.", "Ср.", "Чт.", "Пт.", "Сб."];
    return arr[this.getDay()];
};

// Убирает timezone offset
Date.prototype.prepareDateToSend = function (date) {
    var x = (new Date(date));
    x = new Date(x.setHours(x.getHours() + x.getTimezoneOffset() / 60));
    return x;
}

//  Возвращает последний день месяца
Date.prototype.LastDayOfMonth = function () {
    var year = this.getFullYear();
    var month = this.getMonth();
    return new Date(year, month + 1, 0).getDate();
};

// Возвращает ближайший понедельник
Date.prototype.toNearestMonday = function () {
    var day = this.getDay();
    if (day == 1) {
        return this;
    }
    var offset = [2,3,4,5,6,0].indexOf(day);
    if (offset < 3) { // Двигаем влево
        offset++;
        this.setDate(this.getDate() - offset);
    } else {          // Двигаем вправо
        offset = 6 - offset;
        this.setDate(this.getDate() + offset);
    }
    return this;
}

//----------------------------------------------------------