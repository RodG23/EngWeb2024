import json

def dataset_cleanser(dataset):
    compositores = []

    for item in dataset['compositores']:
        if 'modalidade' not in item:
            compositor = {
                "id": item["id"],
                "nome": item["nome"],
                "bio": item["bio"],
                "dataNasc": item["dataNasc"],
                "dataObito": item["dataObito"],
                "periodo": item["periodo"]
            }
            compositores.append(compositor)

    new_dataset = {"compositores": compositores}
    return new_dataset

with open('compositores.json', 'r', encoding='utf-8') as file:
    dataset = json.load(file)

new_dataset = dataset_cleanser(dataset)

file2 = open('bd.json', 'w', encoding='utf-8')
json.dump(new_dataset,file2)