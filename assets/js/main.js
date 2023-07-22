const btn = document.getElementById('btn_generate')
const inputs = document.querySelectorAll('input')

const years = document.getElementById('years')
const months = document.getElementById('months')
const days = document.getElementById('days')

let dataInput = []

btn.addEventListener('click', () => {
    inputs.forEach( (input) => {
        input.nextElementSibling.innerText = ''

        if(input.value == ''){
            input.nextElementSibling.innerText = 'Esse campo é obrigatório'
            mudarExibicao(input)
        } else if(input.name == 'day' && input.value > 31 || input.name == 'year' && input.value.length != 4  || input.name == 'month' && input.value > 12) {
            input.nextElementSibling.innerText = 'Valor invalido'
            mudarExibicao(input)
        } else

        dataInput.push(input.value)
    })

    dataInput.length == 3 ? calcularData(dataInput) : console.log('Preencha todos os campos corretamente')
})

function calcularData(data){
    const dataHoje = new Date();
    let dataConvertida = converterData(data, 0, 1)

    dataConvertida = new Date(dataConvertida)

    let dias = dataHoje.getDate() - dataConvertida.getDate()
    let meses = dataHoje.getMonth() - dataConvertida.getMonth()
    let anos = dataHoje.getFullYear() - dataConvertida.getFullYear()

    if (dias < 0) {
        dias += 31
        meses --;
    }

    if (meses < 0 || (meses === 0 && dias < dataConvertida.getDate())) {
        anos--
        meses < 0 ? meses += 12 : meses = 0
    }

    

    years.firstChild.innerText = anos
    months.firstChild.innerText = meses
    days.firstChild.innerText = dias

    dataInput = []
}

function converterData(arr, from, to) {
    arr.splice(to, 0, arr.splice(from, 1)[0]);

    return arr.join('/');
}

function mudarExibicao(input){

    input.classList.add('inputRequired')
    input.labels[0].classList.add('labelRequired')

    input.addEventListener('focus', () => {
        input.nextElementSibling.innerText = ''
        input.classList.remove('inputRequired')
        input.labels[0].classList.remove('labelRequired')
    }) 
}