//Dates de filtro

const today = new Date();

function formatDate(date = new Date()) {
  const year = date.toLocaleString('default', {year: 'numeric'});
  const month = date.toLocaleString('default', {
    month: '2-digit',
  });
  const day = date.toLocaleString('default', {day: '2-digit'});

  return [year, month, day].join('-');
}


function getFirstDayOfWeek(d) {
  const date = new Date(d);
  const day = date.getDay();
  const diff = date.getDate() - day + (day === 0 ? -6 : 1);
  return new Date(date.setDate(diff));
}

const firstDay = getFirstDayOfWeek(today);
const lastDay = new Date(firstDay);
const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

lastDay.setDate(lastDay.getDate() + 6);

//Variables

let totalGastado = 0;
let gastosItemList = "";
const resumenGastoLabel = document.querySelector("body > div > div.expenses-resume > h2 > span");

//Función de filtro
function filterExpensesByDate(startDate, endDate, element) {
    fetch(`/expenses/filterData?startDate=${startDate}&endDate=${endDate}`)
      .then(response => response.json())
      .then(data => {
        let totalGastado = 0;
        gastosItemList = "";
        data.forEach(expense => {
          const listItem = document.createElement('li');
          listItem.textContent = `${expense.date} - ${expense.concept} - ${expense.amount.toFixed(2)}`;
          totalGastado = totalGastado + expense.amount;
          gastosItemList = gastosItemList +
          `
          <div class="expenses-list-item">
          <div class="expenses-list-item-img">
              <img src="/images/${expense.icon}.png" width="24px">
          </div>
          <div class="expenses-list-item-label">
              <p class="expenses-list-item-label-concept">${expense.concept}</p>
              <p class="expenses-list-item-label-category">${expense.name}</p>
          </div>
          <div class="expenses-list-item-detail">
              <p class="expenses-list-item-detail-price">- S/ ${expense.amount.toFixed(2)}</p>
              <p class="expenses-list-item-detail-date">${expense.fec.split('-')[2]}/${expense.fec.split('-')[1]}</p>
          </div>
          </div>
          `
        });
        resumenGastoLabel.innerText = totalGastado.toFixed(2);
        document.querySelector('.expenses-list-item-group').innerHTML = gastosItemList;
      })
      .catch(error => console.error('Error:', error));
}

//console.log(totalGastado);

filterExpensesByDate(formatDate(firstDay),formatDate(lastDay));


//Botones de filtros /expenses
const expFilterDay   = document.querySelector("#exp-dia-filter");
const expFilterWeek  = document.querySelector("#exp-semana-filter"); 
const expFilterMonth = document.querySelector("#exp-mes-filter");
const expFilterYear  = document.querySelector("#exp-ano-filter");
const firstDayOfYear = new Date(today.getFullYear(), 0, 1);

//Función para limpiar todos los estilos de los filtros

let limpiarEstilosFiltros = () => {
  document.querySelector('.expenses-dates').querySelectorAll('a').forEach(function(element,i){
    element.querySelector('div').style.backgroundColor = 'rgba(255, 255, 255,0.3)';
  });
  document.querySelector('.expenses-list-item-group').innerHTML = '';
}

expFilterDay.addEventListener("click", (event) => {
  limpiarEstilosFiltros();
  expFilterDay.querySelector('div').style.backgroundColor = 'rgba(255, 255, 255)';
  filterExpensesByDate(formatDate(today),formatDate(today));
});

expFilterWeek.addEventListener("click", (event) => {
  limpiarEstilosFiltros();
  expFilterWeek.querySelector('div').style.backgroundColor = 'rgba(255, 255, 255)';
  filterExpensesByDate(formatDate(firstDay),formatDate(lastDay));
});

expFilterMonth.addEventListener("click", (event) => {
  limpiarEstilosFiltros();
  expFilterMonth.querySelector('div').style.backgroundColor = 'rgba(255, 255, 255)';
  filterExpensesByDate(formatDate(firstDayOfMonth),formatDate(lastDayOfMonth));
});

expFilterYear.addEventListener("click", (event) => {
  limpiarEstilosFiltros();
  expFilterYear.querySelector('div').style.backgroundColor = 'rgba(255, 255, 255)';
  filterExpensesByDate(formatDate(firstDayOfYear),formatDate(today));
});