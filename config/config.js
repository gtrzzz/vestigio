window.VESTIGIO_CONFIG = {
  "meta": {
    "version": "0.2.0",
    "entity": "VESTIGIO",
    "player": "Ania",
    "storageKey": "vestigio_delivery_2_v1",
    "organizerPassword": "MjgwNjI1"
  },
  "level1": {
    "acceptedFinal": [
      "DESVIO",
      "EL DESVIO",
      "QUINCE GRADOS",
      "15 GRADOS"
    ],
    "acceptedCipher": [
      "ROSA NO ES EL FINAL"
    ],
    "hintCodes": {
      "VTG-103A": "Empieza por los metadatos. No todas las fotografías pertenecen al mismo registro.",
      "VTG-103B": "La fotografía 04 señala la tercera línea. Esa línea usa un César de tres posiciones.",
      "VTG-103C": "Tras descifrar «ROSA NO ES EL FINAL», ajusta la aguja a 15°. La clave final describe lo que le ocurrió al rumbo."
    }
  },
  "evidence": [
    {
      "id": "ev1",
      "title": "Archivo parcial",
      "image": "./assets/photos/evidence-01.jpg",
      "meta": {
        "registro": "V-01",
        "marca": "06:14",
        "orientación": "0°",
        "nota": "sin anomalías"
      }
    },
    {
      "id": "ev2",
      "title": "Lectura de campo",
      "image": "./assets/photos/evidence-02.jpg",
      "meta": {
        "registro": "V-01",
        "marca": "06:17",
        "orientación": "N",
        "nota": "lectura incompleta"
      }
    },
    {
      "id": "ev3",
      "title": "Sello incompleto",
      "image": "./assets/photos/evidence-03.jpg",
      "meta": {
        "registro": "V-02",
        "marca": "06:21",
        "orientación": "—",
        "nota": "no pertenece al conjunto"
      }
    },
    {
      "id": "ev4",
      "title": "Registro angular",
      "image": "./assets/photos/evidence-04.jpg",
      "meta": {
        "registro": "V-01",
        "marca": "06:15",
        "orientación": "+15°",
        "nota": "conservar tercera línea"
      }
    },
    {
      "id": "ev5",
      "title": "Nota sin firma",
      "image": "./assets/photos/evidence-05.jpg",
      "meta": {
        "registro": "V-03",
        "marca": "—",
        "orientación": "—",
        "nota": "papel posterior"
      }
    },
    {
      "id": "ev6",
      "title": "Negativo deteriorado",
      "image": "./assets/photos/evidence-06.jpg",
      "meta": {
        "registro": "V-01",
        "marca": "06:19",
        "orientación": "invertida",
        "nota": "sin lectura estable"
      }
    }
  ]
};