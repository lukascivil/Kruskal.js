var _ = require('underscore');
var colors = require('colors');

/*
	Student: LUCAS CORDEIRO DA SILVA
    University: UFF
    Algorithm: PRIM
    P.S: Connected Graph / Grafo Conexo
         Undirected  Graph / Grafo não Direcional 

KRUSKAL(G):
1 A = ∅
2 foreach v ∈ G.V:
3    MAKE-SET(v)
4 foreach (u, v) ordered by weight(u, v), increasing:
5    if FIND-SET(u) ≠ FIND-SET(v):
6       A = A ∪ {(u, v)}
7       UNION(u, v)
8 return A
*/

var nodes = ["A", "B", "C", "D", "E", "F", "G"];
var edges = [
    ["A", "B", 7], ["A", "D", 5],
    ["B", "C", 8], ["B", "D", 9], ["B", "E", 7],
    ["C", "E", 5],
    ["D", "E", 15], ["D", "F", 6],
    ["E", "F", 8], ["E", "G", 9],
    ["F", "G", 11]
];

function kruskal(nodes, edges) {

	process.stdout.write('\033c');
	var minimal = [];
	var forest = new Object();
	//														A   B   C   D   E   F   G
	// Forest index / Floresta de indice -> | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 
	//Creates the index of forest, INITIAL ALL are at different FORESTS / Cria a floresta de indice, INICIAL TODOS ESTAM EM FLORESTAS DIFERENTES
	console.log("\n"+"______________________forest_________________________________".green);
	nodes.forEach(function(node,key){ forest[node]=key; });
	console.log(forest);

	//Sort the edges / Ordena as arestas
	console.log("\n"+"______________________sortedEdges____________________________".green);
	var sortedEdges = _.sortBy(edges, function(edge) { return -edge[2]; });
	console.log(sortedEdges);

	//Creating the minimum forest / criando a floresta minima
	console.log("\n"+"_________________consolidating forests_______________________".green);
	while(sortedEdges.length > 0) {

		if(!edge){edge="Start";};
		console.log("change"+" : "+edge+" -> "+JSON.stringify(forest));
		// Always removing the minimum weight edge / Sempre removendo a aresta de peso minimo
		var edge = sortedEdges.pop();

		//Checks if possible relationship may generate a cycle / Verifica se possível relacao pode gerar um ciclo
		if(forest[edge[0]] != forest[edge[1]]){

			var aux=forest[edge[1]];
			forest[edge[1]]=forest[edge[0]];
			//If not generate a cycle, update the index table ( ALL ) , the idea is who is connected , it is in the same forest 
			//Se nao gera um ciclo, atualizamos a tabela de indice (TODA), a ideia é quem está conectado, está na mesma floresta
			for(var index in forest) { 

			   if(forest[index]==aux){ forest[index]=forest[edge[0]]; }
			}
			minimal.push(edge);	
		}
	}
	console.log("\n"+"____________________forest___________________________".green);
	console.log(forest);
	console.log("\n"+"____________________minimal___________________________".green);
	console.log(minimal);
}

//call the function / Chama a funcao
kruskal(nodes, edges);
