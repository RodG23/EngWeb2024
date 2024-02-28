import json

def read_json_file(file_path):
    try:
        with open(file_path, 'r') as file:
            json_objects = [json.loads(line) for line in file]
    
    except FileNotFoundError:
        print(f'O ficheiro {file_path} não foi encontrado')
    except Exception as e:
        print(f'Ocorreu um erro: {e}')

    return json_objects


def pertenceA(ator, atores):
    encontrado = False
    i = 0
    while i < len(atores) and not encontrado:
        if atores[i]["nome"] == ator:
            encontrado = True
        i+=1
    
    return encontrado

def pertenceB(genero, generos):
    encontrado = False
    i = 0
    while i < len(generos) and not encontrado:
        if generos[i]["nome"] == genero:
            encontrado = True
        i+=1
    
    return encontrado

def calc_filmes(bd):
    i = 1
    for filme in bd:
        filme['_id'] = f'f{i}'
        i = i+1

def calc_atores(bd):
    atores = []
    contador = 1
    for registo in bd:
        for ator in registo.get('cast'):
            if not pertenceA(ator,atores):
                atores.append({
                    "id" : f'a{contador}',
                    "nome" : ator
                })
                contador += 1
    return atores

def calc_generos(bd):
    generos = []
    contador = 1
    for registo in bd:
        if registo.get('genres','erro') != 'erro':
            for genero in registo.get('genres'):
                if not pertenceB(genero,generos):
                    generos.append({
                        "id" : f'g{contador}',
                        "nome" : genero
                    })
                    contador += 1
    return generos

file_path = 'filmes.json'
myBD = read_json_file(file_path)
filmes = calc_filmes(myBD)
atores = calc_atores(myBD)
generos = calc_generos(myBD)

novaBD = {
    "ocorrencias" : myBD,
    "atores" : atores,
    "generos" : generos
}

f = open("bd.json",'w')
json.dump(novaBD, f, indent=2)