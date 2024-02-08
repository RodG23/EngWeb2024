# print(root[0]) #imprime o primeiro filho
# for tag in root[1][0]: #para todas as tags
#     print (tag.tag,tag.attrib) #imprime a tag e os atributos (em dicionário)
    
# for x in root[0]:
#     print(x.text) #imprime o texto
    
# for x in root[1].findall('figura'): #seleciona os elementos figura do segundo filho de root
#     print (x.find('legenda').text)

import xml.etree.ElementTree
import os

def get_texto_para (element):
    para_completo = ''.join(element.itertext()).replace('\n','').replace('             ',' ')
    return para_completo

def parse(dir):
    
    all_parsed = []
    
    for file in os.listdir(dir):
        if file.endswith(".xml"):
            full_path = os.path.join(dir, file)
        tree = xml.etree.ElementTree.parse(full_path)
        root = tree.getroot()
        dict = {}

        for element in root.iter():
            
            if element.tag == 'meta':
                numero = element.find('número').text
                nome = element.find('nome').text
                dict[element.tag] = {'número' : numero, 'nome' : nome}
                
            if element.tag == 'figura':
                if element.tag not in dict:
                    dict[element.tag] = []
                id = element.get('id')
                path = element.find('imagem').get('path')
                legenda = element.find('legenda').text
                dict[element.tag].append({'id': id, 'path': path, 'legenda': legenda})
            
            if element.tag == 'para':
                if element.tag not in dict:
                    dict[element.tag] = []
                para = get_texto_para(element)
                dict[element.tag].append({'para' : para})
                
            if element.tag == 'lista-casas':
                if element.tag not in dict:
                    dict[element.tag] = []
                    for casa in element.findall('casa'):
                        numero = casa.find('número').text
                        enfiteuta = casa.find('enfiteuta').text if casa.find('enfiteuta') else ''
                        foro = casa.find('foro').text if casa.find('foro') else ''
                        vista = casa.find('vista').text if casa.find('vista') else ''
                        if casa.find('desc'):
                            desc = []
                            for child in casa.find('desc'):
                                desc.append({'para' : get_texto_para(child)})
                        dict[element.tag].append({'número': numero, 'enfiteuta': enfiteuta, 'foro': foro, 'vista' : vista, 'desc' : desc})
        all_parsed.append(dict)
    return all_parsed