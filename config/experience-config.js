window.EXPERIENCE_CONFIG = Object.freeze({
  meta: {
    version: "0.2.1-phase2",
    entityName: "VESTIGIO",
    playerName: "Ania",
    deliveryDate: "2026-08-06",
    recurrentPhrase: "Lo que se pierde no desaparece. Cambia de rumbo.",
    organizerPasswordObfuscated: "MjgwNjI1"
  },

  storage: {
    key: "vestigio_progress_v1",
    backupFileName: "vestigio-progreso.json"
  },

  intro: {
    title: "No estás aquí por accidente.",
    body: "Cuatro vestigios han cambiado de rumbo. El primero está cerca. Los demás todavía no saben que los estás buscando."
  },

  levels: [
    {
      id: "orientation",
      number: 1,
      title: "Orientación",
      subtitle: "El primer rumbo",
      narrative: "Una dirección incorrecta puede ser la dirección exacta.",
      acceptedAnswersEncoded: ['REVTVklP', 'RUwgREVTVklP', 'MTUgR1JBRE9T', 'UVVJTkNFIEdSQURPUw=='],
      hintCodes: {
        "RUMBO-ORIGEN": "No intentes identificar todavía el objeto. Primero averigua qué le ocurre a la dirección.",
        "RUMBO-GIRO": "La aguja no apunta al norte. La desviación forma parte de la respuesta.",
        "RUMBO-CLAVE": "La palabra que buscas describe un cambio intencionado de dirección."
      },
      revealTitle: "Primer vestigio recuperado",
      revealMessage: "Hay objetos que no solo comunican. Guardan fotografías, voces, lugares y versiones de nosotros mismos. Este empezará a guardar las tuyas. El regalo es un iPhone 15 rosa.",
      finalFragment: "15"
    },
    {
      id: "essence",
      number: 2,
      title: "Esencia",
      subtitle: "Lo que permanece en el aire",
      narrative: "Hay cosas que ocupan un recuerdo antes que un lugar.",
      acceptedAnswersEncoded: ['U09MTyBZTw==', 'SlVTVCBNT0k=', 'SlVTVEUgTU9J', 'U09MT1lP'],
      hintCodes: {
        "ESENCIA-AIRE": "El texto no solo importa por lo que dice, sino por cómo empieza.",
        "ESENCIA-INICIO": "Observa la primera letra de cada línea.",
        "ESENCIA-CLAVE": "Las letras iniciales forman la expresión «SOLO YO»."
      },
      revealTitle: "Segundo vestigio recuperado",
      revealMessage: "Una esencia no sirve para ocultar quién eres. Sirve para dejar una parte de ti allí donde estuviste. El regalo es Just Moi de Juicy Couture.",
      finalFragment: "YO"
    },
    {
      id: "form",
      number: 3,
      title: "Forma",
      subtitle: "Materia construida capa a capa",
      narrative: "Esto no fue encontrado. Fue observado, recordado y reconstruido.",
      acceptedAnswersEncoded: ['S0lXSQ==', 'UE9ERU5DTyBNQU5FVE8=', 'TUFORVRP', 'TUkgUEVSUk8='],
      hintCodes: {
        "FORMA-BASE": "Empieza por aquello sobre lo que se sostiene la figura.",
        "FORMA-CAPAS": "Una impresión 3D se construye de abajo hacia arriba.",
        "FORMA-CLAVE": "La forma reconstruida pertenece a Kiwi."
      },
      revealTitle: "Tercer vestigio recuperado",
      revealMessage: "Algunas formas se recuerdan por cómo miran, por dónde esperan y por aquello que nunca quieren soltar. Kiwi será convertido en una figura personalizada impresa en 3D.",
      finalFragment: "CAPA",
      configurableGift: {
        subjectName: "Kiwi",
        breed: "Podenco maneto",
        referenceImage: "./assets/images/kiwi-reference.jpeg",
        objectDescription: "Figura personalizada de Kiwi con una pelota de tenis."
      }
    },
    {
      id: "destination",
      number: 4,
      title: "Destino",
      subtitle: "Una ruta todavía abierta",
      narrative: "La última coordenada aún no existe.",
      acceptedAnswersEncoded: ['TlVFU1RSTyBQUk9YSU1PIFJFQ1VFUkRP', 'UlVUQSBBQklFUlRB', 'RVVST1BB'],
      hintCodes: {
        "DESTINO-RUMBO": "Los fragmentos anteriores tienen una segunda función.",
        "DESTINO-CUADERNO": "Revisa las páginas ya recuperadas del Cuaderno de la Deriva.",
        "DESTINO-CLAVE": "La respuesta describe un recuerdo futuro que crearéis juntos."
      },
      revealTitle: "Ruta abierta",
      revealMessage: "Nos iremos de viaje por Europa. Todavía no hay fecha ni destino porque esa parte la elegiremos juntos. Puede convertirse en aventura, conducción, montaña, nieve o una escapada rural.",
      finalFragment: "DESTINO",
      configurableGift: {
        region: "Europa",
        destination: null,
        dates: null,
        options: ["Experiencia de quads", "Experiencia de karts", "Escapada rural", "Suiza", "Noruega", "Andorra"]
      }
    }
  ]
});
