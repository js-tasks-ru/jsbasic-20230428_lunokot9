/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
    elem = null;
    #rows = '';

    constructor(rows) {
        this.#rows = rows;

        this.elem = this.#render();
    }

    #render() {
        const element = document.createElement('table');
        element.innerHTML = this.#template();

        element.addEventListener('click', this.#deleteRow);

        return element;
    }

    #deleteRow(event) {
        const eventElement = event.target;
        if (eventElement.tagName != 'BUTTON') return;
        eventElement.closest('tr').remove();
    }

    #template() {
        return `
        <thead>
            <tr>
                <th>Имя</th>
                <th>Возраст</th>
                <th>Зарплата</th>
                <th>Город</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            ${this.#rows.map(item => `<tr>
                <td>${item.name}</td>
                <td>${item.age}</td>
                <td>${item.salary}</td>
                <td>${item.city}</td>
                <td><button type="button">X</button></td>
            </tr>`).join('\n')}
        </tbody>
        `;
    }
}
