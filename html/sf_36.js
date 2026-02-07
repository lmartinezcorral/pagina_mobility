
const sf36Data = [
  {
    sectionTitle: "Sección 1: Salud General",
    questions: [
      {
        questionText: "¿En general, ¿usted diría que su salud es?",
        options: ["Excelente", "Muy buena", "Buena", "Regular", "Mala"],
      },
      {
        questionText: "¿Cómo diría que es su salud actual, comparada con la de hace un año?",
        options: [
          "Mucho mejor ahora que hace un año",
          "Algo mejor ahora que hace un año",
          "Más o menos igual que hace un año",
          "Algo peor ahora que hace un año",
          "Mucho peor ahora que hace un año",
        ],
      },
      {
        questionText: "Creo que gozo de buena salud",
        options: ["Totalmente de acuerdo", "De acuerdo", "No lo sé", "En desacuerdo", "Totalmente en desacuerdo"],
      },
      {
        questionText: "Me parece que mi salud va a empeorar",
        options: ["Totalmente de acuerdo", "De acuerdo", "No lo sé", "En desacuerdo", "Totalmente en desacuerdo"],
      },
      {
        questionText: "Mi salud es tan buena como la de cualquier persona que conozco",
        options: ["Totalmente de acuerdo", "De acuerdo", "No lo sé", "En desacuerdo", "Totalmente en desacuerdo"],
      }
      
    ],
  },


  {
    sectionTitle: "Sección 2: Función Física",
    questions: [   
    {
        questionText: "Su salud actual, ¿le limita para hacer esfuerzos intensos, tales como correr, levantar objetos pesados, o participar en deportes agotadores?",
        options: ["Sí, me limita mucho", "Sí, me limita un poco", "No, no me limita nada"],
      },
    {
        questionText: "Su salud actual, ¿le limita para hacer esfuerzos moderados, como mover una mesa, pasar la aspiradora, jugar a los bolos o caminar más de una hora?",
        options: ["Sí, me limita mucho", "Sí, me limita un poco", "No, no me limita nada"],
      },
    {
        questionText: "Su salud actual, ¿le limita para coger o llevar la bolsa de la compra?",
        options: ["Sí, me limita mucho", "Sí, me limita un poco", "No, no me limita nada"],
      },
    {
        questionText: "Su salud actual, ¿le limita para subir varios pisos por la escalera?",
        options: ["Sí, me limita mucho", "Sí, me limita un poco", "No, no me limita nada"],
      },
    {
        questionText: "Su salud actual, ¿le limita para subir un solo piso por la escalera?",
        options: ["Sí, me limita mucho", "Sí, me limita un poco", "No, no me limita nada"],
      },
      {
        questionText: "Su salud actual, ¿le limita para agacharse o arrodillarse?",
        options: ["Sí, me limita mucho", "Sí, me limita un poco", "No, no me limita nada"],
      },
      {
        questionText: "Su salud actual, ¿le limita para caminar un kilómetro o más?",
        options: ["Sí, me limita mucho", "Sí, me limita un poco", "No, no me limita nada"],
      },
      {
        questionText: "Su salud actual, ¿le limita para caminar varias manzanas (varios centenares de metros)?",
        options: ["Sí, me limita mucho", "Sí, me limita un poco", "No, no me limita nada"],
      },
      {
        questionText: "Su salud actual, ¿le limita para caminar una sola manzana (unos 100 metros)",
        options: ["Sí, me limita mucho", "Sí, me limita un poco", "No, no me limita nada"],
      },
      {
        questionText: "Su salud actual, ¿le limita para bañarse o vestirse por sí mismo?",
        options: ["Sí, me limita mucho", "Sí, me limita un poco", "No, no me limita nada"],
      }
      // ... Preguntas de la Sección 2 ...
    ],
  },
  
  {
    sectionTitle: "Sección 3: Rol Físico",
    questions: [
        {
                questionText: "Durante las últimas 4 semanas, ¿tuvo que reducir el tiempo dedicado al trabajo o a sus actividades cotidianas a causa de su salud física?",
                options: ["Sí", "No"],
         },
        {
                questionText: "Durante las últimas 4 semanas, ¿hizo menos de lo que hubiera querido hacer,a causa de su salud física?",
                options: ["Sí", "No"],
        },
        {
            questionText: "Durante las últimas 4 semanas, ¿tuvo que dejar de hacer algunas tareas en su trabajo o en sus actividades cotidianas, a causa de su salud física?",
            options: ["Sí", "No"],
     },
    {
            questionText: "Durante las últimas 4 semanas, ¿tuvo dificultad para hacer su trabajo o sus actividades cotidianas (por ejemplo, le costó más de lo normal), a causa de su salud física?",
            options: ["Sí", "No"],
    }
      // ... Preguntas de la Sección 3 ...
    ],
},

{
  sectionTitle: "Sección 4: Dolor Corporal",
  questions: [
{
    questionText: "¿Tuvo dolor en alguna parte del cuerpo durante las 4 últimas semanas?",
    options: ["Ningún dolor", "Dolor muy leve", "Dolor leve", "Dolor moderado", "Dolor intenso", "Dolor muy intenso"],
  },
  {
    questionText: "Durante las últimas 4 semanas, ¿hasta qué punto el dolor le ha dificultado su trabajo habitual (incluido el trabajo fuera de casa y las tareas domésticas?",
    options: ["Nada", "Un poco", "Moderadamente",  "Mucho", "Extremadamente"],
  }
  //preguntas dolor corporal 
    ],
},

{
  sectionTitle: "Sección 5: Vitalidad",
  questions: [
{
  questionText: "¿Se ha sentido lleno de energía durante las últimas 4 semanas?",
  options: ["Siempre", "Casi siempre", "Muchas veces", "Algunas veces", "Sólo alguna vez", "Nunca"],
},
{
  questionText: "¿Se ha sentido con mucha vitalidad durante las últimas 4 semanas?",
  options: ["Siempre", "Casi siempre", "Muchas veces", "Algunas veces", "Sólo alguna vez", "Nunca"],
}, 
 {
  questionText: "¿Se ha sentido cansado durante las últimas 4 semanas? ",
  options: ["Siempre", "Casi siempre", "Muchas veces", "Algunas veces", "Sólo alguna vez", "Nunca"],
},
{
  questionText: "¿Se ha sentido débil o exhausto durante las últimas 4 semanas?",
  options: ["Siempre", "Casi siempre", "Muchas veces", "Algunas veces", "Sólo alguna vez", "Nunca"],
} 

 //preguntas vitalidad 
],
},

{
  sectionTitle: "Sección 6: funcion social",
  questions: [
{
        questionText: "¿Hasta qué punto su salud física o sus problemas emocionales han interferido en sus actividades sociales normales con familiares, amigos, vecinos u otras personas durante las últimas 4 semanas?",
        options: ["Todo el tiempo", "La mayor parte del tiempo", "Algo del tiempo", "Poco tiempo", "Nada del tiempo"],
},
{
  questionText: "¿Con qué frecuencia su salud física o sus problemas emocionales le han causado dificultades en sus actividades sociales (como visitar a amigos, parientes, etc.) durante las últimas 4 semanas?",
  options: ["Todo el tiempo", "La mayor parte del tiempo", "Algunas veces", "Pocas veces", "Nunca"],
}
// ...termina  Preguntas de la Sección función social  ...
],
},

{
  sectionTitle: "Sección 7: Rol Emocional",
  questions: [    
   {
            questionText: "Durante las últimas 4 semanas, ¿tuvo que reducir el tiempo dedicado al trabajo o a sus actividades cotidianas a causa de algún problema emocional (como estar triste, deprimido,o nervioso)?",
         options: ["Sí", "No"],
 },
{
            questionText: "Durante las últimas 4 semanas, ¿hizo menos de lo que hubiera querido hacer a causa de algún problema emocional (como estar triste, deprimido, o nervioso)?",
            options: ["Sí", "No"],
},
{
        questionText: "Durante las últimas 4 semanas, ¿no hizo su trabajo o sus actividades cotidianas tan cuidadosamente como de costumbre, a causa de algún problema emocional (como estar triste, deprimido, o nervioso)?",
        options: ["Sí", "No"],
}
      // ...termina  Preguntas de la Sección 4 ...
    ],
},


{
    sectionTitle: "Sección 8: Salud Mental ",
    questions: [ 
  {
    questionText: "¿Durante las últimas 4 semanas, con qué frecuencia se ha sentido muy nervioso?",
    options: ["Siempre", "Casi siempre", "Muchas veces", "Algunas veces", "Sólo alguna vez", "Nunca"],
  },
  {
    questionText: "¿Durante las últimas 4 semanas, con qué frecuencia se ha sentido tan deprimido que nada podía animarlo? ",
    options: ["Siempre", "Casi siempre", "Muchas veces", "Algunas veces", "Sólo alguna vez", "Nunca"],
  },
  {
    questionText: "¿Durante las últimas 4 semanas, con qué frecuencia se ha sentido tranquilo y relajado?",
    options: ["Siempre", "Casi siempre", "Muchas veces", "Algunas veces", "Sólo alguna vez", "Nunca"],
  },
  {
    questionText: "¿Durante las últimas 4 semanas, con qué frecuencia se ha sentido triste o decaído?",
    options: ["Siempre", "Casi siempre", "Muchas veces", "Algunas veces", "Sólo alguna vez", "Nunca"],
  },
  {
    questionText: "¿Durante las últimas 4 semanas, con qué frecuencia se ha sentido feliz?",
    options: ["Siempre", "Casi siempre", "Muchas veces", "Algunas veces", "Sólo alguna vez", "Nunca"],
  },

    //preguntas seccion 8 
],
}
];

