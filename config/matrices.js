window.VESTIGIO_MATRICES = [
  {
    "id": "m01",
    "title": "Rotación simple",
    "difficulty": 1,
    "rule": "rotation",
    "prompt": "Completa la secuencia de rotación.",
    "grid": [
      {
        "shape": "arrow",
        "rotation": 0
      },
      {
        "shape": "arrow",
        "rotation": 90
      },
      {
        "shape": "arrow",
        "rotation": 180
      },
      {
        "shape": "arrow",
        "rotation": 90
      },
      {
        "shape": "arrow",
        "rotation": 180
      },
      {
        "shape": "arrow",
        "rotation": 270
      },
      {
        "shape": "arrow",
        "rotation": 180
      },
      {
        "shape": "arrow",
        "rotation": 270
      },
      null
    ],
    "options": [
      {
        "shape": "arrow",
        "rotation": 0
      },
      {
        "shape": "arrow",
        "rotation": 90
      },
      {
        "shape": "arrow",
        "rotation": 180
      },
      {
        "shape": "arrow",
        "rotation": 270
      },
      {
        "shape": "triangle",
        "rotation": 0
      },
      {
        "shape": "triangle",
        "rotation": 90
      },
      {
        "shape": "diamond",
        "rotation": 0
      },
      {
        "shape": "circle",
        "rotation": 0
      }
    ],
    "correct": 0,
    "symbol": "✕"
  },
  {
    "id": "m02",
    "title": "Cantidad",
    "difficulty": 1,
    "rule": "count",
    "prompt": "Identifica cómo aumenta la cantidad.",
    "grid": [
      {
        "shape": "dots",
        "count": 1
      },
      {
        "shape": "dots",
        "count": 2
      },
      {
        "shape": "dots",
        "count": 3
      },
      {
        "shape": "dots",
        "count": 2
      },
      {
        "shape": "dots",
        "count": 3
      },
      {
        "shape": "dots",
        "count": 4
      },
      {
        "shape": "dots",
        "count": 3
      },
      {
        "shape": "dots",
        "count": 4
      },
      null
    ],
    "options": [
      {
        "shape": "dots",
        "count": 2
      },
      {
        "shape": "dots",
        "count": 3
      },
      {
        "shape": "dots",
        "count": 4
      },
      {
        "shape": "dots",
        "count": 5
      },
      {
        "shape": "squares",
        "count": 4
      },
      {
        "shape": "squares",
        "count": 5
      },
      {
        "shape": "lines",
        "count": 4
      },
      {
        "shape": "lines",
        "count": 5
      }
    ],
    "correct": 3,
    "symbol": "○"
  },
  {
    "id": "m03",
    "title": "Alternancia",
    "difficulty": 2,
    "rule": "alternation",
    "prompt": "Observa qué propiedad alterna en filas y columnas.",
    "grid": [
      {
        "shape": "square",
        "filled": false
      },
      {
        "shape": "square",
        "filled": true
      },
      {
        "shape": "square",
        "filled": false
      },
      {
        "shape": "square",
        "filled": true
      },
      {
        "shape": "square",
        "filled": false
      },
      {
        "shape": "square",
        "filled": true
      },
      {
        "shape": "square",
        "filled": false
      },
      {
        "shape": "square",
        "filled": true
      },
      null
    ],
    "options": [
      {
        "shape": "square",
        "filled": false
      },
      {
        "shape": "square",
        "filled": true
      },
      {
        "shape": "circle",
        "filled": false
      },
      {
        "shape": "circle",
        "filled": true
      },
      {
        "shape": "triangle",
        "filled": false
      },
      {
        "shape": "triangle",
        "filled": true
      },
      {
        "shape": "diamond",
        "filled": false
      },
      {
        "shape": "diamond",
        "filled": true
      }
    ],
    "correct": 0,
    "symbol": "△"
  },
  {
    "id": "m04",
    "title": "Superposición",
    "difficulty": 2,
    "rule": "overlay",
    "prompt": "La tercera figura combina las dos anteriores.",
    "grid": [
      {
        "shape": "lineH"
      },
      {
        "shape": "lineV"
      },
      {
        "shape": "plus"
      },
      {
        "shape": "diagA"
      },
      {
        "shape": "diagB"
      },
      {
        "shape": "x"
      },
      {
        "shape": "circle"
      },
      {
        "shape": "dot"
      },
      null
    ],
    "options": [
      {
        "shape": "circleDot"
      },
      {
        "shape": "circle"
      },
      {
        "shape": "dot"
      },
      {
        "shape": "plus"
      },
      {
        "shape": "x"
      },
      {
        "shape": "diamond"
      },
      {
        "shape": "square"
      },
      {
        "shape": "ring"
      }
    ],
    "correct": 0,
    "symbol": "□"
  },
  {
    "id": "m05",
    "title": "Sustracción",
    "difficulty": 3,
    "rule": "subtract",
    "prompt": "En cada fila, la tercera figura conserva lo que no se repite.",
    "grid": [
      {
        "shape": "combo",
        "parts": [
          "lineH",
          "lineV"
        ]
      },
      {
        "shape": "lineV"
      },
      {
        "shape": "lineH"
      },
      {
        "shape": "combo",
        "parts": [
          "diagA",
          "diagB"
        ]
      },
      {
        "shape": "diagA"
      },
      {
        "shape": "diagB"
      },
      {
        "shape": "combo",
        "parts": [
          "circle",
          "dot"
        ]
      },
      {
        "shape": "circle"
      },
      null
    ],
    "options": [
      {
        "shape": "dot"
      },
      {
        "shape": "circle"
      },
      {
        "shape": "circleDot"
      },
      {
        "shape": "lineH"
      },
      {
        "shape": "lineV"
      },
      {
        "shape": "x"
      },
      {
        "shape": "plus"
      },
      {
        "shape": "diamond"
      }
    ],
    "correct": 0,
    "symbol": "○"
  },
  {
    "id": "m06",
    "title": "Desplazamiento",
    "difficulty": 3,
    "rule": "position",
    "prompt": "Sigue el desplazamiento del elemento interior.",
    "grid": [
      {
        "shape": "boxDot",
        "pos": "tl"
      },
      {
        "shape": "boxDot",
        "pos": "tc"
      },
      {
        "shape": "boxDot",
        "pos": "tr"
      },
      {
        "shape": "boxDot",
        "pos": "ml"
      },
      {
        "shape": "boxDot",
        "pos": "mc"
      },
      {
        "shape": "boxDot",
        "pos": "mr"
      },
      {
        "shape": "boxDot",
        "pos": "bl"
      },
      {
        "shape": "boxDot",
        "pos": "bc"
      },
      null
    ],
    "options": [
      {
        "shape": "boxDot",
        "pos": "br"
      },
      {
        "shape": "boxDot",
        "pos": "tr"
      },
      {
        "shape": "boxDot",
        "pos": "mr"
      },
      {
        "shape": "boxDot",
        "pos": "mc"
      },
      {
        "shape": "boxDot",
        "pos": "bl"
      },
      {
        "shape": "boxDot",
        "pos": "bc"
      },
      {
        "shape": "boxDot",
        "pos": "tl"
      },
      {
        "shape": "boxDot",
        "pos": "tc"
      }
    ],
    "correct": 0,
    "symbol": "△"
  },
  {
    "id": "m07",
    "title": "Rotación doble",
    "difficulty": 4,
    "rule": "double_rotation",
    "prompt": "Dos elementos rotan en sentidos opuestos.",
    "grid": [
      {
        "shape": "doubleArrow",
        "a": 0,
        "b": 180
      },
      {
        "shape": "doubleArrow",
        "a": 90,
        "b": 90
      },
      {
        "shape": "doubleArrow",
        "a": 180,
        "b": 0
      },
      {
        "shape": "doubleArrow",
        "a": 90,
        "b": 270
      },
      {
        "shape": "doubleArrow",
        "a": 180,
        "b": 180
      },
      {
        "shape": "doubleArrow",
        "a": 270,
        "b": 90
      },
      {
        "shape": "doubleArrow",
        "a": 180,
        "b": 0
      },
      {
        "shape": "doubleArrow",
        "a": 270,
        "b": 270
      },
      null
    ],
    "options": [
      {
        "shape": "doubleArrow",
        "a": 0,
        "b": 180
      },
      {
        "shape": "doubleArrow",
        "a": 90,
        "b": 90
      },
      {
        "shape": "doubleArrow",
        "a": 180,
        "b": 0
      },
      {
        "shape": "doubleArrow",
        "a": 270,
        "b": 270
      },
      {
        "shape": "doubleArrow",
        "a": 0,
        "b": 0
      },
      {
        "shape": "doubleArrow",
        "a": 90,
        "b": 180
      },
      {
        "shape": "doubleArrow",
        "a": 180,
        "b": 180
      },
      {
        "shape": "doubleArrow",
        "a": 270,
        "b": 90
      }
    ],
    "correct": 0,
    "symbol": "✕"
  },
  {
    "id": "m08",
    "title": "Intersección",
    "difficulty": 4,
    "rule": "intersection",
    "prompt": "La tercera figura conserva únicamente la parte común.",
    "grid": [
      {
        "shape": "combo",
        "parts": [
          "circle",
          "lineH"
        ]
      },
      {
        "shape": "combo",
        "parts": [
          "circle",
          "lineV"
        ]
      },
      {
        "shape": "circle"
      },
      {
        "shape": "combo",
        "parts": [
          "square",
          "diagA"
        ]
      },
      {
        "shape": "combo",
        "parts": [
          "square",
          "diagB"
        ]
      },
      {
        "shape": "square"
      },
      {
        "shape": "combo",
        "parts": [
          "diamond",
          "dot"
        ]
      },
      {
        "shape": "combo",
        "parts": [
          "diamond",
          "lineH"
        ]
      },
      null
    ],
    "options": [
      {
        "shape": "diamond"
      },
      {
        "shape": "dot"
      },
      {
        "shape": "lineH"
      },
      {
        "shape": "combo",
        "parts": [
          "diamond",
          "dot",
          "lineH"
        ]
      },
      {
        "shape": "circle"
      },
      {
        "shape": "square"
      },
      {
        "shape": "plus"
      },
      {
        "shape": "x"
      }
    ],
    "correct": 0,
    "symbol": "○"
  },
  {
    "id": "m09",
    "title": "Progresión compuesta",
    "difficulty": 5,
    "rule": "compound",
    "prompt": "Cantidad y orientación cambian simultáneamente.",
    "grid": [
      {
        "shape": "spokes",
        "count": 1,
        "rotation": 0
      },
      {
        "shape": "spokes",
        "count": 2,
        "rotation": 45
      },
      {
        "shape": "spokes",
        "count": 3,
        "rotation": 90
      },
      {
        "shape": "spokes",
        "count": 2,
        "rotation": 45
      },
      {
        "shape": "spokes",
        "count": 3,
        "rotation": 90
      },
      {
        "shape": "spokes",
        "count": 4,
        "rotation": 135
      },
      {
        "shape": "spokes",
        "count": 3,
        "rotation": 90
      },
      {
        "shape": "spokes",
        "count": 4,
        "rotation": 135
      },
      null
    ],
    "options": [
      {
        "shape": "spokes",
        "count": 5,
        "rotation": 180
      },
      {
        "shape": "spokes",
        "count": 4,
        "rotation": 180
      },
      {
        "shape": "spokes",
        "count": 5,
        "rotation": 135
      },
      {
        "shape": "spokes",
        "count": 3,
        "rotation": 180
      },
      {
        "shape": "spokes",
        "count": 6,
        "rotation": 180
      },
      {
        "shape": "spokes",
        "count": 5,
        "rotation": 90
      },
      {
        "shape": "spokes",
        "count": 4,
        "rotation": 90
      },
      {
        "shape": "spokes",
        "count": 6,
        "rotation": 135
      }
    ],
    "correct": 0,
    "symbol": "△"
  },
  {
    "id": "m10",
    "title": "Regla múltiple",
    "difficulty": 5,
    "rule": "multi",
    "prompt": "Combina posición, relleno y forma.",
    "grid": [
      {
        "shape": "corner",
        "corner": "tl",
        "inner": "circle",
        "filled": false
      },
      {
        "shape": "corner",
        "corner": "tr",
        "inner": "square",
        "filled": true
      },
      {
        "shape": "corner",
        "corner": "br",
        "inner": "triangle",
        "filled": false
      },
      {
        "shape": "corner",
        "corner": "tr",
        "inner": "square",
        "filled": true
      },
      {
        "shape": "corner",
        "corner": "br",
        "inner": "triangle",
        "filled": false
      },
      {
        "shape": "corner",
        "corner": "bl",
        "inner": "circle",
        "filled": true
      },
      {
        "shape": "corner",
        "corner": "br",
        "inner": "triangle",
        "filled": false
      },
      {
        "shape": "corner",
        "corner": "bl",
        "inner": "circle",
        "filled": true
      },
      null
    ],
    "options": [
      {
        "shape": "corner",
        "corner": "tl",
        "inner": "square",
        "filled": false
      },
      {
        "shape": "corner",
        "corner": "tl",
        "inner": "square",
        "filled": true
      },
      {
        "shape": "corner",
        "corner": "tr",
        "inner": "square",
        "filled": false
      },
      {
        "shape": "corner",
        "corner": "tl",
        "inner": "circle",
        "filled": false
      },
      {
        "shape": "corner",
        "corner": "br",
        "inner": "square",
        "filled": false
      },
      {
        "shape": "corner",
        "corner": "tl",
        "inner": "triangle",
        "filled": false
      },
      {
        "shape": "corner",
        "corner": "tr",
        "inner": "circle",
        "filled": true
      },
      {
        "shape": "corner",
        "corner": "bl",
        "inner": "square",
        "filled": false
      }
    ],
    "correct": 0,
    "symbol": "□"
  }
];