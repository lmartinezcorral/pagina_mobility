
const sf36Data = [
  {
    sectionTitle: "Sección 1: Salud General",
    questions: [
      {
        questionText: "1. ¿En general, ¿usted diría que su salud es?",
        options: ["Excelente", "Muy buena", "Buena", "Regular", "Mala"],
      },
      {
        questionText: "2.¿Cómo diría que es su salud actual, comparada con la de hace un año?",
        options: [
          "Mucho mejor ahora que hace un año",
          "Algo mejor ahora que hace un año",
          "Más o menos igual que hace un año",
          "Algo peor ahora que hace un año",
          "Mucho peor ahora que hace un año",
        ],
      },
      // ... Preguntas restantes de la Sección 1 ...
    ],
  },


  {
    sectionTitle: "Sección 2: Función Física",
    questions: [   
    {
        questionText: "3. Su salud actual, ¿le limita para hacer esfuerzos intensos, tales como correr, levantar objetos pesados, o participar en deportes agotadores?",
        options: ["Sí, me limita mucho", "Sí, me limita un poco", "No, no me limita nada"],
      },
    {
        questionText: "4. Su salud actual, ¿le limita para hacer esfuerzos moderados, como mover una mesa, pasar la aspiradora, jugar a los bolos o caminar más de una hora?",
        options: ["Sí, me limita mucho", "Sí, me limita un poco", "No, no me limita nada"],
      },
    {
        questionText: "5. Su salud actual, ¿le limita para coger o llevar la bolsa de la compra?",
        options: ["Sí, me limita mucho", "Sí, me limita un poco", "No, no me limita nada"],
      },
    {
        questionText: "6. Su salud actual, ¿le limita para subir varios pisos por la escalera?",
        options: ["Sí, me limita mucho", "Sí, me limita un poco", "No, no me limita nada"],
      },
    {
        questionText: "7. Su salud actual, ¿le limita para subir un solo piso por la escalera?",
        options: ["Sí, me limita mucho", "Sí, me limita un poco", "No, no me limita nada"],
      },
      {
        questionText: "8. Su salud actual, ¿le limita para agacharse o arrodillarse?",
        options: ["Sí, me limita mucho", "Sí, me limita un poco", "No, no me limita nada"],
      },
      {
        questionText: "9. Su salud actual, ¿le limita para caminar un kilómetro o más?",
        options: ["Sí, me limita mucho", "Sí, me limita un poco", "No, no me limita nada"],
      },
      {
        questionText: "10. Su salud actual, ¿le limita para caminar varias manzanas (varios centenares de metros)?",
        options: ["Sí, me limita mucho", "Sí, me limita un poco", "No, no me limita nada"],
      },
      {
        questionText: "11. Su salud actual, ¿le limita para caminar una sola manzana (unos 100 metros)",
        options: ["Sí, me limita mucho", "Sí, me limita un poco", "No, no me limita nada"],
      },
      {
        questionText: "12. Su salud actual, ¿le limita para bañarse o vestirse por sí mismo?",
        options: ["Sí, me limita mucho", "Sí, me limita un poco", "No, no me limita nada"],
      }
      // ... Preguntas de la Sección 2 ...
    ],
  },
  
  {
    sectionTitle: "Sección 3: Función Física",
    questions: [
        {
                questionText: "13.Durante las últimas 4 semanas, ¿tuvo que reducir el tiempo dedicado al trabajo o a sus actividades cotidianas a causa de su salud física?",
                options: ["Sí", "No"],
         },
        {
                questionText: "14. Durante las últimas 4 semanas, ¿hizo menos de lo que hubiera querido hacer,a causa de su salud física?",
                options: ["Sí", "No"],
        },
        {
            questionText: "15.Durante las últimas 4 semanas, ¿tuvo que dejar de hacer algunas tareas en su trabajo o en sus actividades cotidianas, a causa de su salud física?",
            options: ["Sí", "No"],
     },
    {
            questionText: "16. Durante las últimas 4 semanas, ¿tuvo dificultad para hacer su trabajo o sus actividades cotidianas (por ejemplo, le costó más de lo normal), a causa de su salud física?",
            options: ["Sí", "No"],
    }
      // ... Preguntas de la Sección 3 ...
    ],
},

{
  sectionTitle: "Sección 4: Rol Emocional",
  questions: [    
   {
            questionText: "17. Durante las últimas 4 semanas, ¿tuvo que reducir el tiempo dedicado al trabajo o a sus actividades cotidianas a causa de algún problema emocional (como estar triste, deprimido,o nervioso)?",
         options: ["Sí", "No"],
 },
{
            questionText: "18. Durante las últimas 4 semanas, ¿hizo menos de lo que hubiera querido hacer a causa de algún problema emocional (como estar triste, deprimido, o nervioso)?",
            options: ["Sí", "No"],
},
{
        questionText: "19. Durante las últimas 4 semanas, ¿no hizo su trabajo o sus actividades cotidianas tan cuidadosamente como de costumbre, a causa de algún problema emocional (como estar triste, deprimido, o nervioso)?",
        options: ["Sí", "No"],
}
      // ...termina  Preguntas de la Sección 4 ...
    ],
},

{
  sectionTitle: "Sección 5: funcion social",
  questions: [
{
        questionText: "20. Durante las últimas 4 semanas, ¿hasta qué punto su salud física o los problemas emocionales han dificultado sus actividades sociales habituales con la familia, los amigos, los vecinos u otras personas?",
        options: ["Sí", "No"],
}
// ...termina  Preguntas de la Sección función social  ...
],
},

{
  sectionTitle: "Sección 6: Dolor Corporal",
  questions: [
{
    questionText: "21. ¿Tuvo dolor en alguna parte del cuerpo durante las 4 últimas semanas?",
    options: ["No, ninguno", "Sí, muy poco", "Sí, un poco", "Sí, moderado", "Sí, mucho"," Sí, muchísimo"],
  },
  {
    questionText: "22. Durante las últimas 4 semanas, ¿hasta qué punto el dolor le ha dificultado su trabajo habitual (incluido el trabajo fuera de casa y las tareas domésticas?",
    options: ["Nada", "Un poco", "Regular", "Bastante", "Mucho"],
  }
  //preguntas dolor corporal 
    ],
},

{
    sectionTitle: "Sección 7: Vitalidad",
    questions: [
  {
    questionText: "23.Durante las 4 últimas semanas, ¿Cuánto tiempo se sintió lleno de vitalidad? ",
    options: ["Siempre", "Casi siempre", "Muchas veces", "Algunas veces", "Sólo alguna vez", "Nunca"],
  },
  {
    questionText: "24.Durante las 4 últimas semanas, ¿Cuánto tiempo estuvo muy nervioso? ",
    options: ["Siempre", "Casi siempre", "Muchas veces", "Algunas veces", "Sólo alguna vez", "Nunca"],
  }, 
   {
    questionText: "25. Durante las 4 últimas semanas, ¿Cuánto tiempo se sintió tan bajo de moral que nada podía animarle? ",
    options: ["Siempre", "Casi siempre", "Muchas veces", "Algunas veces", "Sólo alguna vez", "Nunca"],
  },
  {
    questionText: "26.Durante las 4 últimas semanas, ¿Cuánto tiempo se sintió calmado y tranquilo?",
    options: ["Siempre", "Casi siempre", "Muchas veces", "Algunas veces", "Sólo alguna vez", "Nunca"],
  }, 
  {
    questionText: "27. Durante las 4 últimas semanas, ¿Cuánto tiempo tuvo mucha energía? ",
    options: ["Siempre", "Casi siempre", "Muchas veces", "Algunas veces", "Sólo alguna vez", "Nunca"],
  }
   //preguntas vitalidad 
],
},

{
    sectionTitle: "Sección 7: Rol Emocional",
    questions: [ 
  {
    questionText: "28.Durante las 4 últimas semanas, ¿Cuánto tiempo se sintió desanimado y triste? ",
    options: ["Siempre", "Casi siempre", "Muchas veces", "Algunas veces", "Sólo alguna vez", "Nunca"],
  },
  {
    questionText: "29.Durante las 4 últimas semanas, ¿Cuánto tiempo se sintió agotado? ",
    options: ["Siempre", "Casi siempre", "Muchas veces", "Algunas veces", "Sólo alguna vez", "Nunca"],
  },
  {
    questionText: "30.Durante las 4 últimas semanas, ¿Cuánto tiempo se sintió feliz? ",
    options: ["Siempre", "Casi siempre", "Muchas veces", "Algunas veces", "Sólo alguna vez", "Nunca"],
  },
  {
    questionText: "31.Durante las 4 últimas semanas, ¿Cuánto tiempo se sintió cansado? ",
    options: ["Siempre", "Casi siempre", "Muchas veces", "Algunas veces", "Sólo alguna vez", "Nunca"],
  },
  {
    questionText: "32.Durante las 4 últimas semanas, ¿con qué recurrencia la salud física o los problemas emocionales le han dificultado sus actividades sociales (como visitar a amigos o familiares)? ",
    options: ["Siempre", "Casi siempre", "Muchas veces", "Algunas veces", "Sólo alguna vez", "Nunca"],
  },

    //preguntas seccion 4 
],
},

{
    sectionTitle: "Sección 5: Salud Mental",
    questions: [
  {
    questionText: "33. Creo que me pongo enfermo más fácilmente que otras personas",
    options: ["Totalmente cierta", "Bastante cierta", "No lo sé", "Bastante falsa", "Totalmente falsa"],
  },
  {
    questionText: "34. Estoy tan sano como cualquiera",
    options: ["Totalmente cierta", "Bastante cierta", "No lo sé", "Bastante falsa", "Totalmente falsa"],
  },
  {
    questionText: "35. Creo que mi salud va a empeorar",
    options: ["Totalmente cierta", "Bastante cierta", "No lo sé", "Bastante falsa", "Totalmente falsa"],
  },
  {
    questionText: "36. Mi salud es excelente",
    options: ["Totalmente cierta", "Bastante cierta", "No lo sé", "Bastante falsa", "Totalmente falsa"],
  }

      // ... terminan preguntas salud mental ...
],
  },

];

const form = document.getElementById("sf36-form");

sf36Data.forEach((section, index) => {
  const sectionTitle = document.createElement("h2");
  sectionTitle.innerText = section.sectionTitle;
  form.appendChild(sectionTitle);

  section.questions.forEach((q, qIndex) => {
    const questionId = `question-${index}-${qIndex}`;
    const label = document.createElement("label");
    label.setAttribute("for", questionId);
    label.innerText = `${qIndex + 1}. ${q.questionText}`;

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
