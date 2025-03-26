import React, { useState } from "react"

const AgeCalculator = () => {

        const[birthdate, setbirthdate] = useState('')
        const[age, setage] = useState(null)

        //function que calcula idade
        const calculateAge = () => {
            const birthDate = new Date(birthdate); //converte o input em um objeto data
            const today = new Date(); //pega a data atual

            const yearDiff = today.getFullYear() - birthDate.getFullYear();
            const monthDiff = today.getMonth() - birthDate.getMonth();
            const daysDiff =  today.getDate() -  birthDate.getDate();

            let ageYears = yearDiff;
            let ageMonths = monthDiff;
            let ageDays = daysDiff;

            //casos onde o dia ou o mês do aniversário ainda não aconteceu no ano corrente
            if(daysDiff < 0){
                const lastMonth = new Date(today.getFullYear(), today.getMonth()-1, birthDate.getDate());
                ageMonths -= 1;
                ageDays = Math.floor((today - lastMonth)/(24 * 60 * 1000));
            }
            if(monthDiff<0){
                ageYears -=1;
                ageMonths +=12;
            }

            //set idade calculado no state
           setage({
            years: ageYears,
            months: ageMonths,
            days: ageDays,
           });
            

        };

    return(
        <div className="age-calculator">
            <h1>Calculadora de Idade - React JS</h1>
            <input type="date" value={birthdate} onChange={(e)=>{
                //Garante que só seja aceito 10 caracteres no input
                if(e.target.value.length<= 10){
                    setbirthdate(e.target.value);
                }

            }}
            max="9999-12-31"//seta o maximo permitido para datas
            min="0000-01-01"//seta o mínimo permitido para datas
            />
            {/*Botão para trigger function calculadora de idade*/ }
            <button onClick={calculateAge}>Calcular</button>

            {/*Estrutura para mostrar o resultado "display"*/}
            {age && (
                <div className="result">
                    <p>Você tem {age.years} anos, {age.months} meses, e {age.days} dias de idade!</p>
                </div>
            )}
            
        </div>
    )
}

export default AgeCalculator