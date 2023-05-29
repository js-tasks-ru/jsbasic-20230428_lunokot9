function highlight(table) {
    for (tr of table.tBodies[0].rows) {
        if (!tr.cells[3].dataset.available) {
            tr.hidden = true;
        } else {
            let trStatusClass = (tr.cells[3].dataset.available === 'true') ? 'available' : 'unavailable';
            tr.classList.add(trStatusClass);
        }
        
        let trGenderClass = (tr.cells[2].textContent == 'm') ? 'male' : 'female';
        tr.classList.add(trGenderClass);

        if (Number(tr.cells[1].textContent) < 18) tr.style.textDecoration = 'line-through';
    }
}
