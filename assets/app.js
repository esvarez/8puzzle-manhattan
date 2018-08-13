var arbol = /** @class */ (function () {
    function arbol(puzzle, manhattan) {
        this.manhattan = manhattan;
        this.padre = null;
        this.ramas = [];
        this.miPuzzle = [];
        for (var i = 0; i < puzzle.length; i++)
            this.miPuzzle[i] = puzzle[i].slice();
    }
    return arbol;
}());
var puzzle = [
    ['-', '-', '-'],
    ['-', '-', '-'],
    ['-', '-', '-']
];
puzzle = [['4', '2', '5'], ['1', '0', '6'], ['3', '8', '7']];
//llenarPuzzle(puzzle);
console.log(puzzle);
var distancia = calcularDistancia(puzzle);
var raiz = new arbol(puzzle, distancia);
resolverPuzzle(raiz);
function resolverPuzzle(nodo) {
    for (var x = 0; x < nodo.miPuzzle.length; x++) {
        for (var y = 0; y < nodo.miPuzzle[x].length; y++) {
            if (nodo.miPuzzle[x][y] == '0') {
                var nuevoPuzzle = [];
                if (x > 0) {
                    for (var i = 0; i < nodo.miPuzzle.length; i++)
                        nuevoPuzzle[i] = nodo.miPuzzle[i].slice();
                    nuevoPuzzle[x][y] = nuevoPuzzle[x - 1][y];
                    nuevoPuzzle[x - 1][y] = '0';
                    var manhattan = calcularDistancia(nuevoPuzzle);
                    if (nodo.padre != null) {
                        if (!compararPuzzle(nodo.padre.miPuzzle, nuevoPuzzle)) {
                            nodo.ramas.push(new arbol(nuevoPuzzle, manhattan));
                            nodo.ramas[nodo.ramas.length - 1].padre = nodo;
                        }
                    }
                    else {
                        nodo.ramas.push(new arbol(nuevoPuzzle, manhattan));
                        nodo.ramas[nodo.ramas.length - 1].padre = nodo;
                    }
                }
                if (x < nodo.miPuzzle.length - 1) {
                    for (var i = 0; i < nodo.miPuzzle.length; i++)
                        nuevoPuzzle[i] = nodo.miPuzzle[i].slice();
                    nuevoPuzzle[x][y] = nuevoPuzzle[x + 1][y];
                    nuevoPuzzle[x + 1][y] = '0';
                    var manhattan = calcularDistancia(nuevoPuzzle);
                    if (nodo.padre != null) {
                        if (!compararPuzzle(nodo.padre.miPuzzle, nuevoPuzzle)) {
                            nodo.ramas.push(new arbol(nuevoPuzzle, manhattan));
                            nodo.ramas[nodo.ramas.length - 1].padre = nodo;
                        }
                    }
                    else {
                        nodo.ramas.push(new arbol(nuevoPuzzle, manhattan));
                        nodo.ramas[nodo.ramas.length - 1].padre = nodo;
                    }
                }
                if (y > 0) {
                    for (var i = 0; i < nodo.miPuzzle.length; i++)
                        nuevoPuzzle[i] = nodo.miPuzzle[i].slice();
                    nuevoPuzzle[x][y] = nuevoPuzzle[x][y - 1];
                    nuevoPuzzle[x][y - 1] = '0';
                    if (nodo.padre != null) {
                        if (!compararPuzzle(nodo.padre.miPuzzle, nuevoPuzzle)) {
                            var manhattan = calcularDistancia(nuevoPuzzle);
                            nodo.ramas.push(new arbol(nuevoPuzzle, manhattan));
                            nodo.ramas[nodo.ramas.length - 1].padre = nodo;
                        }
                    }
                    else {
                        var manhattan = calcularDistancia(nuevoPuzzle);
                        nodo.ramas.push(new arbol(nuevoPuzzle, manhattan));
                        nodo.ramas[nodo.ramas.length - 1].padre = nodo;
                    }
                }
                if (y < nodo.miPuzzle[x].length - 1) {
                    for (var i = 0; i < nodo.miPuzzle.length; i++)
                        nuevoPuzzle[i] = nodo.miPuzzle[i].slice();
                    nuevoPuzzle[x][y] = nuevoPuzzle[x][y + 1];
                    nuevoPuzzle[x][y + 1] = '0';
                    if (nodo.padre != null) {
                        if (!compararPuzzle(nodo.padre.miPuzzle, nuevoPuzzle)) {
                            var manhattan = calcularDistancia(nuevoPuzzle);
                            nodo.ramas.push(new arbol(nuevoPuzzle, manhattan));
                            nodo.ramas[nodo.ramas.length - 1].padre = nodo;
                        }
                    }
                    else {
                        var manhattan = calcularDistancia(nuevoPuzzle);
                        nodo.ramas.push(new arbol(nuevoPuzzle, manhattan));
                        nodo.ramas[nodo.ramas.length - 1].padre = nodo;
                    }
                }
            }
        }
    }
    var heuristica = 100;
    var index = 0;
    for (var i = 0; i < nodo.ramas.length; i++) {
        if (nodo.ramas[i].manhattan < heuristica) {
            heuristica = nodo.ramas[i].manhattan;
            index = i;
        }
    }
    if (heuristica > 0) {
        resolverPuzzle(nodo.ramas[index]);
    }
    else {
        console.log('Solucion');
        console.log(nodo.ramas[index].miPuzzle);
    }
}
console.log(raiz);
//imprimirCamino(raiz);
function llenarPuzzle(puzzle) {
    var numeros = [0];
    var cont = 1;
    do {
        var existe = false;
        var entero = Math.round(Math.random() * (8));
        for (var i = 0; i < numeros.length; i++)
            if (numeros[i] == entero)
                existe = true;
        if (!existe) {
            numeros.push(entero);
            cont++;
        }
    } while (cont < 9);
    for (var x = 0; x < puzzle.length; x++)
        for (var y = 0; y < puzzle.length; y++)
            puzzle[x][y] = numeros.pop();
}
function calcularDistancia(puzzle) {
    var manhattan = 0;
    var numero = 1;
    for (var x = 0; x < puzzle.length; x++) {
        for (var y = 0; y < puzzle[x].length; y++) {
            if (puzzle[x][y] != 0 && puzzle[x][y] != numero) {
                var temp = puzzle[x][y] - 1;
                var xreal = Math.trunc(temp / puzzle.length);
                var yreal = temp % puzzle.length;
                manhattan += Math.abs(x - xreal) + Math.abs(y - yreal);
            }
            numero++;
        }
    }
    return manhattan;
}
function compararPuzzle(puzzle, puzzle2) {
    for (var x = 0; x < puzzle.length; x++) {
        for (var y = 0; y < puzzle[x].length; y++) {
            if (puzzle[x][y] != puzzle2[x][y]) {
                return false;
            }
        }
    }
    return true;
}
function imprimirCamino(nodo) {
    console.log(nodo.miPuzzle);
    for (var i = 0; i < nodo.ramas.length; i++) {
        if (nodo.ramas[i].ramas.length > 0) {
            imprimirCamino(nodo.ramas[i]);
        }
    }
}
