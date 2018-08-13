class arbol {    
    public ramas: arbol[]; 
    public miPuzzle: any[][];
    public padre: arbol | null;
    
    constructor(
        puzzle: any[][],        
        public manhattan: number
    ) {
        this.padre = null;
        this.ramas = []; 
        this.miPuzzle = [];
        for (let i = 0; i < puzzle.length; i++) 
            this.miPuzzle[i] = puzzle[i].slice();
    }
}        
       
let puzzle = [
    ['-','-','-'],
    ['-','-','-'],
    ['-','-','-']
];

puzzle = [['4','2','5'], ['1','0','6'], ['3','8','7']];

//llenarPuzzle(puzzle);

console.log(puzzle);
let distancia = calcularDistancia(puzzle);

let raiz = new arbol(puzzle,distancia);

resolverPuzzle(raiz);

function resolverPuzzle(nodo:arbol) {
    for (let x = 0; x < nodo.miPuzzle.length; x++) {
        for (let y = 0; y < nodo.miPuzzle[x].length; y++) {
            if (nodo.miPuzzle[x][y] == '0') {               
                let nuevoPuzzle = [];
                if (x > 0) {
                    for (let i = 0; i < nodo.miPuzzle.length; i++) 
                        nuevoPuzzle[i] = nodo.miPuzzle[i].slice();
                    nuevoPuzzle[x][y] = nuevoPuzzle[x-1][y];
                    nuevoPuzzle[x-1][y] = '0';
                    let manhattan = calcularDistancia(nuevoPuzzle);
                    if (nodo.padre != null) {
                        if (!compararPuzzle(nodo.padre.miPuzzle, nuevoPuzzle)) {
                            nodo.ramas.push(new arbol(nuevoPuzzle, manhattan));
                            nodo.ramas[nodo.ramas.length-1].padre = nodo;
                        }                    
                    }else{
                        nodo.ramas.push(new arbol(nuevoPuzzle, manhattan));
                        nodo.ramas[nodo.ramas.length-1].padre = nodo;
                    }
                }
                
                if (x < nodo.miPuzzle.length-1) {
                    for (let i = 0; i < nodo.miPuzzle.length; i++) 
                        nuevoPuzzle[i] = nodo.miPuzzle[i].slice();                                
                    nuevoPuzzle[x][y] = nuevoPuzzle[x+1][y];
                    nuevoPuzzle[x+1][y] = '0';
                    let manhattan = calcularDistancia(nuevoPuzzle);
                    if (nodo.padre != null) {
                        if (!compararPuzzle(nodo.padre.miPuzzle, nuevoPuzzle)) {
                            nodo.ramas.push(new arbol(nuevoPuzzle, manhattan));
                            nodo.ramas[nodo.ramas.length-1].padre = nodo;
                        }                    
                    }else{
                        nodo.ramas.push(new arbol(nuevoPuzzle, manhattan));
                        nodo.ramas[nodo.ramas.length-1].padre = nodo;
                    }
                }
    
                if (y > 0) {
                    for (let i = 0; i < nodo.miPuzzle.length; i++) 
                        nuevoPuzzle[i] = nodo.miPuzzle[i].slice();
                    nuevoPuzzle[x][y] = nuevoPuzzle[x][y-1];
                    nuevoPuzzle[x][y-1] = '0';
                    if (nodo.padre != null) {
                        if (!compararPuzzle(nodo.padre.miPuzzle, nuevoPuzzle)) {
                            let manhattan = calcularDistancia(nuevoPuzzle);
                            nodo.ramas.push(new arbol(nuevoPuzzle, manhattan));
                            nodo.ramas[nodo.ramas.length-1].padre = nodo;
                        }                  
                    }else{
                        let manhattan = calcularDistancia(nuevoPuzzle);
                        nodo.ramas.push(new arbol(nuevoPuzzle, manhattan));
                        nodo.ramas[nodo.ramas.length-1].padre = nodo;
                    }  
                }
                if (y < nodo.miPuzzle[x].length-1) {
                    for (let i = 0; i < nodo.miPuzzle.length; i++) 
                        nuevoPuzzle[i] = nodo.miPuzzle[i].slice();
                    nuevoPuzzle[x][y] = nuevoPuzzle[x][y+1];
                    nuevoPuzzle[x][y+1] = '0';
                    if (nodo.padre != null) {
                        if (!compararPuzzle(nodo.padre.miPuzzle, nuevoPuzzle)) {
                            let manhattan = calcularDistancia(nuevoPuzzle);
                            nodo.ramas.push(new arbol(nuevoPuzzle, manhattan));
                            nodo.ramas[nodo.ramas.length-1].padre = nodo;
                        }                  
                    }else{
                        let manhattan = calcularDistancia(nuevoPuzzle);
                        nodo.ramas.push(new arbol(nuevoPuzzle, manhattan));
                        nodo.ramas[nodo.ramas.length-1].padre = nodo;
                    }  
                }
    
            }                
        }    
    }
    
    let heuristica = 100;
    let index = 0;
    for (let i = 0; i < nodo.ramas.length; i++) {    
        if (nodo.ramas[i].manhattan < heuristica) {
            heuristica = nodo.ramas[i].manhattan;
            index = i;        
        }    
    }
    if (heuristica > 0) {
        resolverPuzzle(nodo.ramas[index]);        
    }else{
        console.log('Solucion');        
        console.log(nodo.ramas[index].miPuzzle);        
    }
}
console.log(raiz);
//imprimirCamino(raiz);

function llenarPuzzle(puzzle:any) {
    let numeros: number[] = [0];    
    let cont = 1;
    
    do {
        let existe = false;
        let entero = Math.round(Math.random() * (8));    
        for (let i = 0; i < numeros.length; i++) 
            if (numeros[i] == entero) 
                existe = true;
        if (!existe) {
            numeros.push(entero);
            cont++;
        }        
    } while (cont < 9);

    for (let x = 0; x < puzzle.length; x++) 
        for (let y = 0; y < puzzle.length; y++) 
            puzzle[x][y] = numeros.pop();                
}

function calcularDistancia(puzzle:any) {
    let manhattan = 0;
    let numero = 1;
    for (let x = 0; x < puzzle.length; x++) {
        for (let y = 0; y < puzzle[x].length; y++) {            
            if (puzzle[x][y] != 0 && puzzle[x][y] != numero) {
                let temp = puzzle[x][y] - 1;                
                let xreal = Math.trunc(temp/puzzle.length);
                let yreal = temp%puzzle.length;
                manhattan +=  Math.abs(x-xreal) + Math.abs(y-yreal);                
            }
            numero ++;
        }
    }
    
    return manhattan;
}

function compararPuzzle(puzzle:any, puzzle2:any) {
    for (let x  = 0; x  < puzzle.length; x ++) {
        for (let y = 0; y < puzzle[x].length; y++) {
            if (puzzle[x][y] != puzzle2[x][y]) {
                return false;
            }            
        }        
    }
    return true;    
}

function imprimirCamino(nodo:arbol) {
    console.log(nodo.miPuzzle);
    for (let i = 0; i < nodo.ramas.length; i++) {
        if (nodo.ramas[i].ramas.length > 0) {
            imprimirCamino(nodo.ramas[i])
        }        
    }        
}