const form = document.getElementById("sf36-form");
let globalQuestionNumber = 1;  // Contador global para las preguntas

sf36Data.forEach((section) => {
  const sectionTitle = document.createElement("h2");
  sectionTitle.innerText = section.sectionTitle;
  form.appendChild(sectionTitle);

  section.questions.forEach((q) => {
    const questionId = `question-${globalQuestionNumber}`;
    const label = document.createElement("label");
    label.setAttribute("for", questionId);
    label.innerText = `${globalQuestionNumber}. ${q.questionText}`;  // Usa el contador global para numerar

    const select = document.createElement("select");
    select.setAttribute("id", questionId);
    select.setAttribute("name", questionId);

    q.options.forEach(option => {
      const optionElement = document.createElement("option");
      optionElement.setAttribute("value", option);
      optionElement.innerText = option;
      select.appendChild(optionElement);
    });

    form.appendChild(label);
    form.appendChild(select);
    form.appendChild(document.createElement("br"));

    globalQuestionNumber++;  // Incrementa el contador global
  });
});


function downloadCSV(data, filename) {
    const csv = Papa.unparse(data);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });

    if (navigator.msSaveBlob) {
        // Para IE 10 y versiones anteriores
        navigator.msSaveBlob(blob, filename);
    } else {
        // Para otros navegadores
        const link = document.createElement("a");
        if (link.download !== undefined) {
            const url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", filename);
            link.style.visibility = "hidden";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }
}

function submitForm() {
    const formData = new FormData(document.getElementById("sf36-form"));
    const data = [];
    formData.forEach((value, key) => {
        data.push({ key, value });
    });

    // Descargar el archivo CSV
    const filename = "formulario_sf36.csv";
    downloadCSV(data, filename);
}
console.log("El archivo sf_36.js se está ejecutando correctamente");
